import { Action, BettingStructure, Position, Site, Variant } from '~/types';

interface BaseLine {
  type: string;
}

export interface LineAction extends BaseLine {
  type: 'action';
  action: Action;
}

export interface LineMeta extends BaseLine {
  type: 'meta';
  site: Site & ('bodog' | 'bovada' | 'ignition');
  handNumber: string;
  fastFold: boolean;
  variant: Variant;
  bettingStructure: BettingStructure;
  timestamp: Date;
}

export interface LinePlayer extends BaseLine {
  type: 'player';
  name: string;
  position: Position;
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

export type Line = LineAction | LineMeta | LinePlayer | LineSmallBlind | LineBigBlind;
