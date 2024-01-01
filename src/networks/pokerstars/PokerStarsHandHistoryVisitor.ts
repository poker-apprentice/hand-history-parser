import { Card, HandStrength, assertCard } from '@poker-apprentice/types';
import { ParserRuleContext } from 'antlr4ts';
import { Interval } from 'antlr4ts/misc/Interval';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import {
  BettingStructureContext,
  HandStrengthContext,
  LineActionContext,
  LineAwardBountyContext,
  LineCashGameMetaContext,
  LineDealContext,
  LinePlayerContext,
  LinePostAnteContext,
  LinePostBigBlindContext,
  LinePostSmallBlindContext,
  LineResultContext,
  LineShowdownContext,
  LineStreetContext,
  LineTableMetaContext,
  LineTournamentMetaContext,
  LineTournamentPlacementContext,
  LineUncalledContext,
  VariantContext,
} from '~/grammar/PokerStarsParser';
import { PokerStarsVisitor } from '~/grammar/PokerStarsVisitor';
import { BettingStructure, Street, Variant } from '~/types';
import { PokerStarsActionVisitor } from './PokerStarsActionVisitor';
import { getChipCount } from './getChipCount';
import { parseRomanNumeral } from './parseRomanNumeral';
import { Line } from './types';

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
    case 'SHOW DOWN':
      return undefined;
    case 'SUMMARY':
      return undefined;
    default:
      throw new Error(`Unexpected street: "${ctx.text}"`);
  }
};

const getHandStrength = (ctx: HandStrengthContext | undefined): HandStrength | undefined => {
  if (!ctx) {
    return undefined;
  }

  switch (ctx.text) {
    case 'high card':
      return HandStrength.HighCard;
    case 'a pair':
      return HandStrength.OnePair;
    case 'two pair':
      return HandStrength.TwoPair;
    case 'three of a kind':
      return HandStrength.ThreeOfAKind;
    case 'a straight':
      return HandStrength.Straight;
    case 'a flush':
      return HandStrength.Flush;
    case 'a full house':
      return HandStrength.FullHouse;
    case 'Four of a kind':
      return HandStrength.FourOfAKind;
    case 'a straight flush':
      return HandStrength.StraightFlush;
    case 'a royal flush':
      return HandStrength.RoyalFlush;
    default:
      throw new Error(`Unexpected hand strength: "${ctx.text}"`);
  }
};

