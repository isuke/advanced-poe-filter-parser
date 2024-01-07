import test from "ava"
import outdent from "outdent"

import { parse } from "../lib/parser.mjs"

test("parse : blank and comment lines", (t) => {
  const script = [
    "# This is a comment",
    "# This is a comment",
    'Hide "Hide Map Section"',
    '    Class "Maps"',
    "    MapTier <= 4",
    "                 ",
    "# This is a comment",
    'Show "Flask Section"',
    "    # This is a comment",
    '    Class "Life Flasks" "Mana Flasks" "Hybrid Flasks"',
    "    SetBorderColor 250 251 252",
    "    PlayAlertSound 1 300",
    "                         ",
    'Hide "Remain Section"',
    "",
  ].join("\n")

  const expected = [
    {
      id: "0001",
      name: "Hide Map Section",
      activity: "Hide",
      conditions: {
        Class: { ope: "=", vals: ["Maps"] },
        MapTier: { ope: "<=", val: 4 },
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
      id: "0001",
      name: "Flask Section",
      activity: "Show",
      conditions: {
        Class: { ope: "=", vals: ["Life Flasks", "Mana Flasks", "Hybrid Flasks"] },
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: "1", volume: 300 },
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
      id: "0001",
      name: "Remain Section",
      activity: "Hide",
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

test("parse : all actions and conditions", (t) => {
  const script = outdent`
Show "Section1"
    Class          "Maps"
    BaseType       "Sacrificial Garb"
    DropLevel      > 85
    ItemLevel      >= 70
    AreaLevel      < 30
    GemLevel       = 10
    TransfiguredGem True
    StackSize      < 11
    MapTier        <= 12
    Quality        = 15
    LinkedSockets  = 6
    Sockets        >= 5RGBWAD
    SocketGroup    >= 5RGBWAD
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
    HasImplicitMod True
    HasEaterOfWorldsImplicit >= 4
    HasSearingExarchImplicit >= 4
    AnyEnchantment True
    HasEnchantment "Foo" "Bar"
    HasInfluence "Shaper" "Elder"
    EnchantmentPassiveNode "Damage while you have a Herald" "Projectile Damage"
    Replica True
    SetBorderColor           100 101 102
    SetTextColor             103 104 105
    SetBackgroundColor       106 107 108
    SetFontSize              30
    PlayAlertSound           16 300
    CustomAlertSound         "C\\foobar\\sound.mp3" 300
    EnableDropSound
    MinimapIcon              0 Red Circle
    PlayEffect               Red
    ArchnemesisMod           "Toxic"
    HasCruciblePassiveTree   True
Show "Section2"
    Class          "Life Flasks" "Mana Flasks" "Hybrid Flasks"
    BaseType       "Two-Toned Boots" "Spiked Gloves" "Gripped Gloves" "Fingerless Silk Gloves" "Bone Helmet"
    Sockets        5RGBWAD
    SocketGroup    5RGBWAD
    Rarity         Rare
    HasExplicitMod == "Foo" "Bar"
    HasEnchantment == "Foo" "Bar"
    HasInfluence   == "Shaper" "Elder"
    SetBorderColor           100 101 102 200
    SetTextColor             103 104 105 201
    SetBackgroundColor       106 107 108 202
    PlayAlertSound           2
    CustomAlertSound         "C\\foobar\\sound.mp3"
    DisableDropSound
    MinimapIcon              Medium Red Circle
    PlayEffect               Blue Temp
Show "Section3"
    Sockets        RGBWAD
    SocketGroup    RGBWAD
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
    DisableDropSoundIfAlertSound
Unset "Section6"
    SetBorderColor           Saturation(64%)
    SetTextColor             Lightness(75%)
    EnableDropSoundIfAlertSound

   `

  const expected = [
    {
      id: "0001",
      name: "Section1",
      activity: "Show",
      conditions: {
        Class: { ope: "=", vals: ["Maps"] },
        BaseType: { ope: "=", vals: ["Sacrificial Garb"] },
        DropLevel: { ope: ">", val: 85 },
        ItemLevel: { ope: ">=", val: 70 },
        AreaLevel: { ope: "<", val: 30 },
        GemLevel: { ope: "=", val: 10 },
        TransfiguredGem: true,
        StackSize: { ope: "<", val: 11 },
        MapTier: { ope: "<=", val: 12 },
        Quality: { ope: "=", val: 15 },
        LinkedSockets: { ope: "=", val: 6 },
        Sockets: { ope: ">=", val: "5RGBWAD" },
        SocketGroup: { ope: ">=", val: "5RGBWAD" },
        Rarity: { ope: "=", val: "Rare" },
        BaseDefencePercentile: { ope: ">", val: 50 },
        BaseArmour: { ope: ">", val: 40 },
        BaseEnergyShield: { ope: ">", val: 41 },
        BaseEvasion: { ope: ">", val: 42 },
        BaseWard: { ope: ">", val: 43 },
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
        Height: { ope: ">", val: 1 },
        Width: { ope: ">", val: 2 },
        CorruptedMods: { ope: ">=", val: 1 },
        EnchantmentPassiveNum: { ope: ">", val: 5 },
        HasExplicitMod: { ope: "=", vals: ["Foo", "Bar"] },
        HasImplicitMod: true,
        HasEaterOfWorldsImplicit: { ope: ">=", val: 4 },
        HasSearingExarchImplicit: { ope: ">=", val: 4 },
        AnyEnchantment: true,
        HasEnchantment: { ope: "=", vals: ["Foo", "Bar"] },
        HasInfluence: { ope: "=", vals: ["Shaper", "Elder"] },
        EnchantmentPassiveNode: {
          ope: "=",
          vals: ["Damage while you have a Herald", "Projectile Damage"],
        },
        Replica: true,
        ArchnemesisMod: { ope: "=", vals: ["Toxic"] },
        HasCruciblePassiveTree: true,
      },
      actions: {
        SetBorderColor: { rgb: { r: 100, g: 101, b: 102 }, alpha: 255 },
        SetTextColor: { rgb: { r: 103, g: 104, b: 105 }, alpha: 255 },
        SetBackgroundColor: { rgb: { r: 106, g: 107, b: 108 }, alpha: 255 },
        SetFontSize: 30,
        PlayAlertSound: { id: "16", volume: 300 },
        CustomAlertSound: { filePath: "C\\foobar\\sound.mp3", volume: 300 },
        EnableDropSound: true,
        MinimapIcon: { size: "Large", color: "Red", shape: "Circle" },
        PlayEffect: { color: "Red", temp: false },
      },
      branches: [],
    },
    {
      id: "0001",
      name: "Section2",
      activity: "Show",
      conditions: {
        Class: {
          ope: "=",
          vals: ["Life Flasks", "Mana Flasks", "Hybrid Flasks"],
        },
        BaseType: {
          ope: "=",
          vals: ["Two-Toned Boots", "Spiked Gloves", "Gripped Gloves", "Fingerless Silk Gloves", "Bone Helmet"],
        },
        Sockets: { ope: "=", val: "5RGBWAD" },
        SocketGroup: { ope: "=", val: "5RGBWAD" },
        Rarity: { ope: "=", val: "Rare" },
        HasExplicitMod: { ope: "==", vals: ["Foo", "Bar"] },
        HasEnchantment: { ope: "==", vals: ["Foo", "Bar"] },
        HasInfluence: { ope: "==", vals: ["Shaper", "Elder"] },
      },
      actions: {
        SetBorderColor: { rgb: { r: 100, g: 101, b: 102 }, alpha: 200 },
        SetTextColor: { rgb: { r: 103, g: 104, b: 105 }, alpha: 201 },
        SetBackgroundColor: { rgb: { r: 106, g: 107, b: 108 }, alpha: 202 },
        PlayAlertSound: { id: "2", volume: 50 },
        CustomAlertSound: {
          filePath: "C\\foobar\\sound.mp3",
          volume: 100,
        },
        DisableDropSound: true,
        MinimapIcon: { size: "Medium", color: "Red", shape: "Circle" },
        PlayEffect: { color: "Blue", temp: true },
      },
      branches: [],
    },
    {
      id: "0001",
      name: "Section3",
      activity: "Show",
      conditions: {
        Sockets: { ope: "=", val: "RGBWAD" },
        SocketGroup: { ope: "=", val: "RGBWAD" },
        HasExplicitMod: {
          numeric: { ope: ">=", val: 2 },
          vals: ["Foo", "Bar"],
        },
        HasEnchantment: {
          numeric: { ope: ">=", val: 2 },
          vals: ["Foo", "Bar"],
        },
        HasInfluence: { ope: undefined, val: "None" },
      },
      actions: {
        SetBorderColor: { function: "Negate", val: undefined },
        SetTextColor: { function: "Grayscale", val: undefined },
        SetBackgroundColor: { function: "Lighten", val: 0.1 },
        SetFontSize: { function: "Plus", val: 5 },
        PlayAlertSoundPositional: { id: "ShAlchemy", volume: 200 },
      },
      branches: [],
    },
    {
      id: "0001",
      name: "Section4",
      activity: "Ignore",
      conditions: {},
      actions: {
        SetBorderColor: { function: "Darken", val: 0.2 },
        SetTextColor: { function: "Whiten", val: 0.31 },
        SetBackgroundColor: { function: "Blacken", val: 1 },
        SetFontSize: { function: "Minus", val: 6 },
        PlayAlertSoundPositional: { id: "ShBlessed", volume: 50 },
      },
      branches: [],
    },
    {
      id: "0001",
      name: "Section5",
      activity: "Hide",
      conditions: {},
      actions: {
        SetBorderColor: { function: "Saturate", val: 0.42 },
        SetTextColor: { function: "Desaturate", val: 0.53 },
        SetBackgroundColor: { function: "Hex", val: 123 },
        DisableDropSoundIfAlertSound: true,
      },
      branches: [],
    },
    {
      id: "0001",
      name: "Section6",
      activity: "Unset",
      conditions: {},
      actions: {
        SetBorderColor: { function: "Saturationv", val: 64 },
        SetTextColor: { function: "Lightness", val: 75 },
        EnableDropSoundIfAlertSound: true,
      },
      branches: [],
    },
  ]

  const result = parse(script)

  t.like(result, expected)
})

test("parse : empty section", (t) => {
  const script = outdent`
Hide "All Section"

   `

  const expected = [
    {
      id: "0001",
      name: "All Section",
      activity: "Hide",
      conditions: {},
      actions: {},
      branches: [],
    },
  ]

  const result = parse(script)

  t.like(result, expected)
})

test("parse : single section", (t) => {
  const script = outdent`
Show "Map Section"
    Class "Maps"
    MapTier > 3
    SetBorderColor 250 251 252
    PlayAlertSound 1 300

   `

  const expected = [
    {
      id: "0001",
      name: "Map Section",
      activity: "Show",
      conditions: {
        Class: { ope: "=", vals: ["Maps"] },
        MapTier: { ope: ">", val: 3 },
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: "1", volume: 300 },
      },
      branches: [],
    },
  ]

  const result = parse(script)

  t.like(result, expected)
})

test("parse : multi section", (t) => {
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
      id: "0001",
      name: "Hide Map Section",
      activity: "Hide",
      conditions: {
        Class: { ope: "=", vals: ["Maps"] },
        MapTier: { ope: "<=", val: 4 },
      },
      actions: {},
      branches: [],
    },
    {
      id: "0001",
      name: "Flask Section",
      activity: "Show",
      conditions: {
        Class: { ope: "=", vals: ["Life Flasks", "Mana Flasks", "Hybrid Flasks"] },
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: "1", volume: 300 },
      },
      branches: [],
    },
    {
      id: "0001",
      name: "Remain Section",
      activity: "Hide",
      conditions: {},
      actions: {},
      branches: [],
    },
  ]

  const result = parse(script)

  t.like(result, expected)
})

test("parse : single fork", (t) => {
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
      id: "0003",
      name: "Map Section",
      activity: "Show",
      conditions: {
        Class: { ope: "=", vals: ["Maps"] },
        MapTier: { ope: ">", val: 3 },
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: "1", volume: 300 },
      },
      branches: [
        {
          name: "Rarity",
          type: "Fork",
          blocks: [
            {
              id: "0001",
              name: "Rare",
              activity: "Show",
              conditions: {
                Rarity: { ope: "=", val: "Rare" },
              },
              actions: { SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 } },
              branches: [],
            },
            {
              id: "0002",
              name: "Magic",
              activity: "Hide",
              conditions: {
                Rarity: { ope: "=", val: "Magic" },
              },
              actions: {},
              branches: [],
            },
          ],
        },
      ],
    },
  ]

  const result = parse(script)

  t.like(result, expected)
})

