import * as fsp from 'fs/promises';
import * as path from 'path';
import { PrettyTable } from '../../src';
import test from 'ava';

const csvFilePath = path.resolve(__dirname, './data.csv');

test('fromCsv should works', async t => {
  const csvFile = await fsp.readFile(csvFilePath);

  const prettyTable = PrettyTable.fromCsv(csvFile).toString();

  const expectedTable = `
+-----------+-----+-------------+
| name      | age | city        |
+-----------+-----+-------------+
| john      | 22  | new york    |
| elizabeth | 43  | chicago     |
| bill      | 31  | atlanta     |
| mary      | 18  | los angeles |
+-----------+-----+-------------+
`.trim();

  t.is(prettyTable, expectedTable);
});

test('fromCsv should works without header', async t => {
  const csvFile = await fsp.readFile(csvFilePath);

  const prettyTable = PrettyTable.fromCsv(csvFile, { header: false }).toString();

  const expectedTable = `
+-----------+-----+-------------+
| name      | age | city        |
| john      | 22  | new york    |
| elizabeth | 43  | chicago     |
| bill      | 31  | atlanta     |
| mary      | 18  | los angeles |
+-----------+-----+-------------+
`.trim();

  t.is(prettyTable, expectedTable);
});

test('fromCsv should works with footer', async t => {
  const csvFile = await fsp.readFile(csvFilePath);

  const prettyTable = PrettyTable.fromCsv(csvFile, { footer: true }).toString();

  const expectedTable = `
+-----------+-----+-------------+
| name      | age | city        |
+-----------+-----+-------------+
| john      | 22  | new york    |
| elizabeth | 43  | chicago     |
| bill      | 31  | atlanta     |
+-----------+-----+-------------+
| mary      | 18  | los angeles |
+-----------+-----+-------------+
`.trim();

  t.is(prettyTable, expectedTable);
});

test('toCsv should works correctly', async t => {
  const table = new PrettyTable();

  table.setHeader(['name', 'age', 'city']);

  table.addRows([
    ['john', 22, 'new york'],
    ['elizabeth', 43, 'chicago'],
    ['bill', 31, 'atlanta'],
    ['mary', 18, 'los angeles'],
  ]);

  const resultCsv = table.toCsv();
  const expectedCsv = await fsp.readFile(csvFilePath);

  t.is(resultCsv, expectedCsv.toString());
});
