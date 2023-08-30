import { getHand } from './getHand';

describe('getHand', () => {
  describe('holdem', () => {
    it('handles pairs', () => {
      expect(getHand(['As', 'Ad'])).toEqual('AA');
    });

    it('handles suited', () => {
      expect(getHand(['As', 'Ks'])).toEqual('AKs');
    });

    it('handles unsuited', () => {
      expect(getHand(['As', 'Kd'])).toEqual('AKo');
    });

    it('sorts by rank', () => {
      expect(getHand(['Ks', 'Ad'])).toEqual('AKo');
      expect(getHand(['Qs', 'Kd'])).toEqual('KQo');
      expect(getHand(['Js', 'Qd'])).toEqual('QJo');
      expect(getHand(['Ts', 'Jd'])).toEqual('JTo');
      expect(getHand(['9s', 'Td'])).toEqual('T9o');
      expect(getHand(['8s', '9d'])).toEqual('98o');
      expect(getHand(['7s', '8d'])).toEqual('87o');
      expect(getHand(['6s', '7d'])).toEqual('76o');
      expect(getHand(['5s', '6d'])).toEqual('65o');
      expect(getHand(['4s', '5d'])).toEqual('54o');
      expect(getHand(['3s', '4d'])).toEqual('43o');
      expect(getHand(['2s', '3d'])).toEqual('32o');
    });
  });

  describe('omaha', () => {
    it('handles single-suited', () => {
      expect(getHand(['As', 'Ad', 'Ks', '9h'])).toEqual('AAK9s');
      expect(getHand(['As', 'As', 'Ks', '9h'])).toEqual('AAK9s');
      expect(getHand(['As', 'As', 'Ks', '9s'])).toEqual('AAK9s');
    });

    it('handles double-suited', () => {
      expect(getHand(['As', 'Ad', 'Ks', '9d'])).toEqual('AAK9ss');
      expect(getHand(['As', 'Ks', 'Kh', '9h'])).toEqual('AKK9ss');
    });

    it('handles unsuited', () => {
      expect(getHand(['As', 'Ad', 'Kc', '9h'])).toEqual('AAK9o');
    });

    it('sorts by rank', () => {
      expect(getHand(['9h', 'Kc', 'Jd', 'As'])).toEqual('AKJ9o');
    });
  });
});
