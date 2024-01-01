import { Action, BettingStructure, Site, TournamentSpeed, Variant } from '~/types';

export type IgnitionSite = Site & ('bodog' | 'bovada' | 'ignition');

interface BaseLine {
  type: string;
}

export interface LineAction extends BaseLine {
  type: 'action';
  action: Action;
}

interface LineMetaBase extends BaseLine {
  type: 'meta';
  gameType: string;
  site: IgnitionSite;
  handNumber: string;
  tableNumber: string;
  variant: Variant;
  timestamp: Date;
}

interface LineMetaCash extends LineMetaBase {
  gameType: 'cash';
  bettingStructure: BettingStructure;
  fastFold: boolean;
}

interface LineMetaTournament extends LineMetaBase {
  gameType: 'tournament';
  tournamentNumber: string;
  level: number;
  speed: TournamentSpeed | undefined;
}

export type LineMeta = LineMetaCash | LineMetaTournament;

export interface LinePlayer extends BaseLine {
  type: 'player';
  name: string;
  positionIndex: number;
  seatNumber: number;
  chipCount: string;
  isHero: boolean;
  isAnonymous: boolean;
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

export type Line = LineAction | LineMeta | LinePlayer | LineSmallBlind | LineBigBlind | LineAnte;

export class NotImplementedError extends Error {}
