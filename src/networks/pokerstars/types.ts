import { Action, BettingStructure, Site, Variant } from '~/types';

export type PokerStarsSite = Site & 'pokerstars';

interface BaseLine {
  type: string;
}

export interface LineAction extends BaseLine {
  type: 'action';
  action: Action;
}

interface LineGameMetaBase extends BaseLine {
  type: 'gameMeta';
  gameType: string;
  site: PokerStarsSite;
  currency: string;
  handNumber: string;
  variant: Variant;
  bettingStructure: BettingStructure;
  timestamp: Date;
}

interface LineGameMetaCash extends LineGameMetaBase {
  gameType: 'cash';
}

interface LineMetaTournament extends LineGameMetaBase {
  gameType: 'tournament';
  tournamentNumber: string;
  level: number;
  // speed: TournamentSpeed | undefined;
  buyIn: string;
  entryFee: string;
}

export type LineGameMeta = LineGameMetaCash | LineMetaTournament;

export interface LineTableMeta {
  type: 'tableMeta';
  tableName: string;
  tableSize: number;
}

export interface LinePlayer extends BaseLine {
  type: 'player';
  name: string;
  positionIndex: number;
  seatNumber: number;
  chipCount: string;
  bounty: string | undefined;
}

export interface LineSmallBlind extends BaseLine {
  type: 'smallBlind';
  chipCount: string;
}

export interface LineBigBlind extends BaseLine {
  type: 'bigBlind';
  chipCount: string;
}

export interface LineAnte extends BaseLine {
  type: 'ante';
  chipCount: string;
}

export type Line =
  | LineAction
  | LineGameMeta
  | LineTableMeta
  | LinePlayer
  | LineSmallBlind
  | LineBigBlind
  | LineAnte;

export class NotImplementedError extends Error {}
