import {
  HAND_ALL_IN,
  HAND_ALL_IN_RAISE,
  HAND_CHECK_TIMEOUT,
  HAND_FAST_FOLD_MISSING_SUMMARY,
  HAND_FOLD_DISCONNECT,
  HAND_FULL_BOARD_LOST,
  HAND_FULL_BOARD_WON,
  HAND_NO_FLOP,
  HAND_OMAHA,
  HAND_SITTING_OUT,
  HAND_STRAIGHT_FLUSH,
  HAND_THOUSANDS_OF_DOLLARS,
} from '../../__mocks__/hands/bovada';
import { parseHand } from './parseHand';

describe('parseHand', () => {
  it('parses when there is a full board and hero loses', () => {
    expect(parseHand(HAND_FULL_BOARD_LOST)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "ThQh",
        "fastFold": false,
        "game": "holdem",
        "hand": "QTs",
        "handNumber": "4290322948",
        "handStrength": 2,
        "lastStreetSeen": "river",
        "limit": "no limit",
        "numBets": 2,
        "numCalls": 1,
        "numChecks": 2,
        "numFolds": 0,
        "numRaises": 0,
        "position": "BB",
        "site": "bovada",
        "stackSize": "25",
        "stakes": "0.1/0.25",
        "street": "river",
        "tableSize": 6,
        "timestamp": 2022-05-26T14:16:24.000Z,
        "vpip": true,
        "wentToShowdown": true,
        "won": "-4.50",
      }
    `);
  });

  it('parses when there is a full board and hero wins', () => {
    expect(parseHand(HAND_FULL_BOARD_WON)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "AdJd",
        "fastFold": false,
        "game": "holdem",
        "hand": "AJs",
        "handNumber": "4290323128",
        "handStrength": 1,
        "lastStreetSeen": "flop",
        "limit": "no limit",
        "numBets": 1,
        "numCalls": 0,
        "numChecks": 0,
        "numFolds": 0,
        "numRaises": 1,
        "position": "SB",
        "site": "bovada",
        "stackSize": "20.50",
        "stakes": "0.1/0.25",
        "street": "flop",
        "tableSize": 6,
        "timestamp": 2022-05-26T14:17:19.000Z,
        "vpip": true,
        "wentToShowdown": false,
        "won": "1.14",
      }
    `);
  });

  it('parses when there is no flop', () => {
    expect(parseHand(HAND_NO_FLOP)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "9d8c",
        "fastFold": false,
        "game": "holdem",
        "hand": "98o",
        "handNumber": "4290323643",
        "handStrength": undefined,
        "lastStreetSeen": "preflop",
        "limit": "no limit",
        "numBets": 0,
        "numCalls": 0,
        "numChecks": 0,
        "numFolds": 1,
        "numRaises": 0,
        "position": "UTG",
        "site": "bovada",
        "stackSize": "21.64",
        "stakes": "0.1/0.25",
        "street": "preflop",
        "tableSize": 6,
        "timestamp": 2022-05-26T14:19:56.000Z,
        "vpip": false,
        "wentToShowdown": false,
        "won": "0",
      }
    `);
  });

  it('parses when there is a disconnect/timeout/auth issue causing a fold', () => {
    expect(parseHand(HAND_FOLD_DISCONNECT)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "9hJs",
        "fastFold": false,
        "game": "holdem",
        "hand": "J9o",
        "handNumber": "4290328383",
        "handStrength": 0,
        "lastStreetSeen": "preflop",
        "limit": "no limit",
        "numBets": 0,
        "numCalls": 0,
        "numChecks": 0,
        "numFolds": 0,
        "numRaises": 0,
        "position": "BB",
        "site": "bovada",
        "stackSize": "25.83",
        "stakes": "0.1/0.25",
        "street": "preflop",
        "tableSize": 6,
        "timestamp": 2022-05-26T14:44:06.000Z,
        "vpip": true,
        "wentToShowdown": false,
        "won": "0.10",
      }
    `);
  });

  it('parses when there is a disconnect/timeout/auth issue causing a check', () => {
    expect(parseHand(HAND_CHECK_TIMEOUT)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "4cQc",
        "fastFold": false,
        "game": "holdem",
        "hand": "Q4s",
        "handNumber": "4290392098",
        "handStrength": 5,
        "lastStreetSeen": "river",
        "limit": "no limit",
        "numBets": 2,
        "numCalls": 1,
        "numChecks": 1,
        "numFolds": 0,
        "numRaises": 1,
        "position": "SB",
        "site": "bovada",
        "stackSize": "47.51",
        "stakes": "0.1/0.25",
        "street": "river",
        "tableSize": 6,
        "timestamp": 2022-05-26T19:39:38.000Z,
        "vpip": true,
        "wentToShowdown": true,
        "won": "19.94",
      }
    `);
  });

  it('parses when hero calls all-in', () => {
    expect(parseHand(HAND_ALL_IN)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "Kc8c",
        "fastFold": false,
        "game": "holdem",
        "hand": "K8s",
        "handNumber": "4290335080",
        "handStrength": 5,
        "lastStreetSeen": "river",
        "limit": "no limit",
        "numBets": 1,
        "numCalls": 1,
        "numChecks": 1,
        "numFolds": 0,
        "numRaises": 1,
        "position": "SB",
        "site": "bovada",
        "stackSize": "16.56",
        "stakes": "0.1/0.25",
        "street": "river",
        "tableSize": 4,
        "timestamp": 2022-05-26T15:17:34.000Z,
        "vpip": true,
        "wentToShowdown": false,
        "won": "4.51",
      }
    `);
  });

  it('parses when hero raises all-in', () => {
    expect(parseHand(HAND_ALL_IN_RAISE)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "QhJh",
        "fastFold": false,
        "game": "holdem",
        "hand": "QJs",
        "handNumber": "4290373378",
        "handStrength": 2,
        "lastStreetSeen": "river",
        "limit": "no limit",
        "numBets": 0,
        "numCalls": 1,
        "numChecks": 1,
        "numFolds": 0,
        "numRaises": 1,
        "position": "BB",
        "site": "bovada",
        "stackSize": "34.65",
        "stakes": "0.1/0.25",
        "street": "river",
        "tableSize": 5,
        "timestamp": 2022-05-26T18:12:06.000Z,
        "vpip": true,
        "wentToShowdown": true,
        "won": "-24.65",
      }
    `);
  });

  it('parses when hero is sitting out', () => {
    expect(parseHand(HAND_SITTING_OUT)).toMatchInlineSnapshot(`undefined`);
  });

  it('parses omaha hands', () => {
    expect(parseHand(HAND_OMAHA)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "JcQcTc7c",
        "fastFold": false,
        "game": "omaha",
        "hand": "QJT7s",
        "handNumber": "4293638974",
        "handStrength": undefined,
        "lastStreetSeen": "preflop",
        "limit": "pot limit",
        "numBets": 0,
        "numCalls": 0,
        "numChecks": 0,
        "numFolds": 1,
        "numRaises": 0,
        "position": "UTG",
        "site": "bovada",
        "stackSize": "25",
        "stakes": "0.1/0.25",
        "street": "river",
        "tableSize": 4,
        "timestamp": 2022-06-02T23:58:50.000Z,
        "vpip": false,
        "wentToShowdown": false,
        "won": "0",
      }
    `);
  });

  it('parses straight flushes', () => {
    expect(parseHand(HAND_STRAIGHT_FLUSH)).toMatchInlineSnapshot(`
      {
        "bigBlind": "1",
        "blinds": [
          "0.50",
          "1",
        ],
        "cards": "6dKd9cQh",
        "fastFold": false,
        "game": "omaha",
        "hand": "KQ96s",
        "handNumber": "4296950465",
        "handStrength": undefined,
        "lastStreetSeen": "preflop",
        "limit": "pot limit",
        "numBets": 0,
        "numCalls": 0,
        "numChecks": 0,
        "numFolds": 1,
        "numRaises": 0,
        "position": "BB",
        "site": "bovada",
        "stackSize": "92",
        "stakes": "0.5/1",
        "street": "river",
        "tableSize": 6,
        "timestamp": 2022-06-10T17:42:20.000Z,
        "vpip": true,
        "wentToShowdown": true,
        "won": "-1",
      }
    `);
  });

  it('parses fast-fold games with missing summary', () => {
    expect(parseHand(HAND_FAST_FOLD_MISSING_SUMMARY)).toMatchInlineSnapshot(`
      {
        "bigBlind": "0.25",
        "blinds": [
          "0.10",
          "0.25",
        ],
        "cards": "6h6c",
        "fastFold": true,
        "game": "holdem",
        "hand": "66",
        "handNumber": "4384116451",
        "handStrength": 1,
        "lastStreetSeen": "flop",
        "limit": "no limit",
        "numBets": 1,
        "numCalls": 0,
        "numChecks": 0,
        "numFolds": 0,
        "numRaises": 2,
        "position": "UTG",
        "site": "bovada",
        "stackSize": "25.10",
        "stakes": "0.1/0.25",
        "street": "flop",
        "tableSize": 6,
        "timestamp": 2022-12-06T01:22:58.000Z,
        "vpip": true,
        "wentToShowdown": false,
        "won": "2.90",
      }
    `);
  });

  it('parses stack sizes and bet sizes containing commas', () => {
    expect(parseHand(HAND_THOUSANDS_OF_DOLLARS)).toMatchInlineSnapshot(`
      {
        "bigBlind": "2",
        "blinds": [
          "1",
          "2",
        ],
        "cards": "7hQc",
        "fastFold": true,
        "game": "holdem",
        "hand": "Q7o",
        "handNumber": "4515975493",
        "handStrength": 1,
        "lastStreetSeen": "river",
        "limit": "no limit",
        "numBets": 1,
        "numCalls": 1,
        "numChecks": 1,
        "numFolds": 0,
        "numRaises": 1,
        "position": "SB",
        "site": "bovada",
        "stackSize": "1066.03",
        "stakes": "1/2",
        "street": "river",
        "tableSize": 6,
        "timestamp": 2023-08-23T06:00:26.000Z,
        "vpip": true,
        "wentToShowdown": true,
        "won": "-110.15",
      }
    `);
  });
});
