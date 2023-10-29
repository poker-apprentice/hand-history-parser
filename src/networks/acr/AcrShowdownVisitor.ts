import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { NotImplementedError } from '~/errors/NotImplementedError';
import {
  HandStrengthContext,
  PlayerShowdownLostContext,
  PlayerShowdownWonShowContext,
} from '~/grammar/AcrParser';
import { AcrVisitor } from '~/grammar/AcrVisitor';
import { HandStrength } from '~/types';
import { ShowdownAction } from './types';

const getHandStrength = (ctx: HandStrengthContext): HandStrength => {
  switch (ctx.text) {
    case 'a high card':
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
    case 'four of a kind':
      return HandStrength.FourOfAKind;
    case 'a straight flush':
      return HandStrength.StraightFlush;
    case 'a royal flush':
      return HandStrength.RoyalFlush;
    default:
      throw new Error(`Unexpected hand strength: "${ctx.text}"`);
  }
};

export class AcrShowdownVisitor
  extends AbstractParseTreeVisitor<ShowdownAction>
  implements AcrVisitor<ShowdownAction>
{
  protected defaultResult(): ShowdownAction {
    throw new NotImplementedError();
  }

  visitPlayerShowdownFolded(): ShowdownAction {
    return { type: 'folded' };
  }

  visitPlayerShowdownLost(ctx: PlayerShowdownLostContext): ShowdownAction {
    const handStrength = getHandStrength(ctx.finalHandSummary().handStrength());
    return { type: 'lost', handStrength, mucked: false };
  }

  visitPlayerShowdownWonShow(ctx: PlayerShowdownWonShowContext): ShowdownAction {
    const handStrength = getHandStrength(
      ctx.complexFinalHandSummary().finalHandSummary()!.handStrength(),
    );
    return { type: 'won-show', handStrength };
  }

  visitPlayerShowdownWonMuck(): ShowdownAction {
    return { type: 'won-muck' };
  }
}
