import omit from 'lodash/omit';
import { IgnitionLexer } from '~/grammar/IgnitionLexer';
import { IgnitionParser } from '~/grammar/IgnitionParser';
import { GameInfoBase, HandHistory } from '~/types';
import { OmitStrict } from '~/types/OmitStrict';
import { getParser } from '~/utils/getParser';
import { Dictionary, groupBy } from '~/utils/groupBy';
import { IgnitionHandHistoryVisitor } from './IgnitionHandHistoryVisitor';
import { TournamentFilenameMeta, parseFilename } from './parseFilename';
import { Line, LineAction, LineBigBlind, LineMeta, LinePlayer, LineSmallBlind } from './types';

type LineDictionary = Dictionary<Line>;

class LineNotFoundError extends Error {}

const getFilenameInfo = (
  filename: string | undefined,
): OmitStrict<TournamentFilenameMeta, 'timestamp' | 'tournamentNumber' | 'variant'> => {
  const info = filename ? parseFilename(filename) : undefined;

  if (info?.type === 'tournament') {
    return omit(info, ['timestamp', 'tournamentNumber', 'variant']);
  }

  // return sane defaults if parsing fails or is returning wrong game type for some reason
  return {
    type: 'tournament',
    bettingStructure: 'no limit',
    buyIn: '0',
    entryFee: '0',
    currency: 'USD',
    format: 'freezeout',
    guaranteedPrizePool: '0',
    isSatellite: false,
    name: 'Unknown',
  };
};

const getInfo = (lines: LineDictionary, filename: string | undefined): HandHistory['info'] => {
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

  // Bovada only has 6-person and 9-person cash game tables. Fast-fold games are all 6-max,
  // otherwise make a best guess on table size based upon the number of players in the hand.
  const playerCount = (lines.player ?? []).length;
  const tableSize = meta.gameType === 'cash' && meta.fastFold ? 6 : playerCount > 6 ? 9 : 6;

  const baseInfo: GameInfoBase = {
    type: meta.gameType,
    blinds,
    variant: meta.variant,
    handNumber: meta.handNumber,
    tableNumber: meta.tableNumber,
    site: meta.site,
    tableSize,
    timestamp: meta.timestamp,
  };

  if (meta.gameType === 'cash') {
    return {
      ...baseInfo,
      type: 'cash',
      currency: 'USD',
      bettingStructure: meta.bettingStructure,
      isFastFold: meta.fastFold,
    };
  }

  // For tournaments, additional details are in the hand history filename.
  // There's no need to parse the filename for cash games.
  const filenameInfo = getFilenameInfo(filename);

  return {
    ...baseInfo,
    ...filenameInfo,
    type: 'tournament',
    tournamentNumber: meta.tournamentNumber,
    level: meta.level,
    speed: meta.speed,
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

export const parseHand = ({ hand, filename }: { hand: string; filename?: string }): HandHistory => {
  const parser = getParser(hand, { lexer: IgnitionLexer, parser: IgnitionParser });
  const context = parser.handHistory();

  const visitor = new IgnitionHandHistoryVisitor();
  const lines = visitor.visit(context);
  const groupedLines = groupBy(lines, 'type');

  return {
    info: getInfo(groupedLines, filename),
    players: getPlayers(groupedLines),
    actions: getActions(groupedLines),
  };
};
