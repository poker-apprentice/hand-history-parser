import { assertCard } from '@poker-apprentice/types';
import { ParserRuleContext } from 'antlr4ts';
import { Interval } from 'antlr4ts/misc/Interval';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import {
  BettingStructureContext,
  HandStrengthContext,
  LineActionContext,
  LineHandsDealtContext,
  LineMetaContext,
  LineMuckContext,
  LinePlayerContext,
  LinePostContext,
  LineResultContext,
  LineShowdownContext,
  LineSmallBlindContext,
  LineStreetContext,
  LineUncalledContext,
  PositionContext,
  SiteContext,
  VariantContext,
} from '~/grammar/IgnitionParser';
import { IgnitionVisitor } from '~/grammar/IgnitionVisitor';
import { BettingStructure, HandStrength, Position, Site, Street, Variant } from '~/types';
import { IgnitionActionVisitor } from './IgnitionActionVisitor';
import { IgnitionChipCountVisitor } from './IgnitionChipCountVisitor';
import { Line } from './types';

const getSite = (ctx: SiteContext): Site => {
  switch (ctx.text) {
    case 'Bodog':
      return 'bodog';
    case 'Bovada':
      return 'bovada';
    case 'Ignition':
      return 'ignition';
    default:
      throw new Error(`Unexpected site: "${ctx.text}"`);
  }
};

const getSubstring = (ctx: ParserRuleContext): string => {
  const { start, stop } = ctx;
  if (!start.inputStream || !stop || start.startIndex < 0 || stop.stopIndex < 0) {
    return start.text ?? '';
  }
  return start.inputStream.getText(Interval.of(start.startIndex, stop.stopIndex));
};

const getVariant = (ctx: VariantContext): Variant => {
  switch (ctx.text) {
    case 'HOLDEM':
    case 'HOLDEMZonePoker':
      return 'holdem';
    case 'OMAHA':
    case 'OMAHAZonePoker':
      return 'omaha';
    case 'OMAHA HiLo':
      return 'omaha-8';
    default:
      throw new Error(`Unexpected variant: "${ctx.text}"`);
  }
};

const getBettingStructure = (ctx: BettingStructureContext): BettingStructure => {
  switch (ctx.text) {
    case 'Limit':
      return 'limit';
    case 'No Limit':
      return 'no limit';
    case 'Pot Limit':
      return 'pot limit';
    default:
      throw new Error(`Unexpected betting structure: "${ctx.text}"`);
  }
};

const getPosition = (ctx: PositionContext): Position => {
  switch (ctx.text) {
    case 'Small Blind':
      return 'SB';
    case 'Big Blind':
      return 'BB';
    case 'UTG':
      return 'UTG';
    case 'UTG+1':
      return 'UTG+1';
    case 'UTG+2':
      return 'UTG+2';
    case 'Dealer':
      return 'BTN';
    default:
      throw new Error(`Unexpected position: "${ctx.text}"`);
  }
};

const getStreet = (ctx: TerminalNode): Street | undefined => {
  switch (ctx.text) {
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
      throw new Error(`Unexpected street: "${ctx.text}"`);
  }
};

const getHandStrength = (ctx: HandStrengthContext): HandStrength => {
  switch (ctx.text) {
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
      throw new Error(`Unexpected hand strength: "${ctx.text}"`);
  }
};

