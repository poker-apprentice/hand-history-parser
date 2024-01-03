const ROMAN_NUMERICAL_VALUES = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 } as const;

type ROMAN_NUMERAL = keyof typeof ROMAN_NUMERICAL_VALUES;

// eslint-disable-next-line jsdoc/require-jsdoc
function assertRomanNumeral(str: string | undefined): asserts str is ROMAN_NUMERAL {
  if (str === undefined || !Object.hasOwn(ROMAN_NUMERICAL_VALUES, str)) {
    throw new Error(`Unrecognized roman numeral: "${str}"`);
  }
}

const getRomanNumeral = (str: string | undefined): ROMAN_NUMERAL => {
  const romanNumeral = str?.[0];
  assertRomanNumeral(romanNumeral);
  return romanNumeral;
};

export const parseRomanNumeral = (romanNumeral: string): number => {
  const romanNumerals = romanNumeral.toUpperCase().split('');
  let num = 0;
  while (romanNumerals.length) {
    const currentRoman = getRomanNumeral(romanNumerals.shift());
    const nextRoman = romanNumerals.length === 0 ? undefined : getRomanNumeral(romanNumerals[0]);
    const currentValue = ROMAN_NUMERICAL_VALUES[currentRoman];
    const decrement = nextRoman && currentValue < ROMAN_NUMERICAL_VALUES[nextRoman];
    if (decrement) {
      num -= currentValue;
    } else {
      num += currentValue;
    }
  }
  return num;
};
