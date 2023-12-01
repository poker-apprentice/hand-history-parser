import { parseFilename } from './parseFilename';

describe('parseFilename', () => {
  describe('cash games', () => {
    it('parses ring games', () => {
      const filename =
        'HH20220618-220216 - 12208188 - RING - $0.50-$1 - OMAHA - PL - TBL No.26894678.txt';
      expect(parseFilename(filename)).toMatchInlineSnapshot(`
        {
          "bettingStructure": "pot limit",
          "bigBlind": "1",
          "currency": "USD",
          "isFastFold": false,
          "smallBlind": "0.50",
          "timestamp": 2022-06-18T22:02:16.000Z,
          "type": "cash",
          "variant": "omaha",
        }
      `);
    });
  });

  describe('tournaments', () => {
    it('parses STT tournaments', () => {
      const filename =
        'HH20220626-164936 - 6615315 - STT - Hyper Turbo (500 Chips) - $50-$2.50 - HOLDEM - NL -Tourney No.51169700.txt';
      expect(parseFilename(filename)).toMatchInlineSnapshot(`
        {
          "bettingStructure": "no limit",
          "buyIn": "50",
          "currency": "USD",
          "entryFee": "2.50",
          "format": "on-demand",
          "guaranteedPrizePool": "0",
          "isSatellite": false,
          "name": "Hyper Turbo (500 Chips)",
          "tournamentNumber": "51169700",
          "tournamentStart": 2022-06-26T16:49:36.000Z,
          "type": "tournament",
          "variant": "holdem",
        }
      `);
    });

    it('parses MTT tournaments', () => {
      const filename =
        'HH20220625-202000 - 6615318 - MTT - $300 Guaranteed (Beginner DS) - $4-$0.40 - OMAHA HiLo - PL -Tourney No.47895702.txt';
      expect(parseFilename(filename)).toMatchInlineSnapshot(`
        {
          "bettingStructure": "pot limit",
          "buyIn": "4",
          "currency": "USD",
          "entryFee": "0.40",
          "format": "freezeout",
          "guaranteedPrizePool": "300",
          "isSatellite": false,
          "name": "$300 Guaranteed (Beginner DS)",
          "tournamentNumber": "47895702",
          "tournamentStart": 2022-06-25T20:20:00.000Z,
          "type": "tournament",
          "variant": "omaha-8",
        }
      `);
    });

    it('parses MSG tournaments', () => {
      const filename =
        'HH20220626-165412 - 6615316 - MSG - 2-Table ($10 Knockout) - $25-$2.50 - HOLDEM - NL -Tourney No.51170049.txt';
      expect(parseFilename(filename)).toMatchInlineSnapshot(`
        {
          "bettingStructure": "no limit",
          "buyIn": "25",
          "currency": "USD",
          "entryFee": "2.50",
          "format": "on-demand",
          "guaranteedPrizePool": "0",
          "isSatellite": false,
          "name": "2-Table ($10 Knockout)",
          "tournamentNumber": "51170049",
          "tournamentStart": 2022-06-26T16:54:12.000Z,
          "type": "tournament",
          "variant": "holdem",
        }
      `);
    });

    it('parses Jackpot Sit & Go tournaments', () => {
      const filename =
        'HH20220619-004909 - 6556966 - Jackpot Sit & Go - Jackpot Sit And Go - $2 - TT$2-$0 - HOLDEM - NL -Tourney No.50991177.txt';
      expect(parseFilename(filename)).toMatchInlineSnapshot(`undefined`);
    });

    it('parses satellites', () => {
      const filename =
        'HH20220626-082100 - 6615317 - MTT - Monthly Milly Sub-Satellite 2 Seats Gtd - $7-$0.70 - HOLDEM - NL -Tourney No.46767990.txt';
      expect(parseFilename(filename)).toMatchInlineSnapshot(`
        {
          "bettingStructure": "no limit",
          "buyIn": "7",
          "currency": "USD",
          "entryFee": "0.70",
          "format": "freezeout",
          "guaranteedPrizePool": "0",
          "isSatellite": true,
          "name": "Monthly Milly Sub-Satellite 2 Seats Gtd",
          "tournamentNumber": "46767990",
          "tournamentStart": 2022-06-26T08:21:00.000Z,
          "type": "tournament",
          "variant": "holdem",
        }
      `);
    });

    it('parses guaranteed prize pools', () => {
      const filename =
        'HH20220711-143000 - 6755578 - MTT - $15.000 Guaranteed (Monster Stack) - $100-$9 - HOLDEM - NL -Tourney No.50866781.txt';
      expect(parseFilename(filename)).toMatchInlineSnapshot(`
        {
          "bettingStructure": "no limit",
          "buyIn": "100",
          "currency": "USD",
          "entryFee": "9",
          "format": "freezeout",
          "guaranteedPrizePool": "15000",
          "isSatellite": false,
          "name": "$15.000 Guaranteed (Monster Stack)",
          "tournamentNumber": "50866781",
          "tournamentStart": 2022-07-11T14:30:00.000Z,
          "type": "tournament",
          "variant": "holdem",
        }
      `);
    });
  });
});
