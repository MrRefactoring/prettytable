<div align="center">
  <img style="margin-top: 48px" alt="PrettyTable.js logo" src="https://svgshare.com/i/jBH.svg"/>

  <a href="https://www.npmjs.com/package/prettytable.js"><img alt="NPM version" src="https://img.shields.io/npm/v/prettytable.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/prettytable.js"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/prettytable.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/prettytable.js"><img alt="build status" src="https://img.shields.io/github/workflow/status/mrrefactoring/prettytable.js/Build?style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/prettytable.js/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/prettytable.js?color=green&style=flat-square"/></a>

  <span>JavaScript / TypeScript library for Node.JS and browsers to easily creating ASCII tables</span>
</div>

## About

Creates ASCII tables from multiple data sources.
The table can be populated by adding table rows one by one, by multiple, from a CSV file or from a JSON file.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Table methods](#table-methods)
    - [getHeader](#getheader)
    - [setHeader](#setheader)
    - [getFooter](#getfooter)
    - [setFooter](#setfooter)
    - [getRows](#getrows)
    - [getRow](#getrow)
    - [addRows](#addrows)
    - [addRow](#addrow)
    - [deleteRow](#deleterow)
    - [toString](#tostring)
    - [toCsv](#tocsv)
    - [toJson](#tojson)
    - [clone](#clone)
    - [static from](#static-from)
    - [static fromCsv](#static-fromcsv)
    - [static fromJson](#static-fromjson)
- [License](#license)

## Installation

**Node.js 14.0.0 or newer supported.**

Install with the npm:

```bash
npm install prettytable.js
```

Install with the yarn:

```bash
yarn add prettytable.js
```

## Usage

Working with PrettyTable.js you can start from follow small code snippet:

```ts
import { PrettyTable } from 'prettytable.js';

const table = new PrettyTable();

table.setHeader(['Name', 'Age', 'City']);

table.addRows([
  ['John', 22, 'New York'],
  ['Elizabeth', 43, 'Chicago'],
  ['Bill', 31, 'Atlanta'],
  ['Mary', 18, 'Los Angeles'],
]);

console.log(table.toString());
```

This gives you the following table on console:

```markdown
+-----------+-----+-------------+
| Name      | Age | City        |
+-----------+-----+-------------+
| John      | 22  | New York    |
| Elizabeth | 43  | Chicago     |
| Bill      | 31  | Atlanta     |
| Mary      | 18  | Los Angeles |
+-----------+-----+-------------+
```

### Table methods

###### Note

```ts
type Cell = string | number | null | undefined;
```

#### getHeader

Gets header of the table.

```ts
table.getHeader();
```

```ts
() => Cell[];
```

#### setHeader

Sets header to the table.

```ts
table.setHeader(['Name', 'Age', 'City']);
```

```ts
(header: Cell[]) => void;
```

| Argument | Required | Description                           |
|----------|----------|---------------------------------------|
| `header` | Yes      | The header to be settled to the table |

#### getFooter

Gets footer of the table.

```ts
table.getFooter();
```

```ts
() => Cell[];
```

#### setFooter

Sets header to the table.

```ts
table.setFooter(['Name', 'Age', 'City']);
```

```ts
(footer: Cell[]) => void;
```

| Argument | Required | Description                           |
|----------|----------|---------------------------------------|
| `footer` | Yes      | The footer to be settled to the table |


#### getRows

Gets all rows of the table.

```ts
table.getRows();
```

```ts
() => Cell[][];
```

#### getRow

Gets row of the table.

```ts
table.getRow(index);
```

```ts
(index: number) => Cell[];
```

| Argument | Required | Description          |
|----------|----------|----------------------|
| `index`  | Yes      | The index of the row |

#### addRows

Adds list of rows to the table.

```ts
table.addRows([
  ['first row', 'value'],
  ['second row', 'value'],
]);
```

```ts
(rows: Cell[][]) => void;
```

| Argument | Required | Description      |
|----------|----------|------------------|
| `rows`   | Yes      | The list of rows |

#### addRow

Adds row to the table.

```ts
table.addRow(['first row', 'value']);
```

```ts
(row: Cell[]) => void;
```

| Argument | Required | Description |
|----------|----------|-------------|
| `row`    | Yes      | The row     |

#### deleteRow

Deletes row from table.

```ts
table.deleteRow(4);
```

```ts
(index: number) => void;
```

| Argument | Required | Description                |
|----------|----------|----------------------------|
| `index`  | Yes      | The row index for deletion |

#### toString

Converts table to string representation.

```ts
table.toString();
```

```ts
() => string;
```

#### toCsv

Converts table to CSV representation.

```ts
table.toCsv();
```

```ts
() => string;
```

#### toJson

Converts table to JSON representation.

```ts
table.toJson();
```

```ts
() => Record<string | number, Cell>[];
```

#### clone

Clones table.

```ts
table.clone();
```

```ts
() => PrettyTable;
```

#### static from

Creates table from arguments.

```ts
const table = PrettyTable.from(
  ['header 1', 'header 2'],
  [ ['row 1', 'row 1'] ],
  ['footer 1', 'footer 1'],
);
```

```ts
(
  header?: Cell[] | null,
  rows?: Cell[][] | null,
  footer?: Cell[] | null,
) => PrettyTable;
```

| Argument | Required | Default | Description             |
|----------|----------|---------|-------------------------|
| `header` | No       | `null`  | The header of the table |
| `rows`   | No       | `null`  | The list of table rows  |
| `footer` | No       | `null`  | The footer of the table |

#### static fromCsv

Creates table from CSV.

```ts
const table = PrettyTable.fromCsv(csvFile, { header: true });
```

```ts
(file: string | Buffer, options?: { header?: boolean; footer?: boolean; }) => PrettyTable;
```

| Argument  | Required | Default                           | Description              |
|-----------|----------|-----------------------------------|--------------------------|
| `file`    | Yes      | N\A                               | The content of CSV       |
| `options` | No       | `{ header: true, footer: false }` | The options of CSV table |

#### static fromJson

Creates table from JSON.

```ts
const table = PrettyTable.fromJson([
  {
    "name": "john",
    "age": 22,
    "city": "new york"
  },
  {
    "name": "elizabeth",
    "age": 43,
    "city": "chicago"
  },
  {
    "name": "bill",
    "age": 31,
    "city": "atlanta"
  },
  {
    "name": "mary",
    "age": 18,
    "city": "los angeles"
  }
]);
```

```ts
(json: Record<string | number, Cell>[]) => PrettyTable;
```

| Argument | Required | Description         |
|----------|----------|---------------------|
| `json`   | Yes      | The content of JSON |

## License

Distributed under the MIT License. See `LICENSE` for more information.
