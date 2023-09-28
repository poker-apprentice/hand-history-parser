import { BovadaLexer } from '~/grammar/BovadaLexer';
import { BovadaParser } from '~/grammar/BovadaParser';
import { HandHistory } from '~/types';
import { getParser } from '~/utils/getParser';
import { Dictionary, groupBy } from '~/utils/groupBy';
import { BovadaHandHistoryVisitor } from './BovadaHandHistoryVisitor';
import { Line, LineAction, LineBigBlind, LineMeta, LinePlayer, LineSmallBlind } from './types';

type LineDictionary = Dictionary<Line>;

class LineNotFoundError extends Error {}

const getInfo = (lines: LineDictionary): HandHistory['info'] => {
  const meta: LineMeta | undefined = lines.meta?.[0];
  if (!meta) {
    throw new LineNotFoundError('Missing meta information');
  }

  // the big blind is always required, the small blind is not
  const smallBlind: LineSmallBlind | undefined = lines.smallBlind?.[0];
  const bigBlind: LineBigBlind | undefined = lines.bigBlind?.[0];
  const blinds: string[] = [];
  if (smallBlind) {
    blinds.push(smallBlind.chipCount);
  }
  if (!bigBlind) {
    throw new LineNotFoundError('Missing big blind information');
  }
  blinds.push(bigBlind.chipCount);

  // Bovada only has 6-person and 9-person tables. Fast-fold games are all 6-max, otherwise make a
  // best guess on table size based upon the number of players recorded in the hand.
  const playerCount = (lines.player ?? []).length;
  const tableSize = meta.fastFold ? 6 : playerCount > 6 ? 9 : 6;

  return {
    blinds,
    currency: 'USD',
    variant: meta.variant,
    handNumber: meta.handNumber,
    isFastFold: meta.fastFold,
    bettingStructure: meta.bettingStructure,
    site: 'bovada',
    tableSize,
    timestamp: meta.timestamp,
  };
};

const getPlayers = (lines: LineDictionary): HandHistory['players'] => {
  const players: LinePlayer[] = lines.player ?? [];

  return players.map((player) => ({
    name: player.name,
    position: player.position,
    seatNumber: player.seatNumber,
    chipStack: player.chipCount,
    isHero: player.isHero,
    isAnonymous: player.isAnonymous,
  }));
};

const getActions = (lines: LineDictionary): HandHistory['actions'] => {
  const actions: LineAction[] = lines.action ?? [];
  if (actions.some(({ type }) => type !== 'action')) {
    throw new LineNotFoundError('Missing actions');
  }

  return actions.map(({ action }, index) => {
    // Reconcile 'bet' all-ins that should be treated as 'call' all-ins. (Bovada does not
    // differentiate these actions in their hand histories.)
    if (action.type === 'bet' && action.isAllIn) {
      const previousAction = actions[index - 1]?.action;
      if (previousAction?.type === 'bet' || previousAction?.type === 'raise') {
        return { ...action, type: 'call' };
      }
    }
    return action;
  });
};

export const parseHand = (hand: string): HandHistory => {
  const parser = getParser(hand, { lexer: BovadaLexer, parser: BovadaParser });
  const context = parser.handHistory();

  const visitor = new BovadaHandHistoryVisitor();
  const lines = visitor.visit(context);
  const groupedLines = groupBy(lines, 'type');

  return {
    info: getInfo(groupedLines),
    players: getPlayers(groupedLines),
    actions: getActions(groupedLines),
  };
};
