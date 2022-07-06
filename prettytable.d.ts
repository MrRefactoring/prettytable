export class PrettyTable {
  fieldNames(names: string[]): void;

  addRow(row: string[]): string;

  toString(): string;
}
