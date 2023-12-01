import { Position, TableSize } from '../types';

const POSITIONS_BY_TABLE_SIZE: Record<TableSize, Position[]> = {
  2: ['BB', 'SB'],
  6: ['BTN', 'SB', 'BB', 'UTG', 'MP', 'CO'],
  8: ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'HJ', 'CO'],
  9: ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'LJ', 'HJ', 'CO'],
};

export const getPosition = (positionIndex: number, tableSize: TableSize): Position =>
  POSITIONS_BY_TABLE_SIZE[tableSize][positionIndex];
