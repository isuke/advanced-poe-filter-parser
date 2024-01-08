# Advanced PoE Filter Parser [![Test and Lint](https://github.com/isuke/advanced-poe-filter-parser/actions/workflows/main.yml/badge.svg)](https://github.com/isuke/advanced-poe-filter-parser/actions/workflows/main.yml) [![git-consistent friendly](https://img.shields.io/badge/git--consistent-friendly-brightgreen.svg)](https://github.com/isuke/git-consistent) [![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/isuke/advanced-poe-filter-parser/main/LICENSE) [![npm](https://img.shields.io/npm/v/advanced-poe-filter-parser.svg)](https://www.npmjs.com/package/advanced-poe-filter-parser)

Advanced PoE Filter is used by [Filter of Kalandra](https://filter-of-kalandra.netlify.com/).

## Usage

```js
import { parse, SyntaxError } from "advanced-poe-filter-parser"

const script = [
'Show "Map Section"'
'    Class "Maps"'
'    MapTier > 3'
'    SetBorderColor 250 251 252'
'    PlayAlertSound 1 300'
''
'    Fork "Rarity"'
'        Show "Rare"'
'            Rarity Rare'
'            SetBackgroundColor 255 0 0 100'
''
'        Hide "Magic"'
'            Rarity Magic'
''
].join('\n')

const object = parse(script)
  // [
  //   {
  //     id: '0003',
  //     name: 'Map Section',
  //     activity: 'Show',
  //     conditions: {
  //       Class: { ope: '=', vals: ['Maps'] },
  //       MapTier: { ope: '>', val: 3 },
  //     },
  //     actions: {
  //       SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
  //       PlayAlertSound: { id: '1', volume: 300 },
  //     },
  //     branches: [
  //       {
  //         name: 'Rarity',
  //         type: 'Fork',
  //         blocks: [
  //           {
  //             id: '0001',
  //             name: 'Rare',
  //             activity: 'Show',
  //             conditions: {
  //               Rarity: { ope: '=', val: 'Rare' },
  //             },
  //             actions: { SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 } },
  //             branches: [],
  //             location: {
  //               start: { line: 8, column: 9, offset: 135 },
  //               end: { line: 12, column: 1, offset: 215 },
  //               source: undefined,
  //             },
  //           },
  //           {
  //             id: '0002',
  //             name: 'Magic',
  //             activity: 'Hide',
  //             conditions: {
  //               Rarity: { ope: '=', val: 'Magic' },
  //             },
  //             actions: {},
  //             branches: [],
  //             location: {
  //               start: { line: 12, column: 9, offset: 223 },
  //               end: { line: 14, column: 1, offset: 261 },
  //               source: undefined,
  //             },
  //           },
  //         ],
  //         location: {
  //           start: { line: 7, column: 5, offset: 113 },
  //           end: { line: 14, column: 1, offset: 261 },
  //           source: undefined,
  //         },
  //       },
  //     ],
  //     location: {
  //       start: { line: 1, column: 1, offset: 0 },
  //       end: { line: 14, column: 1, offset: 261 },
  //       source: undefined,
  //     },
  //   },
  // ]
```
