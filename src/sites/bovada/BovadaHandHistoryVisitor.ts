import { ParserRuleContext } from 'antlr4ts';
import { Interval } from 'antlr4ts/misc/Interval';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import BigNumber from 'bignumber.js';
import {
  ActionAllInContext,
  ActionAllInRaiseContext,
  ActionBetContext,
  ActionCallContext,
  ActionCheckContext,
  ActionFoldContext,
  ActionRaiseContext,
  BoardSectionsContext,
  CardContext,
  ChipCountContext,
  GameContext,
  HandNumberContext,
  HandStrengthContext,
  LimitContext,
  LineActionContext,
  LineBigBlindContext,
  LineBoardContext,
  LineHandsDealtContext,
  LineMuckContext,
  LinePlayerContext,
  LinePostContext,
  LineResultContext,
  LineShowdownContext,
  LineSmallBlindContext,
  LineStreetContext,
  LineUncalledContext,
  PositionContext,
  TimestampContext,
} from '../../grammar/BovadaParser';
import { BovadaVisitor } from '../../grammar/BovadaVisitor';
import { Game, HandStrength, Limit, Position, Street } from '../../types';

export interface Result {
  site: 'bovada';
  handNumber: undefined | string;
  timestamp: undefined | Date;
  game: undefined | Game;
  limit: undefined | Limit;
  fastFold: boolean;
  position: undefined | Position;
  street: undefined | Street;
  stackSize: undefined | BigNumber;
  occupiedSeats: number[];
  blinds: BigNumber[];
  cards: string[];
  board: string[];
  won: BigNumber;
  numFolds: number;
  numChecks: number;
  numCalls: number;
  numBets: number;
  numRaises: number;
  lastStreetSeen: undefined | Street;
  wentToShowdown: boolean;
  handStrength: undefined | HandStrength;
}

const partialResult = (result: Partial<Result> = {}): Result => ({
  site: 'bovada',
  handNumber: undefined,
  timestamp: undefined,
  game: undefined,
  limit: undefined,
  fastFold: false,
  position: undefined,
  street: undefined,
  stackSize: undefined,
  occupiedSeats: [],
  blinds: [],
  cards: [],
  board: [],
  won: new BigNumber(0),
  numFolds: 0,
  numChecks: 0,
  numCalls: 0,
  numBets: 0,
  numRaises: 0,
  lastStreetSeen: undefined,
  wentToShowdown: false,
  handStrength: undefined,
  ...result,
});

const getStreet = (value: string): Street | undefined => {
  switch (value) {
    case 'HOLE CARDS':
      return 'preflop';
    case 'FLOP':
      return 'flop';
    case 'TURN':
      return 'turn';
    case 'RIVER':
      return 'river';
    case 'SUMMARY':
      return undefined;
    default:
      throw new Error(`Unexpected street: "${value}"`);
  }
};

const getHandStrength = (value: string): HandStrength => {
  switch (value) {
    case 'High Card':
      return HandStrength.HighCard;
    case 'One pair':
      return HandStrength.OnePair;
    case 'Two pair':
      return HandStrength.TwoPair;
    case 'Three of a kind':
      return HandStrength.ThreeOfAKind;
    case 'Straight':
      return HandStrength.Straight;
    case 'Flush':
      return HandStrength.Flush;
    case 'Full House':
      return HandStrength.FullHouse;
    case 'Four of a kind':
      return HandStrength.FourOfAKind;
    case 'Straight Flush':
      return HandStrength.StraightFlush;
    case 'Royal Straight Flush':
      return HandStrength.RoyalFlush;
    default:
      throw new Error(`Unexpected hand strength: "${value}"`);
  }
};

// TODO: we're assuming commas are always thousands separators, but that may depend on locale
const parseNumber = (num: string) => new BigNumber(num.replace(',', ''));

const hasAncestor = (node: ParseTree, cls: any): boolean => {
  if (node instanceof cls) {
    return true;
  }
  if (!node.parent) {
    return false;
  }
  return hasAncestor(node.parent, cls);
};

