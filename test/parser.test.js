import test from 'ava'
import outdent from 'outdent'

import { parse } from '../lib/parser'

test('parse : blank and comment lines', (t) => {
  const script = [
    '# This is a comment',
    '# This is a comment',
    'Hide "Hide Map Section"',
    '    Class "Maps"',
    '    MapTier <= 4',
    '                 ',
    '# This is a comment',
    'Show "Flask Section"',
    '    # This is a comment',
    '    Class "Life Flasks" "Mana Flasks" "Hybrid Flasks"',
    '    SetBorderColor 250 251 252',
    '    PlayAlertSound 1 300',
    '                         ',
    'Hide "Remain Section"',
    '',
  ].join('\n')

  const expected = [
    {
      id: '0001',
      name: 'Hide Map Section',
      activity: 'Hide',
      conditions: {
        Class: { ope: '=', vals: ['Maps'] },
        MapTier: '<= 4',
      },
      actions: {},
      branches: [],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 8,
          column: 1,
          offset: 136,
        },
      },
    },
    {
      id: '0001',
      name: 'Flask Section',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Life Flasks', 'Mana Flasks', 'Hybrid Flasks'] },
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: '1', volume: 300 },
      },
      branches: [],
      location: {
        start: {
          line: 8,
          column: 1,
          offset: 136,
        },
        end: {
          line: 14,
          column: 1,
          offset: 317,
        },
      },
    },
    {
      id: '0001',
      name: 'Remain Section',
      activity: 'Hide',
      conditions: {},
      actions: {},
      branches: [],
      location: {
        start: {
          line: 14,
          column: 1,
          offset: 317,
        },
        end: {
          line: 15,
          column: 1,
          offset: 339,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})

test('parse : all actions and conditions', (t) => {
  const script = outdent`
Show "Section1"
    Class          "Maps"
    BaseType       "Sacrificial Garb"
    DropLevel      > 85
    ItemLevel      >= 70
    AreaLevel      < 30
    GemLevel       = 10
    GemQualityType "Superior"
    StackSize      < 11
    MapTier        <= 12
    Quality        = 15
    LinkedSockets  = 6
    Sockets        = 5
    SocketGroup    RGB
    Rarity         = Rare
    BaseDefencePercentile > 50
    BaseArmour       > 40
    BaseEnergyShield > 41
    BaseEvasion      > 42
    BaseWard         > 43
    FracturedItem  False
    SynthesisedItem False
    Corrupted      True
    Mirrored       True
    Identified     True
    Scourged       True
    ShapedMap      True
    ElderMap       True
    BlightedMap    True
    UberBlightedMap True
    Height         > 1
    Width          > 2
    CorruptedMods  >= 1
    EnchantmentPassiveNum > 5
    HasExplicitMod "Foo" "Bar"
    HasEaterOfWorldsImplicit >= 4
    HasSearingExarchImplicit >= 4
    AnyEnchantment True
    HasEnchantment "Foo" "Bar"
    HasInfluence "Shaper" "Elder"
    EnchantmentPassiveNode "Damage while you have a Herald" "Projectile Damage"
    AlternateQuality True
    Replica True
    SetBorderColor           100 101 102
    SetTextColor             103 104 105
    SetBackgroundColor       106 107 108
    SetFontSize              30
    PlayAlertSound           16 300
    EnableDropSound
    CustomAlertSound         "C\\foobar\\sound.mp3" 300
    MinimapIcon              0 Red Circle
    PlayEffect               Red
Show "Section2"
    Class          "Life Flasks" "Mana Flasks" "Hybrid Flasks"
    BaseType       "Two-Toned Boots" "Spiked Gloves" "Gripped Gloves" "Fingerless Silk Gloves" "Bone Helmet"
    SocketGroup    W
    Rarity         Rare
    HasExplicitMod == "Foo" "Bar"
    HasEnchantment == "Foo" "Bar"
    HasInfluence   == "Shaper" "Elder"
    SetBorderColor           100 101 102 200
    SetTextColor             103 104 105 201
    SetBackgroundColor       106 107 108 202
    PlayAlertSound           2
    DisableDropSound
    CustomAlertSound         "C\\foobar\\sound.mp3"
    MinimapIcon              Medium Red Circle
    PlayEffect               Blue Temp
Show "Section3"
    HasExplicitMod >= 2 "Foo" "Bar"
    HasEnchantment >= 2 "Foo" "Bar"
    HasInfluence None
    SetBorderColor           Negate()
    SetTextColor             Grayscale()
    SetBackgroundColor       Lighten(10%)
    SetFontSize              Plus(5)
    PlayAlertSoundPositional ShAlchemy 200
Ignore "Section4"
    SetBorderColor           Darken(20%)
    SetTextColor             Whiten(31%)
    SetBackgroundColor       Blacken(100%)
    SetFontSize              Minus(6)
    PlayAlertSoundPositional ShBlessed
Hide "Section5"
    SetBorderColor           Saturate(42%)
    SetTextColor             Desaturate(53%)
    SetBackgroundColor       Hex(123)
Unset "Section6"
    SetBorderColor           Saturation(64%)
    SetTextColor             Lightness(75%)

   `

  const expected = [
    {
      id: '0001',
      name: 'Section1',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Maps'] },
        BaseType: { ope: '=', vals: ['Sacrificial Garb'] },
        DropLevel: '> 85',
        ItemLevel: '>= 70',
        AreaLevel: '< 30',
        GemLevel: '= 10',
        GemQualityType: { ope: '=', vals: ['Superior'] },
        StackSize: '< 11',
        MapTier: '<= 12',
        Quality: '= 15',
        LinkedSockets: '= 6',
        Sockets: '= 5',
        SocketGroup: 'RGB',
        Rarity: '= Rare',
        BaseDefencePercentile: '> 50',
        BaseArmour: '> 40',
        BaseEnergyShield: '> 41',
        BaseEvasion: '> 42',
        BaseWard: '> 43',
        FracturedItem: false,
        SynthesisedItem: false,
        Corrupted: true,
        Mirrored: true,
        Identified: true,
        Scourged: true,
        ShapedMap: true,
        ElderMap: true,
        BlightedMap: true,
        UberBlightedMap: true,
        Height: '> 1',
        Width: '> 2',
        CorruptedMods: '>= 1',
        EnchantmentPassiveNum: '> 5',
        HasExplicitMod: { ope: '=', vals: ['Foo', 'Bar'] },
        HasEaterOfWorldsImplicit: '>= 4',
        HasSearingExarchImplicit: '>= 4',
        AnyEnchantment: true,
        HasEnchantment: { ope: '=', vals: ['Foo', 'Bar'] },
        HasInfluence: { ope: '=', vals: ['Shaper', 'Elder'] },
        EnchantmentPassiveNode: { ope: '=', vals: ['Damage while you have a Herald', 'Projectile Damage'] },
        AlternateQuality: true,
        Replica: true,
      },
      actions: {
        SetBorderColor: { rgb: { r: 100, g: 101, b: 102 }, alpha: 255 },
        SetTextColor: { rgb: { r: 103, g: 104, b: 105 }, alpha: 255 },
        SetBackgroundColor: { rgb: { r: 106, g: 107, b: 108 }, alpha: 255 },
        SetFontSize: 30,
        PlayAlertSound: { id: '16', volume: 300 },
        EnableDropSound: true,
        CustomAlertSound: { filePath: 'C\\foobar\\sound.mp3', volume: 300 },
        MinimapIcon: { size: 'Largest', color: 'Red', shape: 'Circle' },
        PlayEffect: { color: 'Red', temp: false },
      },
      branches: [],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 53,
          column: 1,
          offset: 1505,
        },
      },
    },
    {
      id: '0001',
      name: 'Section2',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Life Flasks', 'Mana Flasks', 'Hybrid Flasks'] },
        BaseType: { ope: '=', vals: ['Two-Toned Boots', 'Spiked Gloves', 'Gripped Gloves', 'Fingerless Silk Gloves', 'Bone Helmet'] },
        SocketGroup: 'W',
        Rarity: 'Rare',
        HasExplicitMod: { ope: '==', vals: ['Foo', 'Bar'] },
        HasEnchantment: { ope: '==', vals: ['Foo', 'Bar'] },
        HasInfluence: { ope: '==', vals: ['Shaper', 'Elder'] },
      },
      actions: {
        SetBorderColor: { rgb: { r: 100, g: 101, b: 102 }, alpha: 200 },
        SetTextColor: { rgb: { r: 103, g: 104, b: 105 }, alpha: 201 },
        SetBackgroundColor: { rgb: { r: 106, g: 107, b: 108 }, alpha: 202 },
        PlayAlertSound: { id: '2', volume: undefined },
        DisableDropSound: true,
        CustomAlertSound: { filePath: 'C\\foobar\\sound.mp3', volume: undefined },
        MinimapIcon: { size: 'Medium', color: 'Red', shape: 'Circle' },
        PlayEffect: { color: 'Blue', temp: true },
      },
      branches: [],
      location: {
        start: {
          line: 53,
          column: 1,
          offset: 1505,
        },
        end: {
          line: 69,
          column: 1,
          offset: 2168,
        },
      },
    },
    {
      id: '0001',
      name: 'Section3',
      activity: 'Show',
      conditions: {
        HasExplicitMod: { numeric: { ope: '>=', val: 2 }, vals: ['Foo', 'Bar'] },
        HasEnchantment: { numeric: { ope: '>=', val: 2 }, vals: ['Foo', 'Bar'] },
        HasInfluence: { ope: undefined, val: 'None' },
      },
      actions: {
        SetBorderColor: { function: 'Negate', val: undefined },
        SetTextColor: { function: 'Grayscale', val: undefined },
        SetBackgroundColor: { function: 'Lighten', val: 0.1 },
        SetFontSize: { function: 'Plus', val: 5 },
        PlayAlertSoundPositional: { id: 'ShAlchemy', volume: 200 },
      },
      branches: [],
      location: {
        start: {
          line: 69,
          column: 1,
          offset: 2168,
        },
        end: {
          line: 78,
          column: 1,
          offset: 2479,
        },
      },
    },
    {
      id: '0001',
      name: 'Section4',
      activity: 'Ignore',
      conditions: {},
      actions: {
        SetBorderColor: { function: 'Darken', val: 0.2 },
        SetTextColor: { function: 'Whiten', val: 0.31 },
        SetBackgroundColor: { function: 'Blacken', val: 1 },
        SetFontSize: { function: 'Minus', val: 6 },
        PlayAlertSoundPositional: { id: 'ShBlessed', volume: undefined },
      },
      branches: [],
      location: {
        start: {
          line: 78,
          column: 1,
          offset: 2479,
        },
        end: {
          line: 84,
          column: 1,
          offset: 2699,
        },
      },
    },
    {
      id: '0001',
      name: 'Section5',
      activity: 'Hide',
      conditions: {},
      actions: {
        SetBorderColor: { function: 'Saturate', val: 0.42 },
        SetTextColor: { function: 'Desaturate', val: 0.53 },
        SetBackgroundColor: { function: 'Hex', val: 123 },
      },
      branches: [],
      location: {
        start: {
          line: 84,
          column: 1,
          offset: 2699,
        },
        end: {
          line: 88,
          column: 1,
          offset: 2841,
        },
      },
    },
    {
      id: '0001',
      name: 'Section6',
      activity: 'Unset',
      conditions: {},
      actions: {
        SetBorderColor: { function: 'Saturationv', val: 64 },
        SetTextColor: { function: 'Lightness', val: 75 },
      },
      branches: [],
      location: {
        start: {
          line: 88,
          column: 1,
          offset: 2841,
        },
        end: {
          line: 91,
          column: 1,
          offset: 2947,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})

test('parse : empty section', (t) => {
  const script = outdent`
Hide "All Section"

   `

  const expected = [
    {
      id: '0001',
      name: 'All Section',
      activity: 'Hide',
      conditions: {},
      actions: {},
      branches: [],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 2,
          column: 1,
          offset: 19,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})

test('parse : single section', (t) => {
  const script = outdent`
Show "Map Section"
    Class "Maps"
    MapTier > 3
    SetBorderColor 250 251 252
    PlayAlertSound 1 300

   `

  const expected = [
    {
      id: '0001',
      name: 'Map Section',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Maps'] },
        MapTier: '> 3',
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: '1', volume: 300 },
      },
      branches: [],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 6,
          column: 1,
          offset: 108,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})

test('parse : multi section', (t) => {
  const script = outdent`
Hide "Hide Map Section"
    Class "Maps"
    MapTier <= 4

Show "Flask Section"
    Class "Life Flasks" "Mana Flasks" "Hybrid Flasks"
    SetBorderColor 250 251 252
    PlayAlertSound 1 300

Hide "Remain Section"

   `

  const expected = [
    {
      id: '0001',
      name: 'Hide Map Section',
      activity: 'Hide',
      conditions: {
        Class: { ope: '=', vals: ['Maps'] },
        MapTier: '<= 4',
      },
      actions: {},
      branches: [],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 5,
          column: 1,
          offset: 59,
        },
      },
    },
    {
      id: '0001',
      name: 'Flask Section',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Life Flasks', 'Mana Flasks', 'Hybrid Flasks'] },
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: '1', volume: 300 },
      },
      branches: [],
      location: {
        start: {
          line: 5,
          column: 1,
          offset: 59,
        },
        end: {
          line: 10,
          column: 1,
          offset: 191,
        },
      },
    },
    {
      id: '0001',
      name: 'Remain Section',
      activity: 'Hide',
      conditions: {},
      actions: {},
      branches: [],
      location: {
        start: {
          line: 10,
          column: 1,
          offset: 191,
        },
        end: {
          line: 11,
          column: 1,
          offset: 213,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})

test('parse : single fork', (t) => {
  const script = outdent`
Show "Map Section"
    Class "Maps"
    MapTier > 3
    SetBorderColor 250 251 252
    PlayAlertSound 1 300

    Fork "Rarity"
        Show "Rare"
            Rarity Rare
            SetBackgroundColor 255 0 0 100

        Hide "Magic"
            Rarity Magic

   `

  const expected = [
    {
      id: '0003',
      name: 'Map Section',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Maps'] },
        MapTier: '> 3',
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: '1', volume: 300 },
      },
      branches: [
        {
          name: 'Rarity',
          type: 'Fork',
          blocks: [
            {
              id: '0001',
              name: 'Rare',
              activity: 'Show',
              conditions: { Rarity: 'Rare' },
              actions: { SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 } },
              branches: [],
              location: {
                start: {
                  line: 8,
                  column: 9,
                  offset: 135,
                },
                end: {
                  line: 12,
                  column: 1,
                  offset: 215,
                },
              },
            },
            {
              id: '0002',
              name: 'Magic',
              activity: 'Hide',
              conditions: { Rarity: 'Magic' },
              actions: {},
              branches: [],
              location: {
                start: {
                  line: 12,
                  column: 9,
                  offset: 223,
                },
                end: {
                  line: 14,
                  column: 1,
                  offset: 261,
                },
              },
            },
          ],
          location: {
            start: {
              line: 7,
              column: 5,
              offset: 113,
            },
            end: {
              line: 14,
              column: 1,
              offset: 261,
            },
          },
        },
      ],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 14,
          column: 1,
          offset: 261,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})

test('parse : single mixin', (t) => {
  const script = outdent`
Show "Map Section"
    Class "Maps"
    MapTier > 3
    SetBorderColor 250 251 252
    PlayAlertSound 1 300

    Mixin "Rarity"
        Show "Rare"
            Rarity Rare
            SetBackgroundColor 255 0 0 100

        Hide "Magic"
            Rarity Magic

   `

  const expected = [
    {
      id: '0003',
      name: 'Map Section',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Maps'] },
        MapTier: '> 3',
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: '1', volume: 300 },
      },
      branches: [
        {
          name: 'Rarity',
          type: 'Mixin',
          blocks: [
            {
              id: '0001',
              name: 'Rare',
              activity: 'Show',
              conditions: { Rarity: 'Rare' },
              actions: { SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 } },
              branches: [],
              location: {
                start: {
                  line: 8,
                  column: 9,
                  offset: 136,
                },
                end: {
                  line: 12,
                  column: 1,
                  offset: 216,
                },
              },
            },
            {
              id: '0002',
              name: 'Magic',
              activity: 'Hide',
              conditions: { Rarity: 'Magic' },
              actions: {},
              branches: [],
              location: {
                start: {
                  line: 12,
                  column: 9,
                  offset: 224,
                },
                end: {
                  line: 14,
                  column: 1,
                  offset: 262,
                },
              },
            },
          ],
          location: {
            start: {
              line: 7,
              column: 5,
              offset: 113,
            },
            end: {
              line: 14,
              column: 1,
              offset: 262,
            },
          },
        },
      ],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 14,
          column: 1,
          offset: 262,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})

test('parse : multi mixin', (t) => {
  const script = outdent`
Show "Map Section"
    Class "Maps"

    Mixin "Rarity"
        Show "Rare"
            Rarity Rare
            SetBackgroundColor 255 0 0 100

        Hide "Magic"
            Rarity Magic

    Mixin "Tier"
        Show "High Tier"
            MapTier >= 11
            PlayAlertSound  1 300

        Show "Middle Tier"
            MapTier >=  6
            PlayAlertSound 2 300

   `

  const expected = [
    {
      id: '0005',
      name: 'Map Section',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Maps'] },
      },
      actions: {},
      branches: [
        {
          name: 'Rarity',
          type: 'Mixin',
          blocks: [
            {
              id: '0001',
              name: 'Rare',
              activity: 'Show',
              conditions: { Rarity: 'Rare' },
              actions: { SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 } },
              branches: [],
              location: {
                start: {
                  line: 5,
                  column: 9,
                  offset: 64,
                },
                end: {
                  line: 9,
                  column: 1,
                  offset: 144,
                },
              },
            },
            {
              id: '0002',
              name: 'Magic',
              activity: 'Hide',
              conditions: { Rarity: 'Magic' },
              actions: {},
              branches: [],
              location: {
                start: {
                  line: 9,
                  column: 9,
                  offset: 152,
                },
                end: {
                  line: 12,
                  column: 1,
                  offset: 191,
                },
              },
            },
          ],
          location: {
            start: {
              line: 4,
              column: 5,
              offset: 41,
            },
            end: {
              line: 12,
              column: 1,
              offset: 191,
            },
          },
        },
        {
          name: 'Tier',
          type: 'Mixin',
          blocks: [
            {
              id: '0003',
              name: 'High Tier',
              activity: 'Show',
              conditions: { MapTier: '>= 11' },
              actions: { PlayAlertSound: { id: '1', volume: 300 } },
              branches: [],
              location: {
                start: {
                  line: 13,
                  column: 9,
                  offset: 216,
                },
                end: {
                  line: 17,
                  column: 1,
                  offset: 294,
                },
              },
            },
            {
              id: '0004',
              name: 'Middle Tier',
              activity: 'Show',
              conditions: { MapTier: '>= 6' },
              actions: { PlayAlertSound: { id: '2', volume: 300 } },
              branches: [],
              location: {
                start: {
                  line: 17,
                  column: 9,
                  offset: 302,
                },
                end: {
                  line: 20,
                  column: 1,
                  offset: 380,
                },
              },
            },
          ],
          location: {
            start: {
              line: 12,
              column: 5,
              offset: 195,
            },
            end: {
              line: 20,
              column: 1,
              offset: 380,
            },
          },
        },
      ],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 20,
          column: 1,
          offset: 380,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})

test('parse : nested mixin', (t) => {
  const script = outdent`
Show "Map Section"
    Class "Maps"

    Mixin "Rarity"
        Show "Rare"
            Rarity Rare
            SetBackgroundColor 255 0 0 100

        Hide "Magic"
            Rarity Magic

            Mixin "Tier"
                Show "High Tier"
                    MapTier >= 11
                    PlayAlertSound  1 300

                Show "Middle Tier"
                    MapTier >=  6
                    PlayAlertSound 2 300

   `

  const expected = [
    {
      id: '0005',
      name: 'Map Section',
      activity: 'Show',
      conditions: {
        Class: { ope: '=', vals: ['Maps'] },
      },
      actions: {},
      branches: [
        {
          name: 'Rarity',
          type: 'Mixin',
          blocks: [
            {
              id: '0001',
              name: 'Rare',
              activity: 'Show',
              conditions: { Rarity: 'Rare' },
              actions: { SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 } },
              branches: [],
              location: {
                start: {
                  line: 5,
                  column: 9,
                  offset: 64,
                },
                end: {
                  line: 9,
                  column: 1,
                  offset: 144,
                },
              },
            },
            {
              id: '0004',
              name: 'Magic',
              activity: 'Hide',
              conditions: { Rarity: 'Magic' },
              actions: {},
              branches: [
                {
                  name: 'Tier',
                  type: 'Mixin',
                  blocks: [
                    {
                      id: '0002',
                      name: 'High Tier',
                      activity: 'Show',
                      conditions: { MapTier: '>= 11' },
                      actions: { PlayAlertSound: { id: '1', volume: 300 } },
                      branches: [],
                      location: {
                        start: {
                          line: 13,
                          column: 17,
                          offset: 232,
                        },
                        end: {
                          line: 17,
                          column: 1,
                          offset: 326,
                        },
                      },
                    },
                    {
                      id: '0003',
                      name: 'Middle Tier',
                      activity: 'Show',
                      conditions: { MapTier: '>= 6' },
                      actions: { PlayAlertSound: { id: '2', volume: 300 } },
                      branches: [],
                      location: {
                        start: {
                          line: 17,
                          column: 17,
                          offset: 342,
                        },
                        end: {
                          line: 20,
                          column: 1,
                          offset: 436,
                        },
                      },
                    },
                  ],
                  location: {
                    start: {
                      line: 12,
                      column: 13,
                      offset: 203,
                    },
                    end: {
                      line: 20,
                      column: 1,
                      offset: 436,
                    },
                  },
                },
              ],
              location: {
                start: {
                  line: 9,
                  column: 9,
                  offset: 152,
                },
                end: {
                  line: 20,
                  column: 1,
                  offset: 436,
                },
              },
            },
          ],
          location: {
            start: {
              line: 4,
              column: 5,
              offset: 41,
            },
            end: {
              line: 20,
              column: 1,
              offset: 436,
            },
          },
        },
      ],
      location: {
        start: {
          line: 1,
          column: 1,
          offset: 0,
        },
        end: {
          line: 20,
          column: 1,
          offset: 436,
        },
      },
    },
  ]

  const result = parse(script)

  t.deepEqual(result, expected)
})
