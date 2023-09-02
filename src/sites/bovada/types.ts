import { Action, Game, Limit, Position } from '../../types';

interface BaseLine {
  type: string;
}

export interface LineAction extends BaseLine {
  type: 'action';
  action: Action;
}

export interface LineMeta extends BaseLine {
  type: 'meta';
  handNumber: string;
  fastFold: boolean;
  game: Game;
  limit: Limit;
  timestamp: Date;
}

export interface LinePlayer extends BaseLine {
  type: 'player';
  name: string;
  position: Position;
  seatNumber: number;
  chipCount: string;
  isHero: boolean;
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

export class NotImplementedError extends Error {}
