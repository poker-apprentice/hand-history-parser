export type Site = 'bovada';

export type Game = 'holdem' | 'omaha';

export enum HandStrength {
  HighCard = 0,
  OnePair = 1,
  TwoPair = 2,
  ThreeOfAKind = 3,
  Straight = 4,
  Flush = 5,
  FullHouse = 6,
  FourOfAKind = 7,
  StraightFlush = 8,
  RoyalFlush = 9,
}

export type Limit = 'limit' | 'pot limit' | 'no limit';

export type Position = 'SB' | 'BB' | 'UTG' | 'UTG+1' | 'UTG+2' | 'MP' | 'LJ' | 'HJ' | 'CO' | 'BTN';

export type Street = 'preflop' | 'flop' | 'turn' | 'river';

export interface HandSummary {
  site: Site;
  handNumber: string;
  timestamp: Date;
  game: Game;
  limit: Limit;
  fastFold: boolean;
  position: Position;
  street: Street;
  tableSize: number;
  stackSize: string;
  blinds: string[];
  bigBlind: string;
  stakes: string;
  cards: string;
  hand: string;
  handStrength: HandStrength | undefined;
  won: string;
  numFolds: number;
  numChecks: number;
  numCalls: number;
  numBets: number;
  numRaises: number;
  lastStreetSeen: Street;
  vpip: boolean;
  wentToShowdown: boolean;
}

export interface GameInfo {
  site: Site;
  handNumber: string;
  timestamp: Date;
  game: Game;
  limit: Limit;
  blinds: string[];
  currency: string;
  isFastFold: boolean;
}

export interface Player {
  name: string;
  position: Position;
  chipStack: number;
}

export interface BaseAction {
  type: string;
}

export interface AnteAction extends BaseAction {
  type: 'ante';
  playerName: string;
  amount: string;
}

export interface DealAction extends BaseAction {
  type: 'deal';
  playerName: string;
  cardCount: number;
  cards?: string[];
}

export interface BoardAction extends BaseAction {
  type: 'board';
  cards: string[];
}

export interface PostBlindAction extends BaseAction {
  type: 'post-blind';
  playerName: string;
  amount: string;
}

export interface FoldAction extends BaseAction {
  type: 'fold';
  playerName: string;
}

export interface CallAction extends BaseAction {
  type: 'call';
  playerName: string;
  amount: string;
}

export interface BetAction extends BaseAction {
  type: 'bet';
  playerName: string;
  amount: string;
}

export interface RaiseAction extends BaseAction {
  type: 'raise';
  playerName: string;
  amount: string;
  isAllIn: boolean;
}

export interface ShowdownAction extends BaseAction {
  type: 'showdown';
  playername: string;
  cards: string[];
  hand: string[];
  handStrength: HandStrength;
}

export interface AwardPotAction extends BaseAction {
  type: 'award-pot';
  playerName: string;
  amount: string;
}

export interface MuckAction extends BaseAction {
  type: 'muck';
  playerName: string;
}

export type Action =
  | AnteAction
  | PostBlindAction
  | DealAction
  | BoardAction
  | FoldAction
  | CallAction
  | BetAction
  | RaiseAction
  | ShowdownAction
  | AwardPotAction
  | MuckAction;

export interface HandHistory {
  info: GameInfo;
  players: Player[];
  actions: Action[];
}
