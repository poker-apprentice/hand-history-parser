import {
  HAND_CASH_ALL_IN,
  HAND_CASH_NO_SHOWDOWN,
  HAND_TOURNAMENT_BOUNTY_AND_PLACEMENT,
} from '~/__fixtures__/hands/pokerstars';
import { parseHand } from './parseHand';

describe('parseHand', () => {
  it('parses all-ins', () => {
    expect(parseHand({ hand: HAND_CASH_ALL_IN })).toMatchInlineSnapshot();
  });

  it('parses no showdown', () => {
    expect(parseHand({ hand: HAND_CASH_NO_SHOWDOWN })).toMatchInlineSnapshot();
  });

  it('parses tournament bounties and placement awards', () => {
    expect(parseHand({ hand: HAND_TOURNAMENT_BOUNTY_AND_PLACEMENT })).toMatchInlineSnapshot();
  });
});