export class IgnitionHandHistoryVisitor
  extends AbstractParseTreeVisitor<Line[]>
  implements IgnitionVisitor<Line[]>
{
  protected defaultResult(): Line[] {
    return [];
  }

  protected aggregateResult(aggregate: Line[], nextResult: Line[]): Line[] {
    return [...aggregate, ...nextResult];
  }

  public visitLineAction(ctx: LineActionContext): Line[] {
    const actions = new IgnitionActionVisitor().visit(ctx);
    return actions.map((action) => ({ type: 'action', action }));
  }

  public visitLineMeta(ctx: LineMetaContext): Line[] {
    const site = getSite(ctx.site());

    const handNumber = ctx.handNumber().text;

    const variantContext = ctx.variant();
    const variant = getVariant(variantContext);

    const bettingStructure = getBettingStructure(ctx.bettingStructure());

    const fastFold =
      !!ctx.fastFold() ||
      variantContext.text === 'HOLDEMZonePoker' ||
      variantContext.text === 'OMAHAZonePoker'; // TODO: OMAHA8 version of ZonePoker?

    const text = getSubstring(ctx.timestamp());
    const t = text.split(/\D/).map(Number);
    const timestamp = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);

    return [{ type: 'meta', site, handNumber, fastFold, variant, bettingStructure, timestamp }];
  }

  public visitLineSmallBlind(ctx: LineSmallBlindContext): Line[] {
    const chipCount = new IgnitionChipCountVisitor().visit(ctx.chipCount()).toString();
    const playerName = 'Small Blind';
    return [
      { type: 'smallBlind', chipCount },
      {
        type: 'action',
        action: { type: 'post', amount: chipCount, playerName, postType: 'blind' },
      },
    ];
  }

  public visitLineBigBlind(ctx: LineSmallBlindContext): Line[] {
    const chipCount = new IgnitionChipCountVisitor().visit(ctx.chipCount()).toString();
    const playerName = 'Big Blind';
    return [
      { type: 'bigBlind', chipCount },
      {
        type: 'action',
        action: { type: 'post', amount: chipCount, playerName, postType: 'blind' },
      },
    ];
  }

  public visitLinePost(ctx: LinePostContext): Line[] {
    const chipCount = new IgnitionChipCountVisitor().visit(ctx.chipCount()).toString();
    const isDead = !!ctx.DEAD();
    const playerName = ctx.position().text;
    return [
      {
        type: 'action',
        action: { type: 'post', amount: chipCount, playerName, postType: isDead ? 'dead' : 'ante' },
      },
    ];
  }

  public visitLineUncalled(ctx: LineUncalledContext): Line[] {
    const chipCount = new IgnitionChipCountVisitor().visit(ctx.chipCount()).toString();
    const playerName = ctx.position().text;
    return [{ type: 'action', action: { type: 'return-bet', playerName, amount: chipCount } }];
  }

  public visitLinePlayer(ctx: LinePlayerContext): Line[] {
    const seatNumber = Number(ctx.seatNumber().text);
    const positionContext = ctx.position();
    const name = positionContext.text;
    const position = getPosition(positionContext);
    const chipCount = new IgnitionChipCountVisitor().visit(ctx.chipCount()).toString();
    const isHero = !!ctx.ME();
    const isAnonymous = !isHero;

    return [{ type: 'player', name, position, seatNumber, chipCount, isHero, isAnonymous }];
  }

  public visitLineStreet(ctx: LineStreetContext): Line[] {
    const street = getStreet(ctx.STREET());
    if (!street || street === 'preflop') {
      return [];
    }

    const boardSections = ctx.boardSections();
    const cardStrings =
      boardSections
        ?.board()
        .at(-1)
        ?.cards()
        .card()
        .map((card) => card.text) ?? [];
    const cards = cardStrings.filter(assertCard);

    return [{ type: 'action', action: { type: 'deal-board', street, cards } }];
  }

  public visitLineHandsDealt(ctx: LineHandsDealtContext): Line[] {
    const playerName = ctx.position().text;
    const cardStrings =
      ctx
        .hand()
        .cards()
        .card()
        .map((card) => card.text) ?? [];
    const cards = cardStrings.filter(assertCard);

    return [{ type: 'action', action: { type: 'deal-hand', playerName, cards } }];
  }

  public visitLineMuck(ctx: LineMuckContext): Line[] {
    const playerName = ctx.position().text;
    const handStrength = getHandStrength(ctx.handStrength());
    return [
      { type: 'action', action: { type: 'showdown', playerName, handStrength, mucked: true } },
    ];
  }

  public visitLineShowdown(ctx: LineShowdownContext): Line[] {
    const playerName = ctx.position().text;
    const handStrength = getHandStrength(ctx.handStrength());
    return [
      { type: 'action', action: { type: 'showdown', playerName, handStrength, mucked: false } },
    ];
  }

  public visitLineResult(ctx: LineResultContext): Line[] {
    const playerName = ctx.position().text;
    const isSidePot = !!ctx.SIDEPOT();
    const chipCount = new IgnitionChipCountVisitor().visit(ctx.chipCount()).toString();
    return [
      { type: 'action', action: { type: 'award-pot', playerName, amount: chipCount, isSidePot } },
    ];
  }
}
