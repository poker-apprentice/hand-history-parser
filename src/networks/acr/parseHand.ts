import { AcrLexer } from '~/grammar/AcrLexer';
import { AcrParser } from '~/grammar/AcrParser';
import { HandHistory } from '~/types';
import { getParser } from '~/utils/getParser';
import { groupBy } from '~/utils/groupBy';
import { AcrHandHistoryVisitor } from './AcrHandHistoryVisitor';

export const parseHand = (hand: string): HandHistory => {
  const parser = getParser(hand, { lexer: AcrLexer, parser: AcrParser });
  const context = parser.handHistory();

  const visitor = new AcrHandHistoryVisitor();
  const lines = visitor.visit(context);
  const groupedLines = groupBy(lines, 'type');

  return {
    info: getInfo(groupedLines),
    players: getPlayers(groupedLines),
    actions: getActions(groupedLines),
  };
};
