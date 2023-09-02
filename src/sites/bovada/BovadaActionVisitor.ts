import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { LineActionContext } from '~/grammar/BovadaParser';
import { BovadaVisitor } from '~/grammar/BovadaVisitor';
import { Action } from '~/types';
import { BovadaChipCountVisitor } from './BovadaChipCountVisitor';
import { NotImplementedError } from './types';

export class BovadaActionVisitor
  extends AbstractParseTreeVisitor<Action[]>
  implements BovadaVisitor<Action[]>
{
  protected defaultResult(): Action[] {
    return [];
  }

  protected aggregateResult(aggregate: Action[], nextResult: Action[]): Action[] {
    return [...aggregate, ...nextResult];
  }

  visitLineAction(ctx: LineActionContext): Action[] {
    const action = ctx.action();

    const allInAction = action.actionAllIn();
    if (allInAction) {
      const chipCount = new BovadaChipCountVisitor().visit(allInAction.chipCount());
      const playerName = ctx.position().text;

      // This all-in action could actually represent a bet or a call. Unfortunately,
      // Bovada hand histories don't clarify which it is. To address this, we just
      // treat it as a bet here, and we'll rectify it in the parent function where we
      // can compare against the previous actions.
      return [{ type: 'bet', playerName, amount: chipCount.toString(), isAllIn: true }];
    }

    const allInRaiseAction = action.actionAllInRaise();
    if (allInRaiseAction) {
      const chipCount = new BovadaChipCountVisitor().visit(allInRaiseAction.chipCount()[1]);
      const playerName = ctx.position().text;
      return [{ type: 'raise', playerName, amount: chipCount.toString(), isAllIn: true }];
    }

    const betAction = action.actionBet();
    if (betAction) {
      const chipCount = new BovadaChipCountVisitor().visit(betAction.chipCount());
      const playerName = ctx.position().text;
      return [{ type: 'bet', playerName, amount: chipCount.toString(), isAllIn: false }];
    }

    const callAction = action.actionCall();
    if (callAction) {
      const chipCount = new BovadaChipCountVisitor().visit(callAction.chipCount());
      const playerName = ctx.position().text;
      return [{ type: 'call', playerName, amount: chipCount.toString(), isAllIn: false }];
    }

    const checkAction = action.actionCheck();
    if (checkAction) {
      const playerName = ctx.position().text;
      return [{ type: 'check', playerName }];
    }

    const foldAction = action.actionFold();
    if (foldAction) {
      const playerName = ctx.position().text;
      return [{ type: 'fold', playerName }];
    }

    const raiseAction = action.actionRaise();
    if (raiseAction) {
      const chipCount = new BovadaChipCountVisitor().visit(raiseAction.chipCount()[1]);
      const playerName = ctx.position().text;
      return [{ type: 'raise', playerName, amount: chipCount.toString(), isAllIn: false }];
    }

    throw new NotImplementedError();
  }
}