export class PokerStarsHandHistoryVisitor
  extends AbstractParseTreeVisitor<Line[]>
  implements PokerStarsVisitor<Line[]>
{
  protected defaultResult(): Line[] {
    return [];
  }

  protected aggregateResult(aggregate: Line[], nextResult: Line[]): Line[] {
    return [...aggregate, ...nextResult];
  }

  public visitLineAction(ctx: LineActionContext): Line[] {
    const actions = new PokerStarsActionVisitor().visit(ctx);
    return actions.map((action) => ({ type: 'action', action }));
  }

  public visitLineCashGameMeta(ctx: LineCashGameMetaContext): Line[] {
    const handNumber = ctx.handNumber().text;
    const currency = ctx.currency().text;

    const variantContext = ctx.variant();
    const variant = getVariant(variantContext);

    const bettingStructure = getBettingStructure(ctx.bettingStructure());

    const text = getSubstring(ctx.timestamp());
    const t = text.split(/\D/).map(Number);
    const timestamp = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);

    return [
      {
        type: 'gameMeta',
        gameType: 'cash',
        site: 'pokerstars',
        currency,
        handNumber,
        variant,
        bettingStructure,
        timestamp,
      },
    ];
  }

  public visitLineTournamentMeta(ctx: LineTournamentMetaContext): Line[] {
    const tournamentNumber = ctx.tournamentNumber().text;
    const handNumber = ctx.handNumber().text;
    const currency = ctx.currency().text;

    const variantContext = ctx.variant();
    const variant = getVariant(variantContext);

    const bettingStructure = getBettingStructure(ctx.bettingStructure());

    const level = parseRomanNumeral(ctx.levelNumber().text);

    const buyIn = getChipCount(ctx.buyIn().currencyValue());
    const entryFee = getChipCount(ctx.entryFee().currencyValue());

    const bountyFeeContext = ctx.bountyChip();
    const bountyFee = bountyFeeContext && getChipCount(bountyFeeContext.currencyValue());

    const text = getSubstring(ctx.timestamp());
    const t = text.split(/\D/).map(Number);
    const timestamp = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);

    return [
      {
        type: 'gameMeta',
        gameType: 'tournament',
        site: 'pokerstars',
        currency,
        tournamentNumber,
        handNumber,
        variant,
        bettingStructure,
        level,
        buyIn: buyIn.plus(bountyFee ?? 0).toString(),
        entryFee: entryFee.toString(),
        timestamp,
      },
    ];
  }

  public visitLineTableMeta(ctx: LineTableMetaContext): Line[] {
    const tableSize = Number(ctx.tableSize().text);
    const tableName = ctx.tableName().text;
    return [{ type: 'tableMeta', tableSize, tableName }];
  }

  public visitPostLineSmallBlind(ctx: LinePostSmallBlindContext): Line[] {
    const chipCount = getChipCount(ctx.currencyValue()).toString();
    const playerName = ctx.playerName().text;
    return [
      { type: 'smallBlind', chipCount },
      {
        type: 'action',
        action: { type: 'post', amount: chipCount, playerName, postType: 'blind' },
      },
    ];
  }

  public visitPostLineBigBlind(ctx: LinePostBigBlindContext): Line[] {
    const chipCount = getChipCount(ctx.currencyValue()).toString();
    const playerName = ctx.playerName().text;
    return [
      { type: 'bigBlind', chipCount },
      {
        type: 'action',
        action: { type: 'post', amount: chipCount, playerName, postType: 'blind' },
      },
    ];
  }

  public visitLinePostAnte(ctx: LinePostAnteContext): Line[] {
    const chipCount = getChipCount(ctx.currencyValue()).toString();
    const playerName = ctx.playerName().text;
    return [
      {
        type: 'action',
        action: { type: 'post', amount: chipCount, playerName, postType: 'ante' },
      },
    ];
  }

  public visitLineUncalled(ctx: LineUncalledContext): Line[] {
    const chipCount = getChipCount(ctx.currencyValue()).toString();
    const playerName = ctx.playerName().text;
    return [{ type: 'action', action: { type: 'return-bet', playerName, amount: chipCount } }];
  }

  public visitLinePlayer(ctx: LinePlayerContext): Line[] {
    const seatNumber = Number(ctx.INT().text);
    const name = ctx.playerName().text;
    const chipCount = getChipCount(ctx.playerChips().currencyValue()).toString();
    const bountyContext = ctx.playerBounty();
    const bounty = bountyContext && getChipCount(bountyContext.currencyValue()).toString();
    return [{ type: 'player', name, seatNumber, positionIndex: seatNumber - 1, chipCount, bounty }];
  }

  public visitLineStreet(ctx: LineStreetContext): Line[] {
    const street = getStreet(ctx.STREET_HEADING());
    if (!street || street === 'preflop') {
      return [];
    }

    const cardStrings =
      ctx
        .cardCollection()
        .at(-1)
        ?.cards()
        .CARD()
        .map((card) => card.text) ?? [];

    const cards = cardStrings.map((card) => {
      assertCard(card);
      return card as Card;
    });

    return [{ type: 'action', action: { type: 'deal-board', street, cards } }];
  }

  public visitLineDeal(ctx: LineDealContext): Line[] {
    const playerName = ctx.playerName().text;
    const cardStrings =
      ctx
        .cardCollection()
        .cards()
        .CARD()
        .map((card) => card.text) ?? [];
    const cards = cardStrings.map((card) => {
      assertCard(card);
      return card as Card;
    });

    return [{ type: 'action', action: { type: 'deal-hand', playerName, cards } }];
  }

  public visitLineShowdown(ctx: LineShowdownContext): Line[] {
    const playerName = ctx.playerName().text;
    const handStrengthContext = ctx.handStrength();
    const handStrength = getHandStrength(handStrengthContext);
    return [
      {
        type: 'action',
        action: { type: 'showdown', playerName, handStrength, mucked: !handStrengthContext },
      },
    ];
  }

  public visitLineResult(ctx: LineResultContext): Line[] {
    const playerName = ctx.playerName().text;
    const isSidePot = false;
    const chipCount = getChipCount(ctx.currencyValue()).toString();
    return [
      { type: 'action', action: { type: 'award-pot', playerName, amount: chipCount, isSidePot } },
    ];
  }

  public visitLineAwardBounty(ctx: LineAwardBountyContext): Line[] {
    const playerName = ctx.playerName()[0].text;
    const chipCount = getChipCount(ctx.currencyValue()[0]).toString();
    return [{ type: 'action', action: { type: 'award-bounty', playerName, amount: chipCount } }];
  }

  public visitLineTournamentPlacement(ctx: LineTournamentPlacementContext): Line[] {
    const playerName = ctx.playerName().text;
    const placement = Number(ctx.placement().text);
    const amount = getChipCount(ctx.currencyValue()).toString();
    return [
      { type: 'action', action: { type: 'tournament-placement', playerName, placement } },
      { type: 'action', action: { type: 'tournament-award', playerName, amount } },
    ];
  }
}
