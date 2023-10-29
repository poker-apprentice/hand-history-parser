import { HAND_7CARD_STUD_HILO } from '~/__fixtures__/hands/acr';
import { parseHand } from './parseHand';

describe('parseHand', () => {
  it('parses 7-card stud hi/lo', () => {
    expect(parseHand(HAND_7CARD_STUD_HILO)).toMatchInlineSnapshot();
  });
});
