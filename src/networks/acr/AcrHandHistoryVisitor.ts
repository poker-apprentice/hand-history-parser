import { assertCard } from '@poker-apprentice/types';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import assertNever from 'assert-never';
import BigNumber from 'bignumber.js';
import {
  BettingStructureContext,
  BlindTypeContext,
  LineActionContext,
  LineDealContext,
  LineMetaContext,
  LinePlayerContext,
  LinePostContext,
  LineResultContext,
  VariantContext,
} from '~/grammar/AcrParser';
import { AcrVisitor } from '~/grammar/AcrVisitor';
import { BettingStructure, PostAction, Variant } from '~/types';
import { getParserContextSubstring } from '~/utils/getParserContextSubstring';
import { AcrShowdownVisitor } from './AcrShowdownVisitor';
import { Line, LineMeta } from './types';

// TODO: we're assuming commas are always thousands separators, but that may depend on locale
const parseNumber = (num: string) => new BigNumber(num.replace(',', ''));

const getVariant = (ctx: VariantContext): Variant => {
  switch (ctx.text) {
    case 'Holdem':
      return 'holdem';
    case 'Omaha':
      return 'omaha';
    case 'Omaha H/L':
      return 'omaha-8';
    case '7Stud':
      return 'stud';
    case '7Stud H/L':
      return 'stud-8';
    default:
      throw new Error(`Unexpected variant: "${ctx.text}"`);
  }
};

const getBettingStructure = (ctx: BettingStructureContext): BettingStructure => {
  switch (ctx.text) {
    case 'Fixed Limit':
      return 'limit';
    case 'No Limit':
      return 'no limit';
    case 'Pot Limit':
      return 'pot limit';
    default:
      throw new Error(`Unexpected betting structure: "${ctx.text}"`);
  }
};

const getPostType = (ctx: BlindTypeContext | undefined): PostAction['postType'] => {
  switch (ctx?.text) {
    case 'ante':
      return 'ante';
    case 'small blind':
    case 'big blind':
      return 'blind';
    default:
      return 'dead';
  }
};

export class AcrHandHistoryVisitor
  extends AbstractParseTreeVisitor<Line[]>
  implements AcrVisitor<Line[]>
{
  protected defaultResult(): Line[] {
    return [];
  }

  protected aggregateResult(aggregate: Line[], nextResult: Line[]): Line[] {
    return [...aggregate, ...nextResult];
  }

  visitLineAction(_ctx: LineActionContext): Line[] {
    // TODO
    return [];
  }

  visitLineDeal(ctx: LineDealContext): Line[] {
    const playerName = getParserContextSubstring(ctx.playerName());
    const cardStrings = ctx
      .board()
      .cards()
      .card()
      .map((card) => card.text);
    const cards = cardStrings.filter(assertCard);

    return [{ type: 'action', action: { type: 'deal-hand', playerName, cards } }];
  }

  visitLineMeta(ctx: LineMetaContext): Line[] {
    const site: LineMeta['site'] = 'acr';
    const handNumber = ctx.handNumber().text;
    const timestamp = new Date(getParserContextSubstring(ctx.timestamp()));
    const bettingStructure = getBettingStructure(ctx.bettingStructure());
    const fastFold = false; // TODO
    const variant = getVariant(ctx.variant());

    return [{ type: 'meta', site, handNumber, timestamp, bettingStructure, fastFold, variant }];
  }

  visitLinePlayer(ctx: LinePlayerContext): Line[] {
    const playerName = getParserContextSubstring(ctx.playerName());
    const seatNumber = Number(ctx.seatNumber().text);

    return [{ type: 'player', playerName, seatNumber }];
  }

  visitLinePost(ctx: LinePostContext): Line[] {
    const postType = getPostType(ctx.blindType());
    const playerName = getParserContextSubstring(ctx.playerName());
    const amount = parseNumber(ctx.chipCount().text).toString();

    return [{ type: 'action', action: { type: 'post', postType, playerName, amount } }];
  }

  visitLineResult(ctx: LineResultContext): Line[] {
    const playerName = getParserContextSubstring(ctx.playerName());
    const showdownAction = new AcrShowdownVisitor().visit(ctx.playerShowdown());
    const { type } = showdownAction;

    switch (type) {
      case 'folded':
        return [];
      case 'lost':
        return [
          {
            type: 'action',
            action: {
              type: 'showdown',
              playerName,
              handStrength: showdownAction.handStrength,
              mucked: showdownAction.mucked,
            },
          },
        ];
      case 'won-show':
        return [
          {
            type: 'action',
            action: {
              type: 'showdown',
              playerName,
              handStrength: showdownAction.handStrength,
              mucked: false,
            },
          },
        ];
      case 'won-muck':
        return [
          {
            type: 'action',
            action: {
              type: 'showdown',
              playerName,
              handStrength: undefined, // TODO: manually calculate hand strength
              mucked: true,
            },
          },
        ];
      default:
        return assertNever(type);
    }
  }
}
