import BigNumber from 'bignumber.js';
import { IgnitionLexer } from '~/grammar/IgnitionLexer';
import { IgnitionParser } from '~/grammar/IgnitionParser';
import { GameInfoBase, HandHistory, ParseHandOptions, TableSize } from '~/types';
import { getParser } from '~/utils/getParser';
import { getPosition } from '~/utils/getPosition';
import { Dictionary, groupBy } from '~/utils/groupBy';
import { PokerStarsHandHistoryVisitor } from './PokerStarsHandHistoryVisitor';
import {
  Line,
  LineAction,
  LineBigBlind,
  LineGameMeta,
  LinePlayer,
  LineSmallBlind,
  LineTableMeta,
} from './types';

type LineDictionary = Dictionary<Line>;

class LineNotFoundError extends Error {}

const getInfo = (lines: LineDictionary): HandHistory['info'] => {
  const meta: LineGameMeta | undefined = lines.gameMeta?.[0];
  if (!meta) {
    throw new LineNotFoundError('Missing meta information');
  }

  const table: LineTableMeta | undefined = lines.tableMeta?.[0];
  if (!table) {
    throw new LineNotFoundError('Missing table information');
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

  // the ante value should be the same for every player, so we can just extract the first value
  const ante = lines.ante?.[0].chipCount ?? '0';

  const tableSize = Math.min(
    Math.max(2 satisfies TableSize, table.tableSize),
    9 satisfies TableSize,
  ) as TableSize;

  if (tableSize !== table.tableSize) {
    throw new Error(`Unexpected table size: ${table.tableSize}`);
  }

  const baseInfo: GameInfoBase = {
    type: meta.gameType,
    blinds,
    ante,
    currency: meta.currency,
    variant: meta.variant,
    bettingStructure: meta.bettingStructure,
    handNumber: meta.handNumber,
    tableNumber: table.tableName,
    site: meta.site,
    tableSize,
    timestamp: meta.timestamp,
  };

  if (meta.gameType === 'cash') {
    return {
      ...baseInfo,
      type: 'cash',
      bettingStructure: meta.bettingStructure,
      isFastFold: false,
    };
  }

  const totalCost = new BigNumber(meta.buyIn).plus(meta.entryFee);

  const formattedCost = totalCost.eq(0)
    ? 'Freeroll'
    : Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: meta.currency,
      }).format(totalCost.toNumber());

  return {
    ...baseInfo,
    type: 'tournament',
    name: `${formattedCost} Tournament`, // TODO: better tourney name?
    tournamentNumber: meta.tournamentNumber,
    tournamentStart: meta.timestamp, // TODO: this is actually the hand start time
    format: 'freezeout', // TODO: we're not collecting this currently
    level: meta.level,
    speed: 'normal', // TODO: we're not collecting this currently
    buyIn: meta.buyIn,
    entryFee: meta.entryFee,
    isSatellite: false, // TODO: we're not collecting this currently
    guaranteedPrizePool: '0', // TODO: we're not collecting this currently
  };
};

const getPlayers = (lines: LineDictionary, tableSize: TableSize): HandHistory['players'] => {
  const players: LinePlayer[] = lines.player ?? [];

  return players.map((player) => ({
    name: player.name,
    positionIndex: player.positionIndex,
    position: getPosition(player.positionIndex, tableSize),
    seatNumber: player.seatNumber,
    chipStack: player.chipCount,
    bounty: player.bounty ?? '0',
    isHero: false, // player.isHero, // TODO
    isAnonymous: false,
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

export const parseHand = ({ hand }: ParseHandOptions): HandHistory => {
  const parser = getParser(hand, { lexer: IgnitionLexer, parser: IgnitionParser });
  const context = parser.handHistory();

  const visitor = new PokerStarsHandHistoryVisitor();
  const lines = visitor.visit(context);
  const groupedLines = groupBy(lines, 'type');

  const info = getInfo(groupedLines);
  const players = getPlayers(groupedLines, info.tableSize);
  const actions = getActions(groupedLines);

  return { info, players, actions };
};