test("parse : single mixin", (t) => {
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
      id: "0003",
      name: "Map Section",
      activity: "Show",
      conditions: {
        Class: { ope: "=", vals: ["Maps"] },
        MapTier: { ope: ">", val: 3 },
      },
      actions: {
        SetBorderColor: { rgb: { r: 250, g: 251, b: 252 }, alpha: 255 },
        PlayAlertSound: { id: "1", volume: 300 },
      },
      branches: [
        {
          name: "Rarity",
          type: "Mixin",
          blocks: [
            {
              id: "0001",
              name: "Rare",
              activity: "Show",
              conditions: {
                Rarity: { ope: "=", val: "Rare" },
              },
              actions: { SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 } },
              branches: [],
            },
            {
              id: "0002",
              name: "Magic",
              activity: "Hide",
              conditions: {
                Rarity: { ope: "=", val: "Magic" },
              },
              actions: {},
              branches: [],
            },
          ],
        },
      ],
    },
  ]

  const result = parse(script)

  t.like(result, expected)
})

test("parse : multi mixin", (t) => {
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
      id: "0005",
      name: "Map Section",
      activity: "Show",
      conditions: {
        Class: { ope: "=", vals: ["Maps"] },
      },
      actions: {},
      branches: [
        {
          name: "Rarity",
          type: "Mixin",
          blocks: [
            {
              id: "0001",
              name: "Rare",
              activity: "Show",
              conditions: {
                Rarity: { ope: "=", val: "Rare" },
              },
              actions: {
                SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 },
              },
              branches: [],
            },
            {
              id: "0002",
              name: "Magic",
              activity: "Hide",
              conditions: {
                Rarity: { ope: "=", val: "Magic" },
              },
              actions: {},
              branches: [],
            },
          ],
        },
        {
          name: "Tier",
          type: "Mixin",
          blocks: [
            {
              id: "0003",
              name: "High Tier",
              activity: "Show",
              conditions: {
                MapTier: { ope: ">=", val: 11 },
              },
              actions: {
                PlayAlertSound: { id: "1", volume: 300 },
              },
              branches: [],
            },
            {
              id: "0004",
              name: "Middle Tier",
              activity: "Show",
              conditions: {
                MapTier: { ope: ">=", val: 6 },
              },
              actions: {
                PlayAlertSound: { id: "2", volume: 300 },
              },
              branches: [],
            },
          ],
        },
      ],
    },
  ]

  const result = parse(script)

  t.like(result, expected)
})

