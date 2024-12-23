type Activity = "Show" | "Hide" | "Unset" | "Ignore"

type BranchType = "Fork" | "Mixin"

type MatchOperator = "==" | "="
type NumOperator = "<=" | ">=" | "<" | ">" | "="

type Rarity = "Normal" | "Magic" | "Rare" | "Unique"
type Influence = "Shaper" | "Elder" | "Crusader" | "Hunter" | "Redeemer" | "Warlord" | "None"
type GemQualityType = "Superior" | "Divergent" | "Anomalous" | "Phantasmal"
type SocketType = "R" | "G" | "B" | "W" | "A" | "D"
type SocketGroup =
  | SocketType
  | `${SocketType}${SocketType}`
  | `${SocketType}${SocketType}${SocketType}`
  | `${SocketType}${SocketType}${SocketType}${SocketType}`
  | `${SocketType}${SocketType}${SocketType}${SocketType}${SocketType}`
  | `${SocketType}${SocketType}${SocketType}${SocketType}${SocketType}${SocketType}`
type ImplicitModTier = "Lesser" | "Greater" | "Grand" | "Exceptional" | "Exquisite" | "Perfect"

type ColorName = "Red" | "Green" | "Blue" | "Brown" | "White" | "Yellow" | "Cyan" | "Grey" | "Orange" | "Pink" | "Purple"

type MinimapIconSize = "Large" | "Medium" | "Small"
type MinimapIconColor = ColorName
type MinimapIconShape =
  | "Circle"
  | "Diamond"
  | "Hexagon"
  | "Square"
  | "Star"
  | "Triangle"
  | "Cross"
  | "Moon"
  | "Raindrop"
  | "Kite"
  | "Pentagon"
  | "UpsideDownHouse"
type PlayEffectColor = ColorName
type SoundId =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "Sh01"
  | "Sh02"
  | "Sh03"
  | "Sh04"
  | "Sh05"
  | "Sh06"
  | "Sh07"
  | "Sh08"
  | "Sh09"
  | "Sh10"
  | "Sh11"
  | "Sh12"
  | "Sh13"
  | "Sh14"
  | "Sh15"
  | "Sh16"
  | "ShAlchemy"
  | "ShBlessed"
  | "ShChaos"
  | "ShDivine"
  | "ShExalted"
  | "ShFusing"
  | "ShGeneral"
  | "ShMirror"
  | "ShRegal"
  | "ShVaal"

type RGBA = { rgb: { r: number; g: number; b: number }; alpha: number }
type AlertSound = { id: SoundId; volume: number }
type CustomAlertSound = { filePath: string; volume: number }

type AdvancedBlock = {
  id: string
  name: string
  activity: Activity
  conditions: {
    Class?: { ope: MatchOperator; vals: string[] }
    BaseType?: { ope: MatchOperator; vals: string[] }
    Rarity?: { ope: NumOperator; val: Rarity }
    BaseDefencePercentile?: { ope: NumOperator; val: number }
    BaseArmour?: { ope: NumOperator; val: number }
    BaseEnergyShield?: { ope: NumOperator; val: number }
    BaseEvasion?: { ope: NumOperator; val: number }
    BaseWard?: { ope: NumOperator; val: number }
    DropLevel?: { ope: NumOperator; val: number }
    ItemLevel?: { ope: NumOperator; val: number }
    AreaLevel?: { ope: NumOperator; val: number }
    GemLevel?: { ope: NumOperator; val: number }
    TransfiguredGem?: boolean
    StackSize?: { ope: NumOperator; val: number }
    MapTier?: { ope: NumOperator; val: number }
    WaystoneTier?: { ope: NumOperator; val: number }
    Quality?: { ope: NumOperator; val: number }
    LinkedSockets?: { ope: NumOperator; val: number }
    Sockets?: { ope: NumOperator; vals: `${number}${SocketGroup}` | SocketGroup }
    SocketGroup?: { ope: NumOperator; vals: `${number}${SocketGroup}` | SocketGroup }
    FracturedItem?: boolean
    SynthesisedItem?: boolean
    Corrupted?: boolean
    Mirrored?: boolean
    Identified?: boolean
    Scourged?: boolean
    ShapedMap?: boolean
    ElderMap?: boolean
    BlightedMap?: boolean
    UberBlightedMap?: boolean
    Height?: { ope: NumOperator; val: number }
    Width?: { ope: NumOperator; val: number }
    CorruptedMods?: { ope: NumOperator; val: number }
    EnchantmentPassiveNum?: { ope: NumOperator; val: number }
    HasExplicitMod?: { numeric: { ope: NumOperator; val: number }; vals: string[] } | { ope: NumOperator; vals: string[] }
    HasImplicitMod?: boolean
    HasEaterOfWorldsImplicit?: { ope: NumOperator; val: ImplicitModTier }
    HasSearingExarchImplicit?: { ope: NumOperator; val: ImplicitModTier }
    AnyEnchantment?: boolean
    HasEnchantment?: { numeric: { ope: NumOperator; val: number }; vals: string[] } | { ope: NumOperator; vals: string[] }
    HasInfluence?: { ope: MatchOperator; vals: Influence[] }
    EnchantmentPassiveNode?: { ope: MatchOperator; vals: string[] }
    Replica?: boolean
    ArchnemesisMod?: { ope: MatchOperator; vals: string[] }
    HasCruciblePassiveTree?: boolean
  }
  actions: {
    SetFontSize?: number
    SetTextColor?: RGBA
    SetBackgroundColor?: RGBA
    SetBorderColor?: RGBA
    MinimapIcon?: { size: MinimapIconSize; color: MinimapIconColor; shape: MinimapIconShape }
    PlayEffect?: { color: PlayEffectColor; temp: boolean }
    PlayAlertSound?: AlertSound
    PlayAlertSoundPositional?: AlertSound
    CustomAlertSound?: CustomAlertSound
    CustomAlertSoundOptional?: CustomAlertSound
    DisableDropSoundIfAlertSound?: boolean
    EnableDropSoundIfAlertSound?: boolean
    DisableDropSound?: boolean
    EnableDropSound?: boolean
  }
  branches: Branch[]
  location: {
    start: { line: number; column: number; offset: number }
    end: { line: number; column: number; offset: number }
    source: string | undefined
  }
}

type Branch = {
  name: string
  type: BranchType
  blocks: AdvancedBlock[]
}

type Condition = keyof AdvancedBlock["conditions"]
type Action = keyof AdvancedBlock["actions"]

type SyntaxError = {
  message: string
  found?: string
  location: {
    start: {
      offset: number
      line: number
      column: number
    }
    end: {
      offset: number
      line: number
      column: number
    }
  }
}

export function parse(input: string): AdvancedBlock[]
