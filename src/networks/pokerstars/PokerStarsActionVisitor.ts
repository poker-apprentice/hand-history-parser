import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { LineActionContext } from '~/grammar/PokerStarsParser';
import { PokerStarsVisitor } from '~/grammar/PokerStarsVisitor';
import { Action } from '~/types';
import { getChipCount } from './getChipCount';
import { NotImplementedError } from './types';

export class PokerStarsActionVisitor
  extends AbstractParseTreeVisitor<Action[]>
  implements PokerStarsVisitor<Action[]>
{
  protected defaultResult(): Action[] {
    return [];
  }

  protected aggregateResult(aggregate: Action[], nextResult: Action[]): Action[] {
    return [...aggregate, ...nextResult];
  }

  visitLineAction(ctx: LineActionContext): Action[] {
    const action = ctx.action();

    const betAction = action.actionBet();
    if (betAction) {
      const amount = getChipCount(betAction.currencyValue());
      const playerName = ctx.playerName().text;
      return [{ type: 'bet', playerName, amount, isAllIn: !!betAction.allIn() }];
    }

    const callAction = action.actionCall();
    if (callAction) {
      const amount = getChipCount(callAction.currencyValue());
      const playerName = ctx.playerName().text;
      return [{ type: 'call', playerName, amount, isAllIn: !!callAction.allIn() }];
    }

    const checkAction = action.actionCheck();
    if (checkAction) {
      const playerName = ctx.playerName().text;
      return [{ type: 'check', playerName }];
    }

    const foldAction = action.actionFold();
    if (foldAction) {
      const playerName = ctx.playerName().text;
      return [{ type: 'fold', playerName }];
    }

    const raiseAction = action.actionRaise();
    if (raiseAction) {
      const amount = getChipCount(raiseAction.currencyValue()[0]);
      const totalBet = getChipCount(raiseAction.currencyValue()[1]);
      const playerName = ctx.playerName().text;
      return [{ type: 'raise', playerName, amount, totalBet, isAllIn: !!raiseAction.allIn() }];
    }

    // const anteAction = action.actionAnte();
    // if (anteAction) {
    //   const amount = getChipCount(anteAction.chipCount());
    //   const playerName = ctx.playerName().text;
    //   return [{ type: 'post', postType: 'ante', playerName, amount }];
    // }

    throw new NotImplementedError();
  }
}
