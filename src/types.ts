import { Card, HandStrength } from '@poker-apprentice/types';

/**
 * The name of the poker site.
 */
export type Site = 'bodog' | 'bovada' | 'ignition';

/**
 * The name of the poker variant.
 */
export type Variant = 'holdem' | 'omaha' | 'omaha-8';

/**
 * The betting structure.
 */
export type BettingStructure = 'limit' | 'pot limit' | 'no limit' | 'spread limit' | 'cap limit';

/**
 * The relative position of a player.
 */
export type Position = 'SB' | 'BB' | 'UTG' | 'UTG+1' | 'MP' | 'LJ' | 'HJ' | 'CO' | 'BTN';

/**
 * The speed of a tournament.
 */
export type TournamentSpeed = 'normal' | 'turbo' | 'hyper-turbo' | 'deep-stack';

/**
 * The format of a tournament.
 */
export type TournamentFormat =
  | 'freezeout'
  | 're-entry'
  | 're-buy'
  | 'on-demand'
  | 'bounty'
  | 'mystery bounty'
  | 'progressive knockout';

/**
 * The betting round during a hand of poker.
 */
export type Street = 'preflop' | 'flop' | 'turn' | 'river';

/**
 * The supported table sizes.
 */
export type TableSize = 2 | 6 | 8 | 9;

/**
 * Information related to the poker game as a whole.
 */
export interface GameInfoBase {
  /**
   * The type of game, specifically cash game or tournament.
   */
  type: string;
  /**
   * The poker site where the hand was played.
   */
  site: Site;
  /**
   * The hand number as provided by the poker site.
   */
  handNumber: string;
  /**
   * The table number as provided by the poker site.
   */
  tableNumber: string;
  /**
   * The date/time that the hand took place.
   */
  timestamp: Date;
  /**
   * The variant of poker played during the hand.
   */
  variant: Variant;
  /**
   * The betting structure used during the hand.
   */
  bettingStructure: BettingStructure;
  /**
   * An array of blind amounts that were posted during the hand.  For games that include a small
   * and big blind, this array will contain two items with small blind at index 0 and the big blind
   * at index 1.  If more or fewer than two blinds were posted during a hand for any reason, the
   * array length will reflect that with the smallest blind being at index 0 and the biggest blind
   * being at index N-1.  Guaranteed to contain at least one value.
   */
  blinds: string[];
  /**
   * The ante amount that was posted by each player during the hand.
   */
  ante: string;
  /**
   * The currency code representing the poker chips in a cash game, or the buy-in, entry fee, and
   * awarded values in a tournament.
   */
  currency: string;
  /**
   * The total number seats available at the table, whether they are occupied or not.
   */
  tableSize: TableSize;
}

export interface CashGameInfo extends GameInfoBase {
  /**
   * The type of game, specifically cash game or tournament.
   */
  type: 'cash';
  /**
   * Whether the game is a "fast fold" game (i.e.: Zoom Poker, Zone Poker, etc.).
   */
  isFastFold: boolean;
}

export interface TournamentInfo extends GameInfoBase {
  /**
   * The type of game, specifically cash game or tournament.
   */
  type: 'tournament';
  /**
   * The tournament number as provided by the poker site.
   */
  tournamentNumber: string;
  /**
   * The tournament start date/time.
   */
  tournamentStart: Date;
  /**
   * The name of the tournament.
   */
  name: string;
  /**
   * The price of the tournament buy-in.
   */
  buyIn: string;
  /**
   * The price of the tournament entry fee.
   */
  entryFee: string;
  /**
   * The level of the tournament during which the hand took place.
   */
  level: number;
  /**
   * The speed of the tournament.
   */
  speed: TournamentSpeed;
  /**
   * The format of the tournament.
   */
  format: TournamentFormat;
  /**
   * The minimum guaranteed size of the prize pool, represented in the associated `currency`.
   */
  guaranteedPrizePool: string;
  /**
   * Whether or not the tournament is a satellite for another event.
   */
  isSatellite: boolean;
}

export type GameInfo = CashGameInfo | TournamentInfo;

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
   * A zero-based index representing the relative position of the player at the poker table.
   *  - 0 = Button
   *  - 1 = Small Blind
   *  - 2 = Big Blind
   *  - 3 = UTG
   *  - 4 = UTG+1
   *  - 5 = UTG+2
   *  - etc.
   */
  positionIndex: number;
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

/**
 * An action representing a player being awarded a bounty.
 */
export interface AwardBountyAction extends BaseAction {
  type: 'award-bounty';
  playerName: string;
  amount: string;
}

/**
 * An action representing a player placing in a tournament.
 */
export interface TournamentPlacementAction extends BaseAction {
  type: 'tournament-placement';
  playerName: string;
  placement: number;
}

/**
 * An action representing a player receiving a monetary award in a tournament.
 */
export interface TournamentPlacementAward extends BaseAction {
  type: 'tournament-award';
  playerName: string;
  amount: string;
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
  | AwardPotAction
  | AwardBountyAction
  | TournamentPlacementAction
  | TournamentPlacementAward;

/**
 * The parsed hand history details.
 */
export interface HandHistory {
  info: GameInfo;
  players: Player[];
  actions: Action[];
}

export interface ParseHandOptions {
  hand: string;
  filename?: string;
}
