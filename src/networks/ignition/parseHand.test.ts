import { HAND as HAND_BODOG } from '~/__fixtures__/hands/bodog';
import {
  HAND_ALL_IN,
  HAND_ALL_IN_RAISE,
  HAND_CHECK_TIMEOUT,
  HAND_FAST_FOLD_MISSING_SUMMARY,
  HAND_FOLD_DISCONNECT,
  HAND_FULL_BOARD_LOST,
  HAND_FULL_BOARD_WON,
  HAND_NO_FLOP,
  HAND_NO_SMALL_BLIND,
  HAND_OMAHA,
  HAND_OMAHA_HILO_HIGH_AND_LOW,
  HAND_OMAHA_HILO_HIGH_ONLY,
  HAND_OMAHA_HILO_NO_SHOWDOWN,
  HAND_SITTING_OUT,
  HAND_STRAIGHT_FLUSH,
  HAND_THOUSANDS_OF_DOLLARS,
  HAND_TOURNAMENT,
  HAND_TOURNAMENT_BOUNTY_AWARDED,
  HAND_TOURNAMENT_PLACEMENT,
} from '~/__fixtures__/hands/bovada';
import { HAND as HAND_IGNITION } from '~/__fixtures__/hands/ignition';
import { parseHand } from './parseHand';

