import { PrettyTable } from '../../src';
import test from 'ava';

test('PrettyTable should be defined', t => {
  t.true(!!PrettyTable);
});

test('common use case should works', t => {
  const prettyTable = new PrettyTable();

  prettyTable.setHeader(['City name', 'Area', 'Population', 'ann']);

  prettyTable.addRow(['Adelaide', 1295, 1158259, 600.5]);
  prettyTable.addRow(['Brisbane', 5905, 1857594, 1146.4]);
  prettyTable.addRow(['Darwin', 112, 120900, 1714.7]);
  prettyTable.addRow(['Hobart', 1357, 205556, 619.5]);
  prettyTable.addRow(['Sydney', 2058, 4336374, 1214.8]);
  prettyTable.addRow(['Melbourne', 1566, 3806092, 646.9]);
  prettyTable.addRow(['Perth', 5386, 1554769, 869.4]);

  const resultTable = prettyTable.toString();
  const expectedTable = `
+-----------+------+------------+--------+
| City name | Area | Population | ann    |
+-----------+------+------------+--------+
| Adelaide  | 1295 | 1158259    | 600.5  |
| Brisbane  | 5905 | 1857594    | 1146.4 |
| Darwin    | 112  | 120900     | 1714.7 |
| Hobart    | 1357 | 205556     | 619.5  |
| Sydney    | 2058 | 4336374    | 1214.8 |
| Melbourne | 1566 | 3806092    | 646.9  |
| Perth     | 5386 | 1554769    | 869.4  |
+-----------+------+------------+--------+
  `.trim();

  t.is(resultTable, expectedTable);
});

test('deleteRow shoud works', t => {
  const prettyTable = new PrettyTable();

  prettyTable.setHeader(['City name', 'Area', 'Population', 'ann']);

  prettyTable.addRow(['Adelaide', 1295, 1158259, 600.5]);
  prettyTable.addRow(['Brisbane', 5905, 1857594, 1146.4]);
  prettyTable.addRow(['Darwin', 112, 120900, 1714.7]);
  prettyTable.addRow(['Hobart', 1357, 205556, 619.5]);
  prettyTable.addRow(['Krung Thep Maha Nakhon', 1568, 10539, 812]);
  prettyTable.addRow(['Sydney', 2058, 4336374, 1214.8]);
  prettyTable.addRow(['Melbourne', 1566, 3806092, 646.9]);
  prettyTable.addRow(['Perth', 5386, 1554769, 869.4]);

  prettyTable.deleteRow(4);

  const resultTable = prettyTable.toString();
  const expectedTable = `
+-----------+------+------------+--------+
| City name | Area | Population | ann    |
+-----------+------+------------+--------+
| Adelaide  | 1295 | 1158259    | 600.5  |
| Brisbane  | 5905 | 1857594    | 1146.4 |
| Darwin    | 112  | 120900     | 1714.7 |
| Hobart    | 1357 | 205556     | 619.5  |
| Sydney    | 2058 | 4336374    | 1214.8 |
| Melbourne | 1566 | 3806092    | 646.9  |
| Perth     | 5386 | 1554769    | 869.4  |
+-----------+------+------------+--------+
  `.trim();

  t.is(resultTable, expectedTable);
});

test('from method should works', t => {
  const header = ['name', 'age', 'city'];

  const rows = [
    ['john', 22, 'new york'],
    ['elizabeth', 43, 'chicago'],
    ['bill', 31, 'atlanta'],
    ['mary', 18, 'los angeles'],
  ];

  const table = PrettyTable.from(header, rows).toString();
  const expectTable = `
+-----------+-----+-------------+
| name      | age | city        |
+-----------+-----+-------------+
| john      | 22  | new york    |
| elizabeth | 43  | chicago     |
| bill      | 31  | atlanta     |
| mary      | 18  | los angeles |
+-----------+-----+-------------+
  `.trim();

  t.is(table, expectTable);
});

test('clone should works correctly', t => {
  const originalTable = new PrettyTable();

  originalTable.addRow(['test1']);

  const clonedTable = originalTable.clone();

  originalTable.deleteRow(0);

  t.notDeepEqual(originalTable, clonedTable);
});

test('getRow should works correctly', t => {
  const table = PrettyTable.from(null, [['1'], [2]], null);

  const row = table.getRow(1);

  t.deepEqual([2], row);
});

test('getFooter should works correctly', t => {
  const table = PrettyTable.from(null, null, [1, 2, 3]);

  t.deepEqual(table.getFooter(), [1, 2, 3]);
});

test('getHeader should works correctly', t => {
  const table = PrettyTable.from(['test', 'header']);

  t.deepEqual(table.getHeader(), ['test', 'header']);
});

test('from should create empty table', t => {
  const originalTable = PrettyTable.from();
  const sameTable = new PrettyTable();

  t.deepEqual(originalTable, sameTable);
});
