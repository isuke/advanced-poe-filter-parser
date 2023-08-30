type MatchOperator = "==" | "="
type NumOperator = "<=" | ">=" | "<" | ">" | "="

type Rarity = "Normal" | "Magic" | "Rare" | "Unique"
type Influence = "Shaper" | "Elder" | "Crusader" | "Hunter" | "Redeemer" | "Warlord" | "None"
type GemQualityType = "Superior" | "Divergent" | "Anomalous" | "Phantasmal"
type SocketType = "R" | "G" | "B" | "W" | "A" | "D"

type MinimapIconSize = 0 | 1 | 2 | "0" | "1" | "2" | "Largest" | "Medium" | "Small"
type MinimapIconColor = "Red" | "Green" | "Blue" | "Brown" | "White" | "Yellow" | "Cyan" | "Grey" | "Orange" | "Pink" | "Purple"
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
type PlayEffectColor = "Red" | "Green" | "Blue" | "Brown" | "White" | "Yellow" | "Cyan" | "Grey" | "Orange" | "Pink" | "Purple"
type SoundId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
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

type AdvancedBlock = {
  id: string
  name: string
  activity: string
  conditions: {
    Class?: { ope: MatchOperator; vals: string[] }
    BaseType?: { ope: MatchOperator; vals: string[] }
    Rarity?: `${MatchOperator} ${Rarity}`
    BaseDefencePercentile?: `${NumOperator} ${number}`
    BaseArmour?: `${NumOperator} ${number}`
    BaseEnergyShield?: `${NumOperator} ${number}`
    BaseEvasion?: `${NumOperator} ${number}`
    BaseWard?: `${NumOperator} ${number}`
    DropLevel?: `${NumOperator} ${number}`
    ItemLevel?: `${NumOperator} ${number}`
    AreaLevel?: `${NumOperator} ${number}`
    GemLevel?: `${NumOperator} ${number}`
    GemQualityType?: { ope: MatchOperator; vals: GemQualityType[] }
    StackSize?: `${NumOperator} ${number}`
    MapTier?: `${NumOperator} ${number}`
    Quality?: `${NumOperator} ${number}`
    LinkedSockets?: `${NumOperator} ${number}`
    Sockets?: `${NumOperator} ${number}`
    SocketGroup?: `${NumOperator} ${string}` | string
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
    AlternateQuality?: boolean
    Replica?: boolean
    ArchnemesisMod?: { ope: MatchOperator; vals: string[] }
    HasCruciblePassiveTree?: boolean
  }
  actions: {
    SetFontSize?: number
    SetTextColor?: { rgb: { r: number; g: number; b: number }; alpha: number }
    SetBackgroundColor?: { rgb: { r: number; g: number; b: number }; alpha: number }
    SetBorderColor?: { rgb: { r: number; g: number; b: number }; alpha: number }
    MinimapIcon?: { size: MinimapIconSize; color: MinimapIconColor; shape: MinimapIconShape }
    PlayEffect?: { color: PlayEffectColor; temp: boolean }
    PlayAlertSound?: { id: SoundId; volume: number | undefined }
    PlayAlertSoundPositional?: { id: SoundId; volume: number | undefined }
    CustomAlertSound?: {
      filePath: string
      volume: number | undefined
    }
    DisableDropSound?: boolean
    EnableDropSound?: boolean
  }
  branches: Array<Branch>
  location: {
    start: { line: number; column: number; offset: number }
    end: { line: number; column: number; offset: number }
  }
}

type Branch = {
  name: string
  type: string
  blocks: Array<AdvancedBlock>
}

type Condition = keyof AdvancedBlock["conditions"]
type Action = keyof AdvancedBlock["actions"]

export function parse(input: string): AdvancedBlock[]

export class SyntaxError {
  public message: any
  public expected: any
  public found: any
  public location: any
}
