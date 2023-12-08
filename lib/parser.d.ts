type Activity = "Show" | "Hide" | "Unset" | "Ignore"

type BranchType = "Fork" | "Mixin"

type MatchOperator = "==" | "="
type NumOperator = "<=" | ">=" | "<" | ">" | "="

type Rarity = "Normal" | "Magic" | "Rare" | "Unique"
type Influence = "Shaper" | "Elder" | "Crusader" | "Hunter" | "Redeemer" | "Warlord" | "None"
type GemQualityType = "Superior" | "Divergent" | "Anomalous" | "Phantasmal"
type SocketType = "R" | "G" | "B" | "W" | "A" | "D"

type ColorName = "Red" | "Green" | "Blue" | "Brown" | "White" | "Yellow" | "Cyan" | "Grey" | "Orange" | "Pink" | "Purple"

type MinimapIconSize = 0 | 1 | 2 | "0" | "1" | "2" | "Largest" | "Medium" | "Small"
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
type Sound = { id: SoundId; volume: number | undefined }

type AdvancedBlock = {
  id: string
  name: string
  activity: Activity
  conditions: {
    Class?: { ope: MatchOperator; vals: string[] }
    BaseType?: { ope: MatchOperator; vals: string[] }
    Rarity?: `${MatchOperator} ${Rarity}` | Rarity
    BaseDefencePercentile?: `${NumOperator} ${number}`
    BaseArmour?: `${NumOperator} ${number}`
    BaseEnergyShield?: `${NumOperator} ${number}`
    BaseEvasion?: `${NumOperator} ${number}`
    BaseWard?: `${NumOperator} ${number}`
    DropLevel?: `${NumOperator} ${number}`
    ItemLevel?: `${NumOperator} ${number}`
    AreaLevel?: `${NumOperator} ${number}`
    GemLevel?: `${NumOperator} ${number}`
    TransfiguredGem?: boolean
    StackSize?: `${NumOperator} ${number}`
    MapTier?: `${NumOperator} ${number}`
    Quality?: `${NumOperator} ${number}`
    LinkedSockets?: `${NumOperator} ${number}`
    Sockets?: `${NumOperator} ${number}${string}`
    SocketGroup?: `${NumOperator} ${number}${string}`
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
    Height?: `${NumOperator} ${number}`
    Width?: `${NumOperator} ${number}`
    CorruptedMods?: `${NumOperator} ${number}`
    EnchantmentPassiveNum?: `${NumOperator} ${number}`
    HasExplicitMod?: { ope: MatchOperator; vals: string[] }
    HasImplicitMod?: boolean
    HasEaterOfWorldsImplicit?: `${NumOperator} ${number}`
    HasSearingExarchImplicit?: `${NumOperator} ${number}`
    AnyEnchantment?: boolean
    HasEnchantment?: { ope: MatchOperator; vals: string[] }
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
    PlayAlertSound?: Sound
    PlayAlertSoundPositional?: Sound
    CustomAlertSound?: {
      filePath: string
      volume: number | undefined
    }
    DisableDropSound?: boolean
    EnableDropSound?: boolean
  }
  branches: Branch[]
  location: {
    start: { line: number; column: number; offset: number }
    end: { line: number; column: number; offset: number }
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
