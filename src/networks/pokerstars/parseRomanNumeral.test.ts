import { parseRomanNumeral } from './parseRomanNumeral';

describe('parseRomanNumeral', () => {
  it('parses individual roman numerals', () => {
    expect(parseRomanNumeral('I')).toBe(1);
    expect(parseRomanNumeral('V')).toBe(5);
    expect(parseRomanNumeral('X')).toBe(10);
    expect(parseRomanNumeral('L')).toBe(50);
    expect(parseRomanNumeral('C')).toBe(100);
    expect(parseRomanNumeral('D')).toBe(500);
    expect(parseRomanNumeral('M')).toBe(1000);
  });

  it('parses complex combinations of roman numerals', () => {
    expect(parseRomanNumeral('IV')).toBe(4);
    expect(parseRomanNumeral('IM')).toBe(999);
    expect(parseRomanNumeral('CMXCIX')).toBe(999);
    expect(parseRomanNumeral('MCMLXXXVIII')).toBe(1988);
  });
});