export class BovadaHandHistoryVisitor
  extends AbstractParseTreeVisitor<Result>
  implements BovadaVisitor<Result>
{
  isHero = false;
  heroFolded = false;

  protected defaultResult(): Result {
    return partialResult();
  }

  aggregateResult(aggregate: Result, nextResult: Result) {
    return {
      site: aggregate.site,
      handNumber: nextResult.handNumber ?? aggregate.handNumber,
      timestamp: nextResult.timestamp ?? aggregate.timestamp,
      game: nextResult.game ?? aggregate.game,
      limit: nextResult.limit ?? aggregate.limit,
      fastFold: nextResult.fastFold || aggregate.fastFold,
      position: nextResult.position ?? aggregate.position,
      street: nextResult.street ?? aggregate.street,
      stackSize: nextResult.stackSize ?? aggregate.stackSize,
      occupiedSeats: [...aggregate.occupiedSeats, ...nextResult.occupiedSeats].sort(),
      blinds: [...aggregate.blinds, ...nextResult.blinds],
      cards: [...aggregate.cards, ...nextResult.cards],
      board: nextResult.board.length > 0 ? nextResult.board : aggregate.board,
      won: aggregate.won.plus(nextResult.won),
      numFolds: nextResult.numFolds + aggregate.numFolds,
      numChecks: nextResult.numChecks + aggregate.numChecks,
      numCalls: nextResult.numCalls + aggregate.numCalls,
      numBets: nextResult.numBets + aggregate.numBets,
      numRaises: nextResult.numRaises + aggregate.numRaises,
      lastStreetSeen: nextResult.lastStreetSeen ?? aggregate.lastStreetSeen,
      wentToShowdown: nextResult.wentToShowdown || aggregate.wentToShowdown,
      handStrength: nextResult.handStrength ?? aggregate.handStrength,
    };
  }

  visitFastFold(): Result {
    return partialResult({ fastFold: true });
  }

  visitHandNumber(ctx: HandNumberContext): Result {
    return partialResult({ handNumber: ctx.text });
  }

  visitTimestamp(ctx: TimestampContext): Result {
    // TODO: This parses the date using the current time zone.
    // Instead, we'll need the user's time zone & to pass it through.
    const text = this.getSubstring(ctx);
    const t = text.split(/\D/).map(Number);
    const timestamp = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    return partialResult({ timestamp });
  }

  visitGame(ctx: GameContext): Result {
    const value = ctx.text;
    switch (value) {
      case 'HOLDEM':
        return partialResult({ game: 'holdem' });
      case 'HOLDEMZonePoker':
        return partialResult({ game: 'holdem', fastFold: true });
      case 'OMAHA':
        return partialResult({ game: 'omaha' });
      case 'OMAHAZonePoker':
        return partialResult({ game: 'omaha', fastFold: true });
      default:
        throw new Error(`Unexpected game: "${value}"`);
    }
  }

  visitLineAction(ctx: LineActionContext): Result {
    return this.useHero(!!ctx.ME(), () => this.visitChildren(ctx));
  }

  visitLineSmallBlind(ctx: LineSmallBlindContext): Result {
    return this.useHero(!!ctx.ME(), () => this.visitChildren(ctx));
  }

  visitLineBigBlind(ctx: LineBigBlindContext): Result {
    return this.useHero(!!ctx.ME(), () => this.visitChildren(ctx));
  }

  visitLineHandsDealt(ctx: LineHandsDealtContext): Result {
    return this.useHero(!!ctx.ME(), () => this.visitChildren(ctx));
  }

  visitLinePlayer(ctx: LinePlayerContext): Result {
    const stackSize = ctx.ME() ? parseNumber(ctx.chipCount().value().text) : undefined;
    return partialResult({ occupiedSeats: [Number(ctx.INT().text)], stackSize });
  }

  visitLinePost(ctx: LinePostContext): Result {
    return this.useHero(!!ctx.ME(), () => this.visitChildren(ctx));
  }

  visitLineUncalled(ctx: LineUncalledContext): Result {
    return this.useHero(!!ctx.ME(), () => this.visitChildren(ctx));
  }

  visitLineResult(ctx: LineResultContext): Result {
    return this.useHero(!!ctx.ME(), () => this.visitChildren(ctx));
  }

  visitLineStreet(ctx: LineStreetContext): Result {
    const result: Partial<Result> = {
      street: getStreet(ctx.STREET().text),
    };
    if (result.street !== undefined && !this.heroFolded) {
      result.lastStreetSeen = result.street;
    }
    return partialResult({ ...this.visitChildren(ctx), ...result });
  }

  visitLineBoard(ctx: LineBoardContext): Result {
    const board: string[] = [];
    ctx
      .board()
      .cards()
      .children?.forEach((child) => {
        if (child instanceof CardContext) {
          board.push(child.text);
        }
      });
    return partialResult({ board });
  }

  visitLineMuck(ctx: LineMuckContext): Result {
    return this.useHero(!!ctx.ME(), () => this.visitChildren(ctx));
  }

  visitLineShowdown(ctx: LineShowdownContext): Result {
    return this.useHero(!!ctx.ME(), () => ({ ...this.visitChildren(ctx), wentToShowdown: true }));
  }

  // sometimes the SUMMARY data is missing (this seems to occur more in Zone/Fast-Fold Poker
  // hands), so we have to reconstruct the board from the last street encountered.
  visitBoardSections(ctx: BoardSectionsContext): Result {
    const board: string[] = [];
    ctx.board().forEach((boardContext) => {
      boardContext.cards().children?.forEach((child) => {
        if (child instanceof CardContext) {
          board.push(child.text);
        }
      });
    });
    return partialResult({ board });
  }

  visitChipCount(ctx: ChipCountContext): Result {
    const blinds: BigNumber[] = [];
    let won = new BigNumber(0);
    const amount = parseNumber(ctx.value().text);

    const isBlind =
      hasAncestor(ctx, LineBigBlindContext) || hasAncestor(ctx, LineSmallBlindContext);

    // capture blinds/stakes
    if (isBlind) {
      blinds.push(amount);
    }

    // hero posted blind
    if (isBlind && this.isHero) {
      won = amount.times(-1);
    }

    // hero posted dead blind
    if (this.isHero && hasAncestor(ctx, LinePostContext)) {
      won = amount.times(-1);
    }

    // hero won the pot
    if (this.isHero && hasAncestor(ctx, LineResultContext)) {
      won = amount;
    }

    // hero bet, called, or called all-in
    if (
      this.isHero &&
      (hasAncestor(ctx, ActionBetContext) ||
        hasAncestor(ctx, ActionCallContext) ||
        hasAncestor(ctx, ActionAllInContext))
    ) {
      won = amount.times(-1);
    }

    // hero raised or raised all-in
    if (
      this.isHero &&
      (hasAncestor(ctx, ActionRaiseContext) || hasAncestor(ctx, ActionAllInRaiseContext))
    ) {
      if (ctx.parent?.getChild(ctx.parent?.childCount - 1) !== ctx) {
        won = amount.times(-1);
      }
    }

    // hero has an uncalled bet returned
    if (this.isHero && hasAncestor(ctx, LineUncalledContext)) {
      won = amount;
    }

    return partialResult({ blinds, won });
  }

  visitCard(ctx: CardContext): Result {
    if (this.isHero && hasAncestor(ctx, LineHandsDealtContext)) {
      return partialResult({ cards: [ctx.text] });
    }
    return this.visitChildren(ctx);
  }

  visitLimit(ctx: LimitContext): Result {
    const value = ctx.text;
    switch (value) {
      case 'Limit':
        return partialResult({ limit: 'limit' });
      case 'No Limit':
        return partialResult({ limit: 'no limit' });
      case 'Pot Limit':
        return partialResult({ limit: 'pot limit' });
      default:
        throw new Error(`Unexpected limit: "${value}"`);
    }
  }

  visitPosition(ctx: PositionContext): Result {
    if (this.isHero && hasAncestor(ctx, LineHandsDealtContext)) {
      const value = ctx.text;
      switch (value) {
        case 'Small Blind':
          return partialResult({ position: 'SB' });
        case 'Big Blind':
          return partialResult({ position: 'BB' });
        case 'UTG':
          return partialResult({ position: 'UTG' });
        case 'UTG+1':
          return partialResult({ position: 'UTG+1' });
        case 'UTG+2':
          return partialResult({ position: 'UTG+2' });
        case 'Dealer':
          return partialResult({ position: 'BTN' });
        default:
          throw new Error(`Unexpected position: "${value}"`);
      }
    }
    return this.visitChildren(ctx);
  }

  visitActionFold(ctx: ActionFoldContext): Result {
    if (this.isHero) {
      this.heroFolded = true;
    }

    return {
      ...this.visitChildren(ctx),
      numFolds: this.isHero ? 1 : 0,
    };
  }

  visitActionCheck(ctx: ActionCheckContext): Result {
    return {
      ...this.visitChildren(ctx),
      numChecks: this.isHero ? 1 : 0,
    };
  }

  visitActionCall(ctx: ActionCallContext): Result {
    return {
      ...this.visitChildren(ctx),
      numCalls: this.isHero ? 1 : 0,
    };
  }

  visitActionBet(ctx: ActionBetContext): Result {
    return {
      ...this.visitChildren(ctx),
      numBets: this.isHero ? 1 : 0,
    };
  }

  visitActionRaise(ctx: ActionRaiseContext): Result {
    return {
      ...this.visitChildren(ctx),
      numRaises: this.isHero ? 1 : 0,
    };
  }

  visitHandStrength(ctx: HandStrengthContext): Result {
    if (this.isHero) {
      return partialResult({ handStrength: getHandStrength(ctx.text) });
    }
    return this.visitChildren(ctx);
  }

  private useHero(isHero: boolean, callback: () => Result) {
    const originalValue = this.isHero;
    this.isHero = isHero;
    try {
      return callback();
    } finally {
      this.isHero = originalValue;
    }
  }

  private getSubstring(ctx: ParserRuleContext): string {
    const { start, stop } = ctx;
    if (!start.inputStream || !stop || start.startIndex < 0 || stop.stopIndex < 0) {
      return start.text ?? '';
    }
    return start.inputStream.getText(Interval.of(start.startIndex, stop.stopIndex));
  }
}
