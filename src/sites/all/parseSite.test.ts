import { InvalidSiteError } from '~/InvalidSiteError';
import { HAND_ALL_IN as HAND_BOVADA } from '~/__fixtures__/hands/bovada';
import { parseSite } from './parseSite';

describe('parseSite', () => {
  it('parses bovada hand', () => {
    expect(parseSite(HAND_BOVADA)).toEqual('bovada');
  });

  it('throws unrecognized hand', () => {
    expect(() => parseSite('something random and unknown\r\nline two')).toThrow(InvalidSiteError);
  });
});