test("parse : nested mixin", (t) => {
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
      id: "0005",
      name: "Map Section",
      activity: "Show",
      conditions: {
        Class: { ope: "=", vals: ["Maps"] },
      },
      actions: {},
      branches: [
        {
          name: "Rarity",
          type: "Mixin",
          blocks: [
            {
              id: "0001",
              name: "Rare",
              activity: "Show",
              conditions: {
                Rarity: { ope: "=", val: "Rare" },
              },
              actions: {
                SetBackgroundColor: { rgb: { r: 255, g: 0, b: 0 }, alpha: 100 },
              },
              branches: [],
            },
            {
              id: "0004",
              name: "Magic",
              activity: "Hide",
              conditions: {
                Rarity: { ope: "=", val: "Magic" },
              },
              actions: {},
              branches: [
                {
                  name: "Tier",
                  type: "Mixin",
                  blocks: [
                    {
                      id: "0002",
                      name: "High Tier",
                      activity: "Show",
                      conditions: {
                        MapTier: { ope: ">=", val: 11 },
                      },
                      actions: {
                        PlayAlertSound: { id: "1", volume: 300 },
                      },
                      branches: [],
                    },
                    {
                      id: "0003",
                      name: "Middle Tier",
                      activity: "Show",
                      conditions: {
                        MapTier: { ope: ">=", val: 6 },
                      },
                      actions: {
                        PlayAlertSound: { id: "2", volume: 300 },
                      },
                      branches: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  const result = parse(script)

  t.like(result, expected)
})
