import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { FromCsvOptions, Table } from './interfaces';

export class PrettyTable {
  private table: Table;

  constructor() {
    this.table = {
      header: [],
      rows: [],
      footer: [],
      maxWidth: [],
    };
  }

  getHeader() {
    return this.table.header;
  }

  setHeader(header: (string | number)[]) {
    this.table.header = header;

    this.recalculateMaxWidth(header);
  }

  getFooter() {
    return this.table.footer;
  }

  setFooter(footer: (string | number)[]) {
    this.table.footer = footer;

    this.recalculateMaxWidth(footer);
  }

  getRows() {
    return this.table.rows;
  }

  getRow(index: number) {
    return this.getRows()[index];
  }

  addRows(rows: (string | number)[][]) {
    this.table.rows.push(...rows);

    for (const row of rows) {
      this.recalculateMaxWidth(row);
    }
  }

  addRow(row: (string | number)[]) {
    this.table.rows.push(row);

    this.recalculateMaxWidth(row);
  }

  deleteRow(index: number) {
    this.table.rows.splice(index, 1);
    this.table.maxWidth = [];

    for (const row of [this.table.header, ...this.table.rows, this.table.footer]) {
      this.recalculateMaxWidth(row);
    }
  }

  // TODO immutable
  // orderBy() {
  //   throw new Error('Not implemented yet');
  // }

  // TODO immutable
  // groupBy() {
  //   throw new Error('Not implemented yet');
  // }

  // TODO immutable
  // where() {
  //   throw new Error('Not implemented yet');
  // }

  toString(): string {
    let finalTable = this.getSeparatorLine() + '\n';
    let headerString = '| ';
    let rowString = '';
    let footerString = '| ';
    let lengthDifference: number;

    // Create the table header from column list
    for (let i = 0; i < this.table.header.length; i++) {
      headerString += this.table.header[i];

      // Adjust for max width of the column and pad spaces
      if (this.table.header[i].toString().length < this.table.maxWidth[i]) {
        lengthDifference = this.table.maxWidth[i] - this.table.header[i].toString().length;
        headerString += Array(lengthDifference + 1).join(' ');
      }

      headerString += ' | ';
    }

    if (this.table.header.length) {
      finalTable += headerString.trim() + '\n';
      finalTable += this.getSeparatorLine() + '\n';
    }

    // Construct the table body
    for (let i = 0; i < this.table.rows.length; i++) {
      let tempRowString = '| ';

      for (let k = 0; k < this.table.rows[i].length; k++) {
        tempRowString += this.table.rows[i][k];

        // Adjust max width of each cell and pad spaces as necessary
        if (this.table.rows[i][k].toString().length < this.table.maxWidth[k]) {
          lengthDifference = this.table.maxWidth[k] - this.table.rows[i][k].toString().length;
          tempRowString += Array(lengthDifference + 1).join(' ');
        }

        tempRowString += ' | ';
      }

      rowString += tempRowString.trim() + '\n';
    }

    // Append to the final table string
    finalTable += rowString.trim() + '\n';
    // Draw last line and return
    finalTable += this.getSeparatorLine() + '\n';

    // Create the table footer from column list
    for (let i = 0; i < this.table.footer.length; i++) {
      footerString += this.table.footer[i];

      // Adjust for max width of the column and pad spaces
      if (this.table.footer[i].toString().length < this.table.maxWidth[i]) {
        lengthDifference = this.table.maxWidth[i] - this.table.footer[i].toString().length;
        footerString += Array(lengthDifference + 1).join(' ');
      }

      footerString += ' | ';
    }

    if (this.table.footer.length) {
      finalTable += footerString.trim() + '\n';
      finalTable += this.getSeparatorLine() + '\n';
    }

    return finalTable.trim();
  }

  // TODO
  // toHtml() {
  //   throw new Error('Not implemented yet');
  // }

  toCsv(): string {
    return stringify([
      this.table.header,
      ...this.table.rows,
      this.table.footer,
    ].filter(e => e.length));
  }

  toJson() {
    if (this.table.header.length === 0) {
      throw new Error('Header should be defined for serializing to JSON');
    }

    const json: Record<string | number, string | number>[] = [];

    for (const row of this.table.rows) {
      const record: Record<string | number, string | number> = {};

      for (let i = 0; i < row.length; i++) {
        const cellName = this.table.header[i];

        record[cellName] = row[i];
      }

      json.push(record);
    }

    return json;
  }

  clone() {
    const table = new PrettyTable();

    table.setHeader([...this.table.header]);

    for (const row of this.table.rows) {
      table.addRow([...row]);
    }

    table.setFooter([...this.table.footer]);

    return table;
  }

  static from(header: (string | number)[] | null = null, rows: (string | number)[][] | null = null, footer: (string | number)[] | null = null): PrettyTable {
    const table = new PrettyTable();

    table.setHeader(header || []);

    for (const row of rows || []) {
      table.addRow(row);
    }

    table.setFooter(footer || []);

    return table;
  }

  static fromCsv(file: string | Buffer, options: FromCsvOptions = { header: true, footer: false }): PrettyTable {
    if (typeof options.header === 'undefined') {
      options.header = true;
    }

    const table = new PrettyTable();
    const csv: string[][] = parse(file);

    if (options.header) {
      table.setHeader(csv[0]);
      csv.splice(0, 1);
    }

    if (options.footer) {
      table.setFooter(csv[csv.length - 1]);
      csv.splice(csv.length - 1, 1);
    }

    for (const row of csv) {
      table.addRow(row);
    }

    return table;
  }

  static fromJson(json: Record<string | number, string | number>[]): PrettyTable {
    const table = new PrettyTable();

    for (const obj of json) {
      const header = Object.keys(obj);

      // TODO header with diff length
      if (table.getHeader().length < header.length) {
        table.setHeader(header);
      }

      const row: (string | number)[] = [];

      for (const key of header) {
        row.push(obj[key]);
      }

      table.addRow(row);
    }

    return table;
  }

  private getSeparatorLine() {
    let finalLine = '+';

    for (let i = 0; i < this.table.maxWidth.length; i++) {
      finalLine += Array(this.table.maxWidth[i] + 3).join('-') + '+';
    }

    return finalLine;
  }

  private recalculateMaxWidth(record: (string | number)[]) {
    if (this.table.maxWidth.length === 0) {
      this.table.maxWidth.push(...record.map(r => r.toString().length));
    }

    for (let i = 0; i < record.length; i++) {
      if (record[i].toString().length > this.table.maxWidth[i]) {
        this.table.maxWidth[i] = record[i].toString().length;
      }
    }
  }
}