describe('parseHand', () => {
  describe('cash games', () => {
    it('parses when there is a full board and hero loses', () => {
      expect(parseHand({ hand: HAND_FULL_BOARD_LOST })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "Th",
                "Qh",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "9s",
                "Ks",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6h",
                "Ad",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Jd",
                "2s",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Tc",
                "8d",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "3d",
                "8c",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "amount": "0.25",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "amount": "0.25",
              "isAllIn": false,
              "playerName": "UTG+1",
              "type": "call",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "cards": [
                "Qs",
                "Ts",
                "4s",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "amount": "0.5",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "bet",
            },
            {
              "amount": "0.5",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "cards": [
                "Jc",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "amount": "1",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "bet",
            },
            {
              "amount": "1",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "cards": [
                "5d",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "amount": "2.75",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "bet",
            },
            {
              "amount": "2.75",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "handStrength": 5,
              "mucked": false,
              "playerName": "UTG",
              "type": "showdown",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "8.89",
              "isSidePot": false,
              "playerName": "UTG",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4290322948",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26728545",
            "tableSize": 6,
            "timestamp": 2022-05-26T09:16:24.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "25",
              "isAnonymous": false,
              "isHero": true,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 1,
            },
            {
              "chipStack": "24.4",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 2,
            },
            {
              "chipStack": "7.5",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 3,
            },
            {
              "chipStack": "33.77",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 4,
            },
            {
              "chipStack": "26.87",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 5,
            },
            {
              "chipStack": "23.3",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses when there is a full board and hero wins', () => {
      expect(parseHand({ hand: HAND_FULL_BOARD_WON })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "Ad",
                "Jd",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Td",
                "2s",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6d",
                "3d",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "7c",
                "Th",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Qd",
                "7s",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "5d",
                "7h",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "amount": "0.25",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "amount": "0.9",
              "isAllIn": false,
              "playerName": "Small Blind",
              "totalBet": "1",
              "type": "raise",
            },
            {
              "playerName": "Big Blind",
              "type": "fold",
            },
            {
              "amount": "0.75",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "cards": [
                "4h",
                "Ks",
                "4s",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "amount": "1.15",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "bet",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "amount": "1.15",
              "playerName": "Small Blind",
              "type": "return-bet",
            },
            {
              "handStrength": 1,
              "mucked": true,
              "playerName": "Small Blind",
              "type": "showdown",
            },
            {
              "amount": "2.14",
              "isSidePot": false,
              "playerName": "Small Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4290323128",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26728545",
            "tableSize": 6,
            "timestamp": 2022-05-26T09:17:19.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "20.5",
              "isAnonymous": false,
              "isHero": true,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 1,
            },
            {
              "chipStack": "28.79",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 2,
            },
            {
              "chipStack": "7.25",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 3,
            },
            {
              "chipStack": "33.77",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 4,
            },
            {
              "chipStack": "26.87",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 5,
            },
            {
              "chipStack": "24.9",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses when there is no flop', () => {
      expect(parseHand({ hand: HAND_NO_FLOP })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "9d",
                "8c",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6d",
                "Js",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Jd",
                "Th",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "8s",
                "Ks",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "8h",
                "Ad",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Qc",
                "Qs",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "amount": "0.25",
              "isAllIn": false,
              "playerName": "UTG+2",
              "type": "call",
            },
            {
              "amount": "1",
              "isAllIn": false,
              "playerName": "Dealer",
              "totalBet": "1",
              "type": "raise",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "amount": "3.25",
              "isAllIn": false,
              "playerName": "Big Blind",
              "totalBet": "3.5",
              "type": "raise",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "amount": "2.5",
              "playerName": "Big Blind",
              "type": "return-bet",
            },
            {
              "handStrength": 0,
              "mucked": true,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "2.35",
              "isSidePot": false,
              "playerName": "Big Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4290323643",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26728545",
            "tableSize": 6,
            "timestamp": 2022-05-26T09:19:56.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "21.64",
              "isAnonymous": false,
              "isHero": true,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 1,
            },
            {
              "chipStack": "28.44",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 2,
            },
            {
              "chipStack": "11.45",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 3,
            },
            {
              "chipStack": "25.98",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 4,
            },
            {
              "chipStack": "28.77",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 5,
            },
            {
              "chipStack": "25",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses when there is a disconnect/timeout/auth issue causing a fold', () => {
      expect(parseHand({ hand: HAND_FOLD_DISCONNECT })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "9h",
                "Js",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "2d",
                "Ts",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Jh",
                "8s",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "2s",
                "3s",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Tc",
                "7d",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "7h",
                "Qs",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "handStrength": 0,
              "mucked": true,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "0.35",
              "isSidePot": false,
              "playerName": "Big Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4290328383",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26728545",
            "tableSize": 6,
            "timestamp": 2022-05-26T09:44:06.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "25.83",
              "isAnonymous": false,
              "isHero": true,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 1,
            },
            {
              "chipStack": "9.68",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 2,
            },
            {
              "chipStack": "26.92",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 3,
            },
            {
              "chipStack": "25",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 4,
            },
            {
              "chipStack": "30.55",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 5,
            },
            {
              "chipStack": "25",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses when there is a disconnect/timeout/auth issue causing a check', () => {
      expect(parseHand({ hand: HAND_CHECK_TIMEOUT })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "4s",
                "Ks",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Td",
                "Ah",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Js",
                "9c",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6d",
                "Kc",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "4c",
                "Qc",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "9s",
                "Ts",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "amount": "0.25",
              "isAllIn": false,
              "playerName": "UTG+1",
              "type": "call",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "amount": "0.25",
              "isAllIn": false,
              "playerName": "Dealer",
              "type": "call",
            },
            {
              "amount": "0.15",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "call",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "cards": [
                "Ad",
                "8c",
                "2c",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "amount": "0.5",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "bet",
            },
            {
              "amount": "0.5",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "amount": "0.5",
              "isAllIn": false,
              "playerName": "UTG+1",
              "type": "call",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "cards": [
                "6c",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "playerName": "Small Blind",
              "type": "check",
            },
            {
              "amount": "1.19",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "bet",
            },
            {
              "amount": "1.19",
              "isAllIn": false,
              "playerName": "UTG+1",
              "type": "call",
            },
            {
              "amount": "3.19",
              "isAllIn": false,
              "playerName": "Small Blind",
              "totalBet": "3.19",
              "type": "raise",
            },
            {
              "amount": "2",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "amount": "2",
              "isAllIn": false,
              "playerName": "UTG+1",
              "type": "call",
            },
            {
              "cards": [
                "7h",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "amount": "6.71",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "bet",
            },
            {
              "amount": "6.71",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "amount": "6.71",
              "isAllIn": true,
              "playerName": "UTG+1",
              "type": "bet",
            },
            {
              "handStrength": 5,
              "mucked": false,
              "playerName": "Small Blind",
              "type": "showdown",
            },
            {
              "handStrength": 4,
              "mucked": false,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "handStrength": 1,
              "mucked": false,
              "playerName": "UTG+1",
              "type": "showdown",
            },
            {
              "amount": "30.59",
              "isSidePot": false,
              "playerName": "Small Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4290392098",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26730037",
            "tableSize": 6,
            "timestamp": 2022-05-26T14:39:38.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "26.54",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 1,
            },
            {
              "chipStack": "10.65",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 2,
            },
            {
              "chipStack": "14.57",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 3,
            },
            {
              "chipStack": "24.89",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 4,
            },
            {
              "chipStack": "47.51",
              "isAnonymous": false,
              "isHero": true,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 5,
            },
            {
              "chipStack": "27.1",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses when hero calls all-in', () => {
      expect(parseHand({ hand: HAND_ALL_IN })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "Kc",
                "8c",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Th",
                "4d",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6s",
                "Qd",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6h",
                "4h",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "amount": "0.62",
              "isAllIn": false,
              "playerName": "Dealer",
              "totalBet": "0.62",
              "type": "raise",
            },
            {
              "amount": "0.52",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "call",
            },
            {
              "playerName": "Big Blind",
              "type": "fold",
            },
            {
              "cards": [
                "5s",
                "Kd",
                "7c",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "playerName": "Small Blind",
              "type": "check",
            },
            {
              "amount": "0.47",
              "isAllIn": false,
              "playerName": "Dealer",
              "type": "bet",
            },
            {
              "amount": "1.47",
              "isAllIn": false,
              "playerName": "Small Blind",
              "totalBet": "1.47",
              "type": "raise",
            },
            {
              "amount": "1",
              "isAllIn": false,
              "playerName": "Dealer",
              "type": "call",
            },
            {
              "cards": [
                "6c",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "amount": "2.65",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "bet",
            },
            {
              "amount": "2.65",
              "isAllIn": false,
              "playerName": "Dealer",
              "type": "call",
            },
            {
              "cards": [
                "4c",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "amount": "11.82",
              "isAllIn": true,
              "playerName": "Small Blind",
              "type": "bet",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "amount": "11.82",
              "playerName": "Small Blind",
              "type": "return-bet",
            },
            {
              "handStrength": 5,
              "mucked": true,
              "playerName": "Small Blind",
              "type": "showdown",
            },
            {
              "amount": "9.25",
              "isSidePot": false,
              "playerName": "Small Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4290335080",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26728545",
            "tableSize": 6,
            "timestamp": 2022-05-26T10:17:34.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "16.56",
              "isAnonymous": false,
              "isHero": true,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 1,
            },
            {
              "chipStack": "33.64",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 2,
            },
            {
              "chipStack": "32.01",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 3,
            },
            {
              "chipStack": "25.01",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses when hero raises all-in', () => {
      expect(parseHand({ hand: HAND_ALL_IN_RAISE })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "Kh",
                "Kd",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Th",
                "2d",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "5h",
                "3s",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "5c",
                "3c",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Qh",
                "Jh",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "amount": "0.65",
              "isAllIn": false,
              "playerName": "UTG",
              "totalBet": "0.65",
              "type": "raise",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "amount": "0.4",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "cards": [
                "8h",
                "7h",
                "7s",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "amount": "0.75",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "bet",
            },
            {
              "amount": "2.25",
              "isAllIn": false,
              "playerName": "Big Blind",
              "totalBet": "2.25",
              "type": "raise",
            },
            {
              "amount": "3.25",
              "isAllIn": false,
              "playerName": "UTG",
              "totalBet": "4",
              "type": "raise",
            },
            {
              "amount": "31.75",
              "isAllIn": true,
              "playerName": "Big Blind",
              "totalBet": "34",
              "type": "raise",
            },
            {
              "amount": "20",
              "isAllIn": true,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "amount": "10",
              "playerName": "Big Blind",
              "type": "return-bet",
            },
            {
              "cards": [
                "8c",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "cards": [
                "Jc",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "UTG",
              "type": "showdown",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "47.4",
              "isSidePot": false,
              "playerName": "UTG",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4290373378",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26728976",
            "tableSize": 6,
            "timestamp": 2022-05-26T13:12:06.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "24.65",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 1,
            },
            {
              "chipStack": "25",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 2,
            },
            {
              "chipStack": "7.15",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 3,
            },
            {
              "chipStack": "24.75",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 5,
            },
            {
              "chipStack": "34.65",
              "isAnonymous": false,
              "isHero": true,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses when hero is sitting out', () => {
      expect(parseHand({ hand: HAND_SITTING_OUT })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "UTG",
              "postType": "ante",
              "type": "post",
            },
            {
              "cards": [
                "Kh",
                "8c",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "7h",
                "As",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Jc",
                "7s",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "9s",
                "5d",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "check",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "cards": [
                "Qc",
                "Ts",
                "Qd",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "playerName": "UTG",
              "type": "check",
            },
            {
              "cards": [
                "2h",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "playerName": "UTG",
              "type": "check",
            },
            {
              "cards": [
                "Ks",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "amount": "0.57",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "bet",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "amount": "0.57",
              "playerName": "Big Blind",
              "type": "return-bet",
            },
            {
              "handStrength": 2,
              "mucked": true,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "0.57",
              "isSidePot": false,
              "playerName": "Big Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4292190612",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26758464",
            "tableSize": 6,
            "timestamp": 2022-05-30T13:23:41.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "21.89",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 1,
            },
            {
              "chipStack": "25",
              "isAnonymous": false,
              "isHero": true,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 2,
            },
            {
              "chipStack": "26.95",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 3,
            },
            {
              "chipStack": "47.01",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 4,
            },
            {
              "chipStack": "29.93",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 5,
            },
            {
              "chipStack": "52.8",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses omaha hands', () => {
      expect(parseHand({ hand: HAND_OMAHA })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "Kd",
                "3d",
                "Kc",
                "As",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "2c",
                "7d",
                "Qd",
                "6c",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Js",
                "Qs",
                "4s",
                "5c",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Jc",
                "Qc",
                "Tc",
                "7c",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "amount": "0.25",
              "isAllIn": false,
              "playerName": "Dealer",
              "type": "call",
            },
            {
              "amount": "0.15",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "call",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "cards": [
                "Th",
                "4h",
                "Jh",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "amount": "0.36",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "bet",
            },
            {
              "amount": "0.36",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "cards": [
                "8s",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "playerName": "Small Blind",
              "type": "check",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "cards": [
                "4c",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "amount": "1.4",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "bet",
            },
            {
              "amount": "2.8",
              "isAllIn": false,
              "playerName": "Big Blind",
              "totalBet": "2.8",
              "type": "raise",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "amount": "1.4",
              "playerName": "Big Blind",
              "type": "return-bet",
            },
            {
              "handStrength": 6,
              "mucked": true,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "4.06",
              "isSidePot": false,
              "playerName": "Big Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "pot limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4293638974",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26781371",
            "tableSize": 6,
            "timestamp": 2022-06-02T18:58:50.000Z,
            "type": "cash",
            "variant": "omaha",
          },
          "players": [
            {
              "chipStack": "38.96",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 2,
            },
            {
              "chipStack": "11",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 4,
            },
            {
              "chipStack": "7.5",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 5,
            },
            {
              "chipStack": "25",
              "isAnonymous": false,
              "isHero": true,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses omaha hi/lo hands with a high and low', () => {
      expect(parseHand({ hand: HAND_OMAHA_HILO_HIGH_AND_LOW })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "Kh",
                "Kc",
                "Ks",
                "Th",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Td",
                "Ad",
                "As",
                "4c",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "amount": "0.65",
              "isAllIn": false,
              "playerName": "Dealer",
              "totalBet": "0.75",
              "type": "raise",
            },
            {
              "amount": "0.5",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "cards": [
                "9d",
                "2c",
                "6h",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "amount": "1.43",
              "isAllIn": false,
              "playerName": "Dealer",
              "type": "bet",
            },
            {
              "amount": "1.43",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "cards": [
                "3h",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "amount": "4.36",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "bet",
            },
            {
              "amount": "8.72",
              "isAllIn": false,
              "playerName": "Dealer",
              "totalBet": "8.72",
              "type": "raise",
            },
            {
              "amount": "0.3",
              "isAllIn": true,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "amount": "4.06",
              "playerName": "Dealer",
              "type": "return-bet",
            },
            {
              "cards": [
                "3c",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Dealer",
              "type": "showdown",
            },
            {
              "amount": "13.18",
              "isSidePot": false,
              "playerName": "Dealer",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "pot limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4304661864",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26953916",
            "tableSize": 6,
            "timestamp": 2022-06-26T16:46:42.000Z,
            "type": "cash",
            "variant": "omaha-8",
          },
          "players": [
            {
              "chipStack": "6.84",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 1,
            },
            {
              "chipStack": "25.6",
              "isAnonymous": false,
              "isHero": true,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 4,
            },
          ],
        }
      `);
    });

    it('parses omaha hi/lo hands with a high only', () => {
      expect(parseHand({ hand: HAND_OMAHA_HILO_HIGH_ONLY })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "As",
                "9d",
                "6h",
                "Jd",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Kd",
                "Js",
                "6c",
                "Jc",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "amount": "0.15",
              "isAllIn": false,
              "playerName": "Dealer",
              "type": "call",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "cards": [
                "Kc",
                "9h",
                "Ks",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "playerName": "Dealer",
              "type": "check",
            },
            {
              "cards": [
                "4h",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "amount": "0.41",
              "isAllIn": false,
              "playerName": "Dealer",
              "type": "bet",
            },
            {
              "amount": "0.41",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "cards": [
                "Th",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "playerName": "Dealer",
              "type": "check",
            },
            {
              "handStrength": 3,
              "mucked": false,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Dealer",
              "type": "showdown",
            },
            {
              "amount": "1.26",
              "isSidePot": false,
              "playerName": "Big Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "pot limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4304661627",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26953916",
            "tableSize": 6,
            "timestamp": 2022-06-26T16:46:04.000Z,
            "type": "cash",
            "variant": "omaha-8",
          },
          "players": [
            {
              "chipStack": "7.5",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 1,
            },
            {
              "chipStack": "25",
              "isAnonymous": false,
              "isHero": true,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 4,
            },
          ],
        }
      `);
    });

    it('parses omaha hi/lo hands with no showdown', () => {
      expect(parseHand({ hand: HAND_OMAHA_HILO_NO_SHOWDOWN })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.5",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "1",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "8h",
                "4d",
                "7c",
                "Ad",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "4c",
                "As",
                "Kd",
                "6s",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "amount": "1.5",
              "isAllIn": false,
              "playerName": "Dealer",
              "totalBet": "2",
              "type": "raise",
            },
            {
              "playerName": "Big Blind",
              "type": "fold",
            },
            {
              "amount": "1",
              "playerName": "Dealer",
              "type": "return-bet",
            },
            {
              "handStrength": 0,
              "mucked": true,
              "playerName": "Dealer",
              "type": "showdown",
            },
            {
              "amount": "2",
              "isSidePot": false,
              "playerName": "Dealer",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "pot limit",
            "blinds": [
              "0.5",
              "1",
            ],
            "currency": "USD",
            "handNumber": "4304660846",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26949791",
            "tableSize": 6,
            "timestamp": 2022-06-26T16:43:59.000Z,
            "type": "cash",
            "variant": "omaha-8",
          },
          "players": [
            {
              "chipStack": "101.33",
              "isAnonymous": false,
              "isHero": true,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 2,
            },
            {
              "chipStack": "26.95",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 5,
            },
          ],
        }
      `);
    });

    it('parses straight flushes', () => {
      expect(parseHand({ hand: HAND_STRAIGHT_FLUSH })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.5",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "1",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "2h",
                "4d",
                "Kh",
                "5h",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6d",
                "Kd",
                "9c",
                "Qh",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Ac",
                "Ts",
                "7s",
                "Jc",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Jh",
                "Ah",
                "As",
                "6c",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Td",
                "5s",
                "8d",
                "4s",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "3c",
                "9d",
                "2s",
                "5c",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "amount": "1",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "amount": "4.5",
              "isAllIn": false,
              "playerName": "UTG+1",
              "totalBet": "4.5",
              "type": "raise",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "playerName": "Big Blind",
              "type": "fold",
            },
            {
              "amount": "14",
              "isAllIn": false,
              "playerName": "UTG",
              "totalBet": "15",
              "type": "raise",
            },
            {
              "amount": "42",
              "isAllIn": false,
              "playerName": "UTG+1",
              "totalBet": "46.5",
              "type": "raise",
            },
            {
              "amount": "33.51",
              "isAllIn": true,
              "playerName": "UTG",
              "totalBet": "48.51",
              "type": "raise",
            },
            {
              "amount": "2.01",
              "isAllIn": false,
              "playerName": "UTG+1",
              "type": "call",
            },
            {
              "cards": [
                "Kc",
                "Tc",
                "Qc",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "cards": [
                "Qd",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "cards": [
                "8h",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "handStrength": 9,
              "mucked": false,
              "playerName": "UTG",
              "type": "showdown",
            },
            {
              "handStrength": 4,
              "mucked": false,
              "playerName": "UTG+1",
              "type": "showdown",
            },
            {
              "amount": "94.52",
              "isSidePot": false,
              "playerName": "UTG",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "pot limit",
            "blinds": [
              "0.5",
              "1",
            ],
            "currency": "USD",
            "handNumber": "4296950465",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26829077",
            "tableSize": 6,
            "timestamp": 2022-06-10T12:42:20.000Z,
            "type": "cash",
            "variant": "omaha",
          },
          "players": [
            {
              "chipStack": "152.7",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 1,
            },
            {
              "chipStack": "92",
              "isAnonymous": false,
              "isHero": true,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 2,
            },
            {
              "chipStack": "48.51",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 3,
            },
            {
              "chipStack": "80.31",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 4,
            },
            {
              "chipStack": "65.01",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 5,
            },
            {
              "chipStack": "98",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses fast-fold games with missing summary', () => {
      expect(parseHand({ hand: HAND_FAST_FOLD_MISSING_SUMMARY })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "3s",
                "2s",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Qc",
                "6d",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "8h",
                "2c",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6h",
                "6c",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Ts",
                "Td",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "9c",
                "Kd",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "amount": "0.75",
              "isAllIn": false,
              "playerName": "UTG",
              "totalBet": "0.75",
              "type": "raise",
            },
            {
              "amount": "0.75",
              "isAllIn": false,
              "playerName": "UTG+1",
              "type": "call",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "playerName": "Big Blind",
              "type": "fold",
            },
            {
              "cards": [
                "7h",
                "5c",
                "8c",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "amount": "1.05",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "bet",
            },
            {
              "amount": "2.1",
              "isAllIn": false,
              "playerName": "UTG+1",
              "totalBet": "2.1",
              "type": "raise",
            },
            {
              "amount": "7.01",
              "isAllIn": false,
              "playerName": "UTG",
              "totalBet": "8.06",
              "type": "raise",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "amount": "5.96",
              "playerName": "UTG",
              "type": "return-bet",
            },
            {
              "handStrength": 1,
              "mucked": true,
              "playerName": "UTG",
              "type": "showdown",
            },
            {
              "amount": "5.75",
              "isSidePot": false,
              "playerName": "UTG",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.1",
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4384116451",
            "isFastFold": true,
            "site": "bovada",
            "tableNumber": "1822",
            "tableSize": 6,
            "timestamp": 2022-12-05T19:22:58.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "26.3",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 1,
            },
            {
              "chipStack": "22.18",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 2,
            },
            {
              "chipStack": "30.36",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 3,
            },
            {
              "chipStack": "25.1",
              "isAnonymous": false,
              "isHero": true,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 4,
            },
            {
              "chipStack": "30.84",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 5,
            },
            {
              "chipStack": "34.47",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses stack sizes and bet sizes containing commas', () => {
      expect(parseHand({ hand: HAND_THOUSANDS_OF_DOLLARS })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "1",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "2",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "Ac",
                "3d",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "4c",
                "Jc",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "5s",
                "Ah",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "7h",
                "Qc",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "4h",
                "5d",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "7d",
                "8s",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "amount": "4",
              "isAllIn": false,
              "playerName": "Small Blind",
              "totalBet": "5",
              "type": "raise",
            },
            {
              "amount": "3",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "cards": [
                "Qs",
                "5c",
                "4d",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "amount": "4",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "bet",
            },
            {
              "amount": "15",
              "isAllIn": false,
              "playerName": "Big Blind",
              "totalBet": "15",
              "type": "raise",
            },
            {
              "amount": "11",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "call",
            },
            {
              "cards": [
                "Tc",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "playerName": "Small Blind",
              "type": "check",
            },
            {
              "amount": "25",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "bet",
            },
            {
              "amount": "1046.03",
              "isAllIn": true,
              "playerName": "Small Blind",
              "totalBet": "1046.03",
              "type": "raise",
            },
            {
              "amount": "65.15",
              "isAllIn": true,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "amount": "955.88",
              "playerName": "Small Blind",
              "type": "return-bet",
            },
            {
              "cards": [
                "As",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "handStrength": 1,
              "mucked": false,
              "playerName": "Small Blind",
              "type": "showdown",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "216.3",
              "isSidePot": false,
              "playerName": "Big Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "1",
              "2",
            ],
            "currency": "USD",
            "handNumber": "4515975493",
            "isFastFold": true,
            "site": "bovada",
            "tableNumber": "1905",
            "tableSize": 6,
            "timestamp": 2023-08-23T01:00:26.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "200.18",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 1,
            },
            {
              "chipStack": "90.76",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 2,
            },
            {
              "chipStack": "176.74",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 3,
            },
            {
              "chipStack": "1066.03",
              "isAnonymous": false,
              "isHero": true,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 4,
            },
            {
              "chipStack": "110.15",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 5,
            },
            {
              "chipStack": "525.33",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    it('parses unknown', () => {
      expect(parseHand({ hand: HAND_NO_SMALL_BLIND })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "0.25",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "5s",
                "Ad",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6d",
                "Js",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "5c",
                "9s",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "As",
                "Qs",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "amount": "0.25",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "amount": "0.75",
              "isAllIn": false,
              "playerName": "Big Blind",
              "totalBet": "1",
              "type": "raise",
            },
            {
              "amount": "0.75",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "call",
            },
            {
              "cards": [
                "Ac",
                "4h",
                "7h",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "playerName": "UTG",
              "type": "check",
            },
            {
              "cards": [
                "Kh",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "amount": "1.5",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "bet",
            },
            {
              "amount": "3",
              "isAllIn": false,
              "playerName": "UTG",
              "totalBet": "3",
              "type": "raise",
            },
            {
              "amount": "1.5",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "cards": [
                "6s",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "amount": "3.8",
              "isAllIn": false,
              "playerName": "UTG",
              "type": "bet",
            },
            {
              "amount": "3.8",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "handStrength": 1,
              "mucked": false,
              "playerName": "UTG",
              "type": "showdown",
            },
            {
              "handStrength": 1,
              "mucked": false,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "14.82",
              "isSidePot": false,
              "playerName": "Big Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "0.25",
            ],
            "currency": "USD",
            "handNumber": "4290336243",
            "isFastFold": false,
            "site": "bovada",
            "tableNumber": "26728930",
            "tableSize": 6,
            "timestamp": 2022-05-26T10:23:28.000Z,
            "type": "cash",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "18.26",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 2,
            },
            {
              "chipStack": "23.91",
              "isAnonymous": false,
              "isHero": true,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 3,
            },
            {
              "chipStack": "54.38",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 4,
            },
            {
              "chipStack": "54.15",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 6,
            },
          ],
        }
      `);
    });

    describe('sites', () => {
      it('parses Ignition hand histories', () => {
        expect(parseHand({ hand: HAND_IGNITION })).toMatchInlineSnapshot(`
          {
            "actions": [
              {
                "amount": "0.1",
                "playerName": "Small Blind",
                "postType": "blind",
                "type": "post",
              },
              {
                "amount": "0.25",
                "playerName": "Big Blind",
                "postType": "blind",
                "type": "post",
              },
              {
                "cards": [
                  "2c",
                  "Kc",
                ],
                "playerName": "UTG",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "Ah",
                  "5c",
                ],
                "playerName": "UTG+1",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "2s",
                  "3c",
                ],
                "playerName": "UTG+2",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "Jc",
                  "9h",
                ],
                "playerName": "Dealer",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "3s",
                  "5s",
                ],
                "playerName": "Small Blind",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "3h",
                  "6s",
                ],
                "playerName": "Big Blind",
                "type": "deal-hand",
              },
              {
                "playerName": "UTG",
                "type": "fold",
              },
              {
                "playerName": "UTG+1",
                "type": "fold",
              },
              {
                "playerName": "UTG+2",
                "type": "fold",
              },
              {
                "playerName": "Dealer",
                "type": "fold",
              },
              {
                "playerName": "Small Blind",
                "type": "fold",
              },
              {
                "handStrength": 0,
                "mucked": true,
                "playerName": "Big Blind",
                "type": "showdown",
              },
              {
                "amount": "0.35",
                "isSidePot": false,
                "playerName": "Big Blind",
                "type": "award-pot",
              },
            ],
            "info": {
              "bettingStructure": "no limit",
              "blinds": [
                "0.1",
                "0.25",
              ],
              "currency": "USD",
              "handNumber": "3579164007",
              "isFastFold": true,
              "site": "ignition",
              "tableNumber": "1209",
              "tableSize": 6,
              "timestamp": 2018-03-13T07:37:42.000Z,
              "type": "cash",
              "variant": "holdem",
            },
            "players": [
              {
                "chipStack": "10.45",
                "isAnonymous": true,
                "isHero": false,
                "name": "UTG",
                "position": "UTG",
                "seatNumber": 1,
              },
              {
                "chipStack": "24.75",
                "isAnonymous": true,
                "isHero": false,
                "name": "UTG+1",
                "position": "UTG+1",
                "seatNumber": 2,
              },
              {
                "chipStack": "23.29",
                "isAnonymous": true,
                "isHero": false,
                "name": "UTG+2",
                "position": "UTG+2",
                "seatNumber": 3,
              },
              {
                "chipStack": "127.59",
                "isAnonymous": true,
                "isHero": false,
                "name": "Dealer",
                "position": "BTN",
                "seatNumber": 4,
              },
              {
                "chipStack": "12.47",
                "isAnonymous": true,
                "isHero": false,
                "name": "Small Blind",
                "position": "SB",
                "seatNumber": 5,
              },
              {
                "chipStack": "25",
                "isAnonymous": false,
                "isHero": true,
                "name": "Big Blind",
                "position": "BB",
                "seatNumber": 6,
              },
            ],
          }
        `);
      });

      it('parses Bodog hand histories', () => {
        expect(parseHand({ hand: HAND_BODOG })).toMatchInlineSnapshot(`
          {
            "actions": [
              {
                "amount": "1",
                "playerName": "Small Blind",
                "postType": "blind",
                "type": "post",
              },
              {
                "amount": "2",
                "playerName": "Big Blind",
                "postType": "blind",
                "type": "post",
              },
              {
                "cards": [
                  "7d",
                  "8c",
                ],
                "playerName": "Dealer",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "3c",
                  "4h",
                ],
                "playerName": "Small Blind",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "9c",
                  "4c",
                ],
                "playerName": "Big Blind",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "3h",
                  "Qc",
                ],
                "playerName": "UTG",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "Ts",
                  "Kd",
                ],
                "playerName": "UTG+1",
                "type": "deal-hand",
              },
              {
                "cards": [
                  "6d",
                  "2h",
                ],
                "playerName": "UTG+2",
                "type": "deal-hand",
              },
              {
                "playerName": "UTG",
                "type": "fold",
              },
              {
                "playerName": "UTG+1",
                "type": "fold",
              },
              {
                "playerName": "UTG+2",
                "type": "fold",
              },
              {
                "playerName": "Dealer",
                "type": "fold",
              },
              {
                "playerName": "Small Blind",
                "type": "fold",
              },
              {
                "handStrength": 0,
                "mucked": false,
                "playerName": "Big Blind",
                "type": "showdown",
              },
              {
                "amount": "3",
                "isSidePot": false,
                "playerName": "Big Blind",
                "type": "award-pot",
              },
            ],
            "info": {
              "bettingStructure": "no limit",
              "blinds": [
                "1",
                "2",
              ],
              "currency": "USD",
              "handNumber": "3821268000",
              "isFastFold": true,
              "site": "bodog",
              "tableNumber": "1400",
              "tableSize": 6,
              "timestamp": 2019-09-09T16:16:05.000Z,
              "type": "cash",
              "variant": "holdem",
            },
            "players": [
              {
                "chipStack": "202",
                "isAnonymous": true,
                "isHero": false,
                "name": "Dealer",
                "position": "BTN",
                "seatNumber": 1,
              },
              {
                "chipStack": "334.8",
                "isAnonymous": true,
                "isHero": false,
                "name": "Small Blind",
                "position": "SB",
                "seatNumber": 2,
              },
              {
                "chipStack": "179.95",
                "isAnonymous": true,
                "isHero": false,
                "name": "Big Blind",
                "position": "BB",
                "seatNumber": 3,
              },
              {
                "chipStack": "254.75",
                "isAnonymous": false,
                "isHero": true,
                "name": "UTG",
                "position": "UTG",
                "seatNumber": 4,
              },
              {
                "chipStack": "199",
                "isAnonymous": true,
                "isHero": false,
                "name": "UTG+1",
                "position": "UTG+1",
                "seatNumber": 5,
              },
              {
                "chipStack": "222.78",
                "isAnonymous": true,
                "isHero": false,
                "name": "UTG+2",
                "position": "UTG+2",
                "seatNumber": 6,
              },
            ],
          }
        `);
      });
    });
  });

  describe('tournaments', () => {
    it('parses tournament hands', () => {
      const filename =
        'HH20220626-082100 - 6615317 - MTT - Monthly Milly Sub-Satellite 2 Seats Gtd - $7-$0.70 - HOLDEM - NL -Tourney No.46767990.txt';

      expect(parseHand({ hand: HAND_TOURNAMENT, filename })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "40",
              "playerName": "UTG+2",
              "postType": "ante",
              "type": "post",
            },
            {
              "amount": "40",
              "playerName": "UTG+3",
              "postType": "ante",
              "type": "post",
            },
            {
              "amount": "40",
              "playerName": "Dealer",
              "postType": "ante",
              "type": "post",
            },
            {
              "amount": "40",
              "playerName": "Small Blind",
              "postType": "ante",
              "type": "post",
            },
            {
              "amount": "40",
              "playerName": "Big Blind",
              "postType": "ante",
              "type": "post",
            },
            {
              "amount": "40",
              "playerName": "UTG",
              "postType": "ante",
              "type": "post",
            },
            {
              "amount": "40",
              "playerName": "UTG+1",
              "postType": "ante",
              "type": "post",
            },
            {
              "amount": "200",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "400",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "9d",
                "5c",
                "2c",
                "Td",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "4c",
                "Ad",
                "Th",
                "8h",
              ],
              "playerName": "UTG+3",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6h",
                "Ac",
                "3s",
                "7s",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Qd",
                "3d",
                "Ts",
                "7d",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Js",
                "As",
                "Jd",
                "5s",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6s",
                "8c",
                "7c",
                "Ah",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "8s",
                "9c",
                "2h",
                "3h",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "amount": "800",
              "isAllIn": false,
              "playerName": "UTG+2",
              "totalBet": "800",
              "type": "raise",
            },
            {
              "playerName": "UTG+3",
              "type": "fold",
            },
            {
              "playerName": "Dealer",
              "type": "fold",
            },
            {
              "playerName": "Small Blind",
              "type": "fold",
            },
            {
              "amount": "400",
              "isAllIn": false,
              "playerName": "Big Blind",
              "type": "call",
            },
            {
              "cards": [
                "2d",
                "4d",
                "Qh",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "playerName": "Big Blind",
              "type": "check",
            },
            {
              "amount": "2080",
              "isAllIn": false,
              "playerName": "UTG+2",
              "type": "bet",
            },
            {
              "amount": "2160",
              "isAllIn": true,
              "playerName": "Big Blind",
              "totalBet": "2160",
              "type": "raise",
            },
            {
              "amount": "80",
              "isAllIn": false,
              "playerName": "UTG+2",
              "type": "call",
            },
            {
              "cards": [
                "Ks",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "cards": [
                "Kh",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "UTG+2",
              "type": "showdown",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Big Blind",
              "type": "showdown",
            },
            {
              "amount": "6400",
              "isSidePot": false,
              "playerName": "Big Blind",
              "type": "award-pot",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "200",
              "400",
            ],
            "buyIn": "7",
            "currency": "USD",
            "entryFee": "0.70",
            "format": "freezeout",
            "guaranteedPrizePool": "0",
            "handNumber": "4561202298",
            "isSatellite": true,
            "level": 10,
            "name": "Monthly Milly Sub-Satellite 2 Seats Gtd",
            "site": "bovada",
            "speed": "normal",
            "tableNumber": "2",
            "tableSize": 9,
            "timestamp": 2022-06-25T22:24:22.000Z,
            "tournamentNumber": "47895702",
            "tournamentStart": 2022-06-26T08:21:00.000Z,
            "type": "tournament",
            "variant": "omaha-8",
          },
          "players": [
            {
              "chipStack": "4619",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 30,
            },
            {
              "chipStack": "6282",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+3",
              "position": "CO",
              "seatNumber": 37,
            },
            {
              "chipStack": "4300",
              "isAnonymous": true,
              "isHero": false,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 86,
            },
            {
              "chipStack": "11003",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 16,
            },
            {
              "chipStack": "3000",
              "isAnonymous": false,
              "isHero": true,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 89,
            },
            {
              "chipStack": "5714",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 61,
            },
            {
              "chipStack": "15486",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 68,
            },
          ],
        }
      `);
    });

    it('parses tournament placements', () => {
      const filename =
        'HH20220626-164936 - 6615315 - STT - Hyper Turbo (500 Chips) - $50-$2.50 - HOLDEM - NL -Tourney No.51169700.txt';

      expect(parseHand({ hand: HAND_TOURNAMENT_PLACEMENT, filename })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "25",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "50",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "Kc",
                "Kh",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "8s",
                "7s",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6h",
                "Jd",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "cards": [
                "5d",
                "As",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "amount": "270",
              "isAllIn": true,
              "playerName": "Dealer",
              "totalBet": "270",
              "type": "raise",
            },
            {
              "amount": "245",
              "isAllIn": false,
              "playerName": "Small Blind",
              "type": "call",
            },
            {
              "playerName": "Big Blind",
              "type": "fold",
            },
            {
              "cards": [
                "9c",
                "4s",
                "2c",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "cards": [
                "Ts",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "cards": [
                "7c",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "handStrength": 1,
              "mucked": false,
              "playerName": "Small Blind",
              "type": "showdown",
            },
            {
              "handStrength": 0,
              "mucked": false,
              "playerName": "Dealer",
              "type": "showdown",
            },
            {
              "amount": "590",
              "isSidePot": false,
              "playerName": "Small Blind",
              "type": "award-pot",
            },
            {
              "placement": 4,
              "playerName": "Dealer",
              "type": "tournament-placement",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "25",
              "50",
            ],
            "buyIn": "50",
            "currency": "USD",
            "entryFee": "2.50",
            "format": "on-demand",
            "guaranteedPrizePool": "0",
            "handNumber": "4561633395",
            "isSatellite": false,
            "level": 3,
            "name": "Hyper Turbo (500 Chips)",
            "site": "bovada",
            "speed": "turbo",
            "tableNumber": "1",
            "tableSize": 6,
            "timestamp": 2022-06-26T16:58:58.000Z,
            "tournamentNumber": "51169700",
            "tournamentStart": 2022-06-26T16:49:36.000Z,
            "type": "tournament",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "1125",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 4,
            },
            {
              "chipStack": "845",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 1,
            },
            {
              "chipStack": "760",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 3,
            },
            {
              "chipStack": "270",
              "isAnonymous": false,
              "isHero": true,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 5,
            },
          ],
        }
      `);
    });

    it('parses tournament bounties', () => {
      const filename =
        'HH20220626-165412 - 6615316 - MSG - 2-Table ($10 Knockout) - $25-$2.50 - HOLDEM - NL -Tourney No.51170049.txt';

      expect(parseHand({ hand: HAND_TOURNAMENT_BOUNTY_AWARDED, filename })).toMatchInlineSnapshot(`
        {
          "actions": [
            {
              "amount": "50",
              "playerName": "Small Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "amount": "100",
              "playerName": "Big Blind",
              "postType": "blind",
              "type": "post",
            },
            {
              "cards": [
                "4d",
                "7h",
              ],
              "playerName": "UTG+1",
              "type": "deal-hand",
            },
            {
              "cards": [
                "6d",
                "4s",
              ],
              "playerName": "UTG+2",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Ah",
                "6h",
              ],
              "playerName": "Dealer",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Jd",
                "Ad",
              ],
              "playerName": "Small Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "Tc",
                "7c",
              ],
              "playerName": "Big Blind",
              "type": "deal-hand",
            },
            {
              "cards": [
                "2c",
                "Jc",
              ],
              "playerName": "UTG",
              "type": "deal-hand",
            },
            {
              "playerName": "UTG",
              "type": "fold",
            },
            {
              "playerName": "UTG+1",
              "type": "fold",
            },
            {
              "playerName": "UTG+2",
              "type": "fold",
            },
            {
              "amount": "2155",
              "isAllIn": true,
              "playerName": "Dealer",
              "totalBet": "2155",
              "type": "raise",
            },
            {
              "amount": "2200",
              "isAllIn": true,
              "playerName": "Small Blind",
              "totalBet": "2250",
              "type": "raise",
            },
            {
              "playerName": "Big Blind",
              "type": "fold",
            },
            {
              "amount": "95",
              "playerName": "Small Blind",
              "type": "return-bet",
            },
            {
              "cards": [
                "8d",
                "Kc",
                "8h",
              ],
              "street": "flop",
              "type": "deal-board",
            },
            {
              "cards": [
                "Ac",
              ],
              "street": "turn",
              "type": "deal-board",
            },
            {
              "cards": [
                "Ks",
              ],
              "street": "river",
              "type": "deal-board",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Dealer",
              "type": "showdown",
            },
            {
              "handStrength": 2,
              "mucked": false,
              "playerName": "Small Blind",
              "type": "showdown",
            },
            {
              "amount": "4410",
              "isSidePot": false,
              "playerName": "Small Blind",
              "type": "award-pot",
            },
            {
              "amount": "10",
              "playerName": "Small Blind",
              "type": "award-bounty",
            },
            {
              "placement": 12,
              "playerName": "Dealer",
              "type": "tournament-placement",
            },
          ],
          "info": {
            "bettingStructure": "no limit",
            "blinds": [
              "50",
              "100",
            ],
            "buyIn": "25",
            "currency": "USD",
            "entryFee": "2.50",
            "format": "on-demand",
            "guaranteedPrizePool": "0",
            "handNumber": "4561646697",
            "isSatellite": false,
            "level": 4,
            "name": "2-Table ($10 Knockout)",
            "site": "bovada",
            "speed": "turbo",
            "tableNumber": "1",
            "tableSize": 6,
            "timestamp": 2022-06-26T17:19:45.000Z,
            "tournamentNumber": "51170049",
            "tournamentStart": 2022-06-26T16:54:12.000Z,
            "type": "tournament",
            "variant": "holdem",
          },
          "players": [
            {
              "chipStack": "1840",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+1",
              "position": "UTG+1",
              "seatNumber": 4,
            },
            {
              "chipStack": "2610",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG+2",
              "position": "UTG+2",
              "seatNumber": 14,
            },
            {
              "chipStack": "2155",
              "isAnonymous": false,
              "isHero": true,
              "name": "Dealer",
              "position": "BTN",
              "seatNumber": 18,
            },
            {
              "chipStack": "2250",
              "isAnonymous": true,
              "isHero": false,
              "name": "Small Blind",
              "position": "SB",
              "seatNumber": 9,
            },
            {
              "chipStack": "615",
              "isAnonymous": true,
              "isHero": false,
              "name": "Big Blind",
              "position": "BB",
              "seatNumber": 3,
            },
            {
              "chipStack": "4030",
              "isAnonymous": true,
              "isHero": false,
              "name": "UTG",
              "position": "UTG",
              "seatNumber": 2,
            },
          ],
        }
      `);
    });
  });
});
