import BigNumber from 'bignumber.js';
import { getParser } from '../../utils/getParser';
import { BovadaLexer } from '../../grammar/BovadaLexer';
import { BovadaParser } from '../../grammar/BovadaParser';
import { HandSummary } from '../../types';
import { getHand } from '../../utils/getHand';
import { BovadaHandHistoryVisitor, Result } from './BovadaHandHistoryVisitor';

const formatCurrency = (n: BigNumber) => {
  if (n.isInteger()) {
    return n.toString();
  }
  return n.toFixed(2);
};

const getVPIP = ({ blinds, position, won }: Result) => {
  if (position === 'BB') {
    const bigBlind = blinds[blinds.length - 1];
    return !won.isEqualTo(bigBlind);
  }
  if (position === 'SB') {
    const smallBlind = blinds[0];
    return !won.isEqualTo(smallBlind);
  }
  return !won.isEqualTo(0);
};

const formatResult = (result: Result): HandSummary => {
  if (result.handNumber === undefined) {
    throw new Error('Unable to parse hand number');
  }
  if (!result.timestamp) {
    throw new Error('Unable to parse timestamp');
  }
  if (!result.game) {
    throw new Error('Unable to parse game');
  }
  if (!result.lastStreetSeen) {
    throw new Error('Unable to parse last street seen');
  }
  if (!result.limit) {
    throw new Error('Unable to parse limit');
  }
  if (!result.position) {
    throw new Error('Unable to parse position');
  }
  if (!result.street) {
    throw new Error('Unable to parse street');
  }
  if (!result.stackSize) {
    throw new Error('Unable to parse stack size');
  }
  return {
    site: result.site,
    handNumber: result.handNumber,
    timestamp: result.timestamp,
    fastFold: result.fastFold,
    game: result.game,
    limit: result.limit,
    position: result.position,
    street: result.street,
    tableSize: result.occupiedSeats.length,
    stackSize: formatCurrency(result.stackSize),
    blinds: result.blinds.map(formatCurrency),
    bigBlind: result.blinds[result.blinds.length - 1].toString(),
    stakes: result.blinds.join('/'),
    cards: result.cards.join(''),
    hand: getHand(result.cards),
    handStrength: result.handStrength,
    lastStreetSeen: result.lastStreetSeen,
    numFolds: result.numFolds,
    numChecks: result.numChecks,
    numCalls: result.numCalls,
    numBets: result.numBets,
    numRaises: result.numRaises,
    vpip: getVPIP(result),
    wentToShowdown: result.wentToShowdown,
    won: formatCurrency(result.won),
  };
};

export const parseHand = (hand: string) => {
  const parser = getParser(hand, { lexer: BovadaLexer, parser: BovadaParser });
  const tree = parser.handHistory();
  const visitor = new BovadaHandHistoryVisitor();
  const result = visitor.visit(tree);

  return result.position === undefined ? undefined : formatResult(result);
};
