import { Card } from '@poker-apprentice/types';

/**
 * The name of the poker site.
 */
export type Site = 'bovada';

/**
 * The name of the poker variant.
 */
export type Game = 'holdem' | 'omaha';

/**
 * The strength of the hand.
 */
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

/**
 * The betting structure.
 */
export type Limit = 'limit' | 'pot limit' | 'no limit';

/**
 * The relative position of a player.
 */
export type Position = 'SB' | 'BB' | 'UTG' | 'UTG+1' | 'UTG+2' | 'MP' | 'LJ' | 'HJ' | 'CO' | 'BTN';

/**
 * The betting round during a hand of poker.
 */
export type Street = 'preflop' | 'flop' | 'turn' | 'river';

/**
 * Information related to the poker game as a whole.
 */
export interface GameInfo {
  /**
   * The poker site where the hand was played.
   */
  site: Site;
  /**
   * The hand number as provided by the poker site.
   */
  handNumber: string;
  /**
   * The date/time that the hand took place.
   */
  timestamp: Date;
  /**
   * The variant of poker played during the hand.
   */
  game: Game;
  /**
   * The betting structure used during the hand.
   */
  limit: Limit;
  /**
   * An array of blind that were posted during the hand.  For games that include a small and big
   * blind, this array will contain two items with small blind at index 0 and the big blind at
   * index 1.  If more or fewer than two blinds were posted during a hand for any reason, the array
   * length will reflect that with the smallest blind being at index 0 and the biggest blind being
   * at index N-1.
   */
  blinds: string[];
  /**
   * The type of currency representing the poker chips.
   */
  currency: string;
  /**
   * Whether the game is a "fast fold" game (i.e.: Zoom Poker, Zone Poker, etc.).
   */
  isFastFold: boolean;
  /**
   * The total number seats available at the table, whether they are occupied or not.
   */
  tableSize: 2 | 6 | 8 | 9;
}

export interface Player {
  /**
   * The display name of the player.  On anonymous sites, the naming will generally be a
   * placeholder.
   */
  name: string;
  /**
   * The seat number of the player at the poker table.
   */
  seatNumber: number;
  /**
   * The relative position of the player at the poker table.
   */
  position: Position;
  /**
   * The number of chips the player had at the start of a poker hand.
   */
  chipStack: string;
  /**
   * Whether or not the player is the hero.
   */
  isHero: boolean;
  /**
   * Whether or not the player should be considered anonymous.
   */
  isAnonymous: boolean;
}

export interface PlayerHand {
  /**
   * The array of cards the player's hand contains (e.g.: `["Kc", "Ad"]` representing big slick in
   * a game of Texas Hold'em).
   */
  cards: Card[];
  /**
   * The array of cards representing the best possible made hand (e.g.:
   * `["Ac", "Ad", "As", "Kc", "Kh"]` representing a full house, aces full of kings).
   */
  madeHand: string[];
  /**
   * The hand strength value representing the made hand.
   */
  madeHandStrength: HandStrength;
}

/**
 * The base type used for actions that took place during a hand of poker.
 */
export interface BaseAction {
  type: string;
}

/**
 * An action representing posting of any chips, whether it be a blind, dead blind, or ante.
 */
export interface PostAction extends BaseAction {
  type: 'post';
  postType: 'blind' | 'ante' | 'dead';
  playerName: string;
  amount: string;
}

/**
 * An action representing cards being dealt to a player.
 */
export interface DealHandAction extends BaseAction {
  type: 'deal-hand';
  playerName: string;
  cards: Card[];
}

/**
 * An action representing cards being dealt to the board/community.
 */
export interface DealBoardAction extends BaseAction {
  type: 'deal-board';
  street: Street;
  cards: Card[];
}

/**
 * An action representing a player making a bet.
 */
export interface BetAction extends BaseAction {
  type: 'bet';
  playerName: string;
  amount: string;
  isAllIn: boolean;
}

/**
 * An action representing a player making a call.
 */
export interface CallAction extends BaseAction {
  type: 'call';
  playerName: string;
  amount: string;
  isAllIn: boolean;
}

/**
 * An action representing a player making a check.
 */
export interface CheckAction extends BaseAction {
  type: 'check';
  playerName: string;
}

/**
 * An action representing a player making a fold.
 */
export interface FoldAction extends BaseAction {
  type: 'fold';
  playerName: string;
}

/**
 * An action representing a player making a raise.
 */
export interface RaiseAction extends BaseAction {
  type: 'raise';
  playerName: string;
  amount: string;
  totalBet: string;
  isAllIn: boolean;
}

/**
 * An action representing chips being returned to a player because they were not called, or the
 * player who called had fewer chips when calling (i.e.: the other player is all-in for less).
 */
export interface ReturnBetAction extends BaseAction {
  type: 'return-bet';
  playerName: string;
  amount: string;
}

/**
 * An action representing a player going to showdown.
 */
export interface ShowdownAction extends BaseAction {
  type: 'showdown';
  playerName: string;
  handStrength: HandStrength;
  mucked: boolean;
}

/**
 * An action representing a player being awarded a portion of the pot.
 */
export interface AwardPotAction extends BaseAction {
  type: 'award-pot';
  playerName: string;
  amount: string;
  isSidePot: boolean;
}

export type Action =
  | PostAction
  | DealHandAction
  | DealBoardAction
  | BetAction
  | CallAction
  | CheckAction
  | FoldAction
  | RaiseAction
  | ReturnBetAction
  | ShowdownAction
  | AwardPotAction;

/**
 * The parsed hand history details.
 */
export interface HandHistory {
  info: GameInfo;
  players: Player[];
  actions: Action[];
}
