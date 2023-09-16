import { HAND_ALL_IN as HAND_BOVADA } from '~/__fixtures__/hands/bovada';
import { parseHand } from './parseHand';
import { Site } from './types';

describe('parseHand', () => {
  const parseSiteFromHand = async (hand: string): Promise<Site> => {
    const { info } = await parseHand(hand);
    return info.site;
  };

  it('parses bovada hands', async () => {
    expect(await parseSiteFromHand(HAND_BOVADA)).toEqual('bovada');
  });
});
