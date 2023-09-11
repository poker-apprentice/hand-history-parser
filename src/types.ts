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
  seatNumber: number;
  position: Position;
  chipStack: string;
  isHero: boolean;
  isAnonymous: boolean;
}

export interface PlayerHand {
  cards: string[];
  madeHand: string[];
  madeHandStrength: HandStrength;
}

export interface BaseAction {
  type: string;
}

export interface PostAction extends BaseAction {
  type: 'post';
  postType: 'blind' | 'ante' | 'dead';
  playerName: string;
  amount: string;
}

export interface DealHandAction extends BaseAction {
  type: 'deal-hand';
  playerName: string;
  cards: string[];
}

export interface DealBoardAction extends BaseAction {
  type: 'deal-board';
  street: Street;
  cards: string[];
}

export interface BoardAction extends BaseAction {
  type: 'board';
  cards: string[];
}

export interface BetAction extends BaseAction {
  type: 'bet';
  playerName: string;
  amount: string;
  isAllIn: boolean;
}

export interface CallAction extends BaseAction {
  type: 'call';
  playerName: string;
  amount: string;
  isAllIn: boolean;
}

export interface CheckAction extends BaseAction {
  type: 'check';
  playerName: string;
}

export interface FoldAction extends BaseAction {
  type: 'fold';
  playerName: string;
}

export interface RaiseAction extends BaseAction {
  type: 'raise';
  playerName: string;
  amount: string;
  totalBet: string;
  isAllIn: boolean;
}

export interface ReturnBetAction extends BaseAction {
  type: 'return-bet';
  playerName: string;
  amount: string;
}

export interface ShowdownAction extends BaseAction {
  type: 'showdown';
  playerName: string;
  handStrength: HandStrength;
}

export interface AwardPotAction extends BaseAction {
  type: 'award-pot';
  playerName: string;
  amount: string;
  isSidePot: boolean;
}

export interface MuckAction extends BaseAction {
  type: 'muck';
  playerName: string;
}

export type Action =
  | PostAction
  | DealHandAction
  | DealBoardAction
  | BoardAction
  | BetAction
  | CallAction
  | CheckAction
  | FoldAction
  | RaiseAction
  | ReturnBetAction
  | ShowdownAction
  | AwardPotAction
  | MuckAction;

export interface HandHistory {
  info: GameInfo;
  players: Player[];
  actions: Action[];
}
