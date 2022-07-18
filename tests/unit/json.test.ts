import * as fsp from 'fs/promises';
import * as path from 'path';
import { PrettyTable } from '../../src';
import test from 'ava';

const jsonFilePath = path.resolve(__dirname, './data.json');

test('fromJson should works correctly', async t => {
  const file = await fsp.readFile(jsonFilePath);
  const json = JSON.parse(file.toString());

  const table = PrettyTable.fromJson(json).toString();
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

  t.is(table, expectedTable);
});

test('toJson should works correctly', async t => {
  const table = new PrettyTable();

  table.setHeader(['name', 'age', 'city']);

  table.addRows([
    ['john', 22, 'new york'],
    ['elizabeth', 43, 'chicago'],
    ['bill', 31, 'atlanta'],
    ['mary', 18, 'los angeles'],
  ]);

  const json = table.toJson();
  const expectedJson = await fsp.readFile(jsonFilePath);

  t.deepEqual(json, JSON.parse(expectedJson.toString()));
});

test('toJson should throw an error if header not defined', t => {
  const table = new PrettyTable();

  table.addRow(['test']);

  t.throws(table.toJson.bind(table));
});
