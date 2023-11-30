import { BettingStructure, TournamentFormat, Variant } from '~/types';

const CASH_REGEX =
  /^HH(?<date>\d+)-(?<time>\d+) - (?<unknown>\d+) - (?<format>RING|ZONE) - (?<smallBlind>\$(\d+,)*\d+(\.\d+)?)-(?<bigBlind>\$(\d+,)*\d+(\.\d+)?) - (?<variant>HOLDEM|OMAHA|OMAHA HiLo|HOLDEMZonePoker|OMAHAZonePoker) - (?<bettingStructure>NL|PL|FL) - TBL No\.(?<tableNumber>\d+)(?<extension>\.[Tt][Xx][Tt])?$/;
const TOURNEY_REGEX =
  /^HH(?<date>\d+)-(?<time>\d+) - (?<unknown>\d+) - (?<format>STT|MTT|MSG|Jackpot Sit & Go) - (?<tournamentName>.+) - (?<buyIn>\$(\d+,)*\d+(\.\d+)?)-(?<entryFee>\$(\d+,)*\d+(\.\d+)?) - (?<variant>HOLDEM|OMAHA|OMAHA HiLo) - (?<bettingStructure>NL|PL|FL) -Tourney No\.(?<tournamentNumber>\d+)(?<extension>\.[Tt][Xx][Tt])?$/;

export interface CashFilenameMeta {
  type: 'cash';
  currency: string;
  timestamp: Date;
  isFastFold: boolean;
  smallBlind: string;
  bigBlind: string;
  variant: Variant;
  bettingStructure: BettingStructure;
}

export interface TournamentFilenameMeta {
  type: 'tournament';
  currency: string;
  timestamp: Date;
  format: TournamentFormat;
  name: string;
  buyIn: string;
  entryFee: string;
  variant: Variant;
  bettingStructure: BettingStructure;
  tournamentNumber: string;
  guaranteedPrizePool: string;
  isSatellite: boolean;
}

export type FilenameMeta = CashFilenameMeta | TournamentFilenameMeta;

const getDate = (dateString: string, timeString: string): Date => {
  const [, year, month, day] = dateString.match(/^(\d{4})(\d{2})(\d{2})$/)!.map(Number);
  const [, hour, minute, second] = timeString.match(/^(\d{2})(\d{2})(\d{2})$/)!.map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
};

const getBettingStructure = (str: string): BettingStructure => {
  switch (str) {
    case 'NL':
      return 'no limit';
    case 'PL':
      return 'pot limit';
    case 'FL':
      return 'limit';
    default:
      throw new Error(`Unexpected betting structure: "${str}"`);
  }
};

const getVariant = (str: string): Variant => {
  switch (str) {
    case 'HOLDEM':
    case 'HOLDEMZonePoker':
      return 'holdem';
    case 'OMAHA':
    case 'OMAHAZonePoker':
      return 'omaha';
    case 'OMAHA HiLo':
      return 'omaha-8';
    default:
      throw new Error(`Unexpected variant: "${str}"`);
  }
};

const getTournamentFormat = (str: string): TournamentFormat => {
  switch (str) {
    case 'Jackpot Sit & Go':
      return 'freezeout';
    case 'MSG':
      return 'on-demand';
    case 'MTT':
      return 'freezeout';
    case 'STT':
      return 'on-demand';
    default:
      throw new Error(`Unexpected tournament format: "${str}"`);
  }
};

const getTournamentGuarantee = (tournamentName: string): string => {
  const match = tournamentName.match(/\$(?<guarantee>(\d+.)*\d+)\s+guaranteed/i)?.groups;
  return match?.guarantee.replace('.', '') ?? '0';
};

export const parseFilename = (filename: string): FilenameMeta | undefined => {
  const cash = filename.match(CASH_REGEX)?.groups;
  if (cash) {
    return {
      type: 'cash',
      currency: 'USD',
      timestamp: getDate(cash.date, cash.time),
      bettingStructure: getBettingStructure(cash.bettingStructure),
      variant: getVariant(cash.variant),
      isFastFold: cash.format === 'ZONE',
      smallBlind: cash.smallBlind.replace(/[$,]/, ''),
      bigBlind: cash.bigBlind.replace(/[$,]/, ''),
    };
  }

  const tourney = filename.match(TOURNEY_REGEX)?.groups;
  if (tourney) {
    return {
      type: 'tournament',
      currency: 'USD',
      timestamp: getDate(tourney.date, tourney.time),
      name: tourney.tournamentName,
      tournamentNumber: tourney.tournamentNumber,
      bettingStructure: getBettingStructure(tourney.bettingStructure),
      variant: getVariant(tourney.variant),
      format: getTournamentFormat(tourney.format),
      buyIn: tourney.buyIn.replace(/[$,]/, ''),
      entryFee: tourney.entryFee.replace(/[$,]/, ''),
      guaranteedPrizePool: getTournamentGuarantee(tourney.tournamentName),
      isSatellite: /satellite/i.test(tourney.tournamentName),
    };
  }

  return undefined;
};
