export interface Table {
  header: (string | number)[];
  rows: (string | number)[][];
  footer: (string | number)[];
  maxWidth: number[];
}
