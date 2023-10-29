import { Action, BettingStructure, HandStrength, Site, Variant } from '~/types';

interface BaseLine {
  type: string;
}

export interface LineAction extends BaseLine {
  type: 'action';
  action: Action;
}

export interface LineMeta extends BaseLine {
  type: 'meta';
  site: Site & 'acr';
  handNumber: string;
  fastFold: boolean;
  variant: Variant;
  bettingStructure: BettingStructure;
  timestamp: Date;
}

export interface LinePlayer extends BaseLine {
  type: 'player';
  playerName: string;
  seatNumber: number;
}

export type Line = LineAction | LineMeta | LinePlayer;

interface BaseShowdownAction {
  type: string;
}

export interface ShowdownActionFolded extends BaseShowdownAction {
  type: 'folded';
}

export interface ShowdownActionWonShow extends BaseShowdownAction {
  type: 'won-show';
  handStrength: HandStrength;
}

export interface ShowdownActionWonMuck extends BaseShowdownAction {
  type: 'won-muck';
}

export interface ShowdownActionLost extends BaseShowdownAction {
  type: 'lost';
  handStrength: HandStrength;
  mucked: boolean;
}

export type ShowdownAction =
  | ShowdownActionFolded
  | ShowdownActionLost
  | ShowdownActionWonShow
  | ShowdownActionWonMuck;
