import { Cell } from './cell';

export interface Table {
  header: Cell[];
  rows: Cell[][];
  footer: Cell[];
  maxWidth: number[];
}
