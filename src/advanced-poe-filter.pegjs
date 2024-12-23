{
  const indent = '    '
  const idDigit = 4
  const idPadding = '0'.repeat(idDigit)
  let blockId = 1
  let indentLevel = 0

  function getIndentLevel(i) { return i.split(indent).length - 1 }
  function resetBlockId() { blockId = 1 }
  function getBlockId() {
    let result = (idPadding + blockId).slice(- idDigit)
    blockId++
    return result
  }
}

//
// Base Grammar
//
start = script

script = section*

section = block:(block / emptyBlock) {
    resetBlockId()
    return block
  }

block =
  blankline*
  activity:('Show' / 'Hide' / 'Unset' / 'Ignore') __ name:string br
  blankline*
  INDENT
    line0:line
    blankline*
    lines:(SAMEDENT line blankline*)*
    branches:(SAMEDENT branch)*
  OUTDENT
  blankline* {
    let conditions = {};
    let actions = {};

    [line0].concat(lines.map(l => l[1])).forEach((line) => {
      if(line.lineType == 'condition') {
        conditions[line.attr] = line.val
      } else if(line.lineType == 'action') {
        actions[line.attr] = line.val
      }
    })

    let allBranches = branches.map(m => m[1])

    return { id: getBlockId(), name, activity, conditions, actions, branches: allBranches, location: location() }
  }

emptyBlock =
  blankline*
  activity:('Show' / 'Hide') __ name:string br
  blankline* {
    return { id: getBlockId(), name, activity, conditions: {}, actions: {}, branches: [], location: location() }
  }

line = line:(condition / action) br { return line }

branch =
  blankline*
  type:('Fork' / 'Mixin') __ name:string br
  blankline*
  INDENT
    block0:block
    blocks:(SAMEDENT block)*
  OUTDENT {
    let allBlocks = [block0].concat(blocks.map(b => b[1]))
    return { name, type, blocks: allBlocks, location: location() }
  }

blankline = _* br / commentline
commentline = _* '#' [^\n]* br

//
// Condition
//
condition =
    conditionClass
  / conditionBaseType
  / conditionDropLevel
  / conditionItemLevel
  / conditionAreaLevel
  / conditionGemLevel
  / conditionTransfiguredGem
  / conditionStackSize
  / conditionMapTier
  / conditionQuality
  / conditionLinkedSockets
  / conditionSockets
  / conditionSocketGroup
  / conditionRarity
  / conditionBaseDefencePercentile
  / conditionBaseArmour
  / conditionBaseEnergyShield
  / conditionBaseEvasion
  / conditionBaseWard
  / conditionFracturedItem
  / conditionSynthesisedItem
  / conditionCorrupted
  / conditionMirrored
  / conditionIdentified
  / conditionScourged
  / conditionShapedMap
  / conditionElderMap
  / conditionBlightedMap
  / conditionUberBlightedMap
  / conditionHeight
  / conditionWidth
  / conditionCorruptedMods
  / conditionEnchantmentPassiveNum
  / conditionHasExplicitMod
  / conditionHasImplicitMod
  / conditionHasEaterOfWorldsImplicit
  / conditionHasSearingExarchImplicit
  / conditionAnyEnchantment
  / conditionHasEnchantment
  / conditionHasInfluence
  / conditionEnchantmentPassiveNode
  / conditionReplica
  / conditionArchnemesisMod
  / conditionHasCruciblePassiveTree

// Condition Attributes
conditionClass                  = attr:'Class'                  __ val:conditionValueArray           { return { lineType: 'condition', attr, val} }
conditionBaseType               = attr:'BaseType'               __ val:conditionValueArray           { return { lineType: 'condition', attr, val} }
conditionDropLevel              = attr:'DropLevel'              __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionItemLevel              = attr:'ItemLevel'              __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionAreaLevel              = attr:'AreaLevel'              __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionGemLevel               = attr:'GemLevel'               __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionTransfiguredGem        = attr:'TransfiguredGem'        __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionStackSize              = attr:'StackSize'              __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionMapTier                = attr:'MapTier'                __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionQuality                = attr:'Quality'                __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionLinkedSockets          = attr:'LinkedSockets'          __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionSockets                = attr:'Sockets'                __ val:conditionValueSocketType      { return { lineType: 'condition', attr, val} }
conditionSocketGroup            = attr:'SocketGroup'            __ val:conditionValueSocketType      { return { lineType: 'condition', attr, val} }
conditionRarity                 = attr:'Rarity'                 __ val:conditionValueRarity          { return { lineType: 'condition', attr, val} }
conditionBaseDefencePercentile  = attr:'BaseDefencePercentile'  __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionBaseArmour             = attr:'BaseArmour'             __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionBaseEnergyShield       = attr:'BaseEnergyShield'       __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionBaseEvasion            = attr:'BaseEvasion'            __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionBaseWard               = attr:'BaseWard'               __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionFracturedItem          = attr:'FracturedItem'          __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionSynthesisedItem        = attr:'SynthesisedItem'        __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionCorrupted              = attr:'Corrupted'              __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionMirrored               = attr:'Mirrored'               __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionIdentified             = attr:'Identified'             __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionScourged               = attr:'Scourged'               __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionShapedMap              = attr:'ShapedMap'              __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionElderMap               = attr:'ElderMap'               __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionBlightedMap            = attr:'BlightedMap'            __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionUberBlightedMap        = attr:'UberBlightedMap'        __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionHeight                 = attr:'Height'                 __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionWidth                  = attr:'Width'                  __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionCorruptedMods          = attr:'CorruptedMods'          __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionEnchantmentPassiveNum  = attr:'EnchantmentPassiveNum'  __ val:conditionValueNumber          { return { lineType: 'condition', attr, val} }
conditionHasExplicitMod         = attr:'HasExplicitMod'         __ val:conditionValueNumericAndArray { return { lineType: 'condition', attr, val} }
conditionHasImplicitMod         = attr:'HasImplicitMod'         __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionHasEaterOfWorldsImplicit = attr:'HasEaterOfWorldsImplicit' __ val:conditionValueImplicitModTier { return { lineType: 'condition', attr, val} }
conditionHasSearingExarchImplicit = attr:'HasSearingExarchImplicit' __ val:conditionValueImplicitModTier { return { lineType: 'condition', attr, val} }
conditionAnyEnchantment         = attr:'AnyEnchantment'         __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionHasEnchantment         = attr:'HasEnchantment'         __ val:conditionValueNumericAndArray { return { lineType: 'condition', attr, val} }
conditionHasInfluence           = attr:'HasInfluence'           __ val:conditionValueArrayOrNone     { return { lineType: 'condition', attr, val} }
conditionEnchantmentPassiveNode = attr:'EnchantmentPassiveNode' __ val:conditionValueArray           { return { lineType: 'condition', attr, val} }
conditionReplica                = attr:'Replica'                __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }
conditionArchnemesisMod         = attr:'ArchnemesisMod'         __ val:conditionValueArray           { return { lineType: 'condition', attr, val} }
conditionHasCruciblePassiveTree = attr:'HasCruciblePassiveTree' __ val:conditionValueBoolean         { return { lineType: 'condition', attr, val} }


// Condition Values
conditionValueArray = operator:(matchOperator __)? names:names { return operator ? { ope: operator[0], vals: names } : { ope: '=', vals: names } }
conditionValueArrayOrNone = conditionValueArray / val:'None' { return val ?  { ope: undefined, val: 'None' } : { ope, vals } }
conditionValueNumericAndArray = pre:((numOperator __ num __) / (matchOperator __))? names:names {
  if (pre) {
    if (pre.length === 4) {
      return { numeric: { ope: pre[0], val: pre[2] }, vals: names }
    } else {
      return { ope: pre[0], vals: names }
    }
  } else {
    return { ope: '=', vals: names }
  }
}
conditionValueNumber = operator:numOperator __ num:num { return { ope: operator, val: num } }
conditionValueSocketType = operator:(numOperator __)? num:(num)? socketTypes:socketTypes { return operator ? { ope: operator[0], val: `${num == undefined ? '' : num}${socketTypes}` } : { ope: '=', val: `${num == undefined ? '' : num}${socketTypes}` } }
conditionValueRarity = operator:(numOperator __)? rarity:rarity { return operator ? { ope: operator[0], val: rarity } : { ope: '=', val: rarity } }
conditionValueBoolean = boolean
conditionValueImplicitModTier = operator:numOperator __ modTier:implicitModTier { return { ope: operator, val: modTier } }

//
// Action
//
action =
    actionSetBorderColor
  / actionSetTextColor
  / actionSetBackgroundColor
  / actionSetFontSize
  / actionPlayAlertSound
  / actionPlayAlertSoundPositional
  / actionCustomAlertSound
  / actionCustomAlertSoundOptional
  / actionDisableDropSoundIfAlertSound
  / actionEnableDropSoundIfAlertSound
  / actionDisableDropSound
  / actionEnableDropSound
  / actionMinimapIcon
  / actionPlayEffect

// Action Attributes
actionSetBorderColor               = attr:'SetBorderColor'           __ val:actionValueColor       { return { lineType: 'action', attr, val } }
actionSetTextColor                 = attr:'SetTextColor'             __ val:actionValueColor       { return { lineType: 'action', attr, val } }
actionSetBackgroundColor           = attr:'SetBackgroundColor'       __ val:actionValueColor       { return { lineType: 'action', attr, val } }
actionSetFontSize                  = attr:'SetFontSize'              __ val:actionValueFontSize    { return { lineType: 'action', attr, val } }
actionPlayAlertSound               = attr:'PlayAlertSound'           __ val:actionValueSound       { return { lineType: 'action', attr, val } }
actionPlayAlertSoundPositional     = attr:'PlayAlertSoundPositional' __ val:actionValueSound       { return { lineType: 'action', attr, val } }
actionCustomAlertSound             = attr:'CustomAlertSound'         __ val:actionValueCustomSound { return { lineType: 'action', attr, val } }
actionCustomAlertSoundOptional     = attr:'CustomAlertSoundOptional' __ val:actionValueCustomSound { return { lineType: 'action', attr, val } }
actionDisableDropSoundIfAlertSound = attr:'DisableDropSoundIfAlertSound'                           { return { lineType: 'action', attr, val: true } }
actionEnableDropSoundIfAlertSound  = attr:'EnableDropSoundIfAlertSound'                            { return { lineType: 'action', attr, val: true } }
actionDisableDropSound             = attr:'DisableDropSound'                                       { return { lineType: 'action', attr, val: true } }
actionEnableDropSound              = attr:'EnableDropSound'                                        { return { lineType: 'action', attr, val: true } }
actionMinimapIcon                  = attr:'MinimapIcon'              __ val:actionValueMinimapIcon { return { lineType: 'action', attr, val } }
actionPlayEffect                   = attr:'PlayEffect'               __ val:actionValuePlayEffect  { return { lineType: 'action', attr, val } }

// Action Functions
actionFunctionColor =
    actionFunctionNegate
  / actionFunctionGrayscale
  / actionFunctionSaturate
  / actionFunctionDesaturate
  / actionFunctionLighten
  / actionFunctionDarken
  / actionFunctionWhiten
  / actionFunctionBlacken
  / actionFunctionHex
  / actionFunctionSaturation
  / actionFunctionLightness

actionFunctionNegate     = name:'Negate'    '()' { return { function: name, val: undefined } }
actionFunctionGrayscale  = name:'Grayscale' '()' { return { function: name, val: undefined } }
actionFunctionSaturate   = name:'Saturate'   '(' num:num '%' ')' &{ return 0 <= num && num <= 1000 } { return { function: name, val: num / 100 } }
actionFunctionDesaturate = name:'Desaturate' '(' num:num '%' ')' &{ return 0 <= num && num <= 1000 } { return { function: name, val: num / 100 } }
actionFunctionLighten    = name:'Lighten'    '(' num:num '%' ')' &{ return 0 <= num && num <= 1000 } { return { function: name, val: num / 100 } }
actionFunctionDarken     = name:'Darken'     '(' num:num '%' ')' &{ return 0 <= num && num <= 1000 } { return { function: name, val: num / 100 } }
actionFunctionWhiten     = name:'Whiten'     '(' num:num '%' ')' &{ return 0 <= num && num <= 1000 } { return { function: name, val: num / 100 } }
actionFunctionBlacken    = name:'Blacken'    '(' num:num '%' ')' &{ return 0 <= num && num <= 1000 } { return { function: name, val: num / 100 } }
actionFunctionHex        = name:'Hex'        '(' num:num     ')' &{ return 0 <= num && num <= 360  } { return { function: name, val: num } }
actionFunctionSaturation =      'Saturation' '(' num:num '%' ')' &{ return 0 <= num && num <= 100  } { return { function: 'Saturationv', val: num } }
actionFunctionLightness  = name:'Lightness'  '(' num:num '%' ')' &{ return 0 <= num && num <= 100  } { return { function: name, val: num } }

actionFunctionFontSize =
    actionFunctionPlus
  / actionFunctionMinus

actionFunctionPlus  = name:'Plus'  '(' num:num ')' &{ return 0 <= num && num <= 27 } { return { function: name, val: num } }
actionFunctionMinus = name:'Minus' '(' num:num ')' &{ return 0 <= num && num <= 27 } { return { function: name, val: num } }

// Action Values
actionValueColor = color / actionFunctionColor
actionValueFontSize = fontSize / actionFunctionFontSize
actionValueSound = id:soundId volume:(__ soundVolume)? { return { id, volume: volume ? parseInt(volume[1], 10) : 50 } }
actionValueCustomSound = filePath:string volume:(__ soundVolume)? { return { filePath, volume: volume ? parseInt(volume[1], 10) : 100 } }
actionValueBoolean = boolean
actionValueMinimapIcon = size:minimapIconSize __ color:minimapIconColor __ shape:minimapIconShape { return { size, color, shape } }
actionValuePlayEffect = color:playEffectColor temp:(__ 'Temp')? { return temp ? { color, temp: true } : { color, temp: false } }

//
// Value
//
names = name0:string names:(__ string)* { return [name0].concat(names.map((n) => n[1])) }
color = r:rgbaNum __ g:rgbaNum __ b:rgbaNum alpha:(__ rgbaNum)? { return { rgb: { r, g, b }, alpha: alpha ? alpha[1] : 255 } }
numOperator = '<=' / '>=' / '<' / '>' / '='
matchOperator = '==' / '='
rarity = 'Normal' / 'Magic' / 'Rare' / 'Unique'
socketType = 'R' / 'G' / 'B' / 'W' / 'A' / 'D'
socketTypes = vals:socketType|0..6| {
  const order = ['R', 'G', 'B', 'W', 'A', 'D']
  return vals.sort((left, right) => order.indexOf(left) - order.indexOf(right)).join('')
}

rgbaNum = num:num &{ return 0 <= num && num <= 255 } { return num }
implicitModTier = val:('1' / '2' / '3' / '4' / '5' / '6' / 'Lesser' / 'Greater' / 'Grand' / 'Exceptional' / 'Exquisite' / 'Perfect') {
  switch (val) {
    case '1':
      return 'Lesser'
    case '2':
      return 'Greater'
    case '3':
      return 'Grand'
    case '4':
      return 'Exceptional'
    case '5':
      return 'Exquisite'
    case '6':
      return 'Perfect'
    default:
      return val
  }
}
fontSize = num:num &{ return 1 <= num && num <= 45 } { return num }
minimapIconSize = val:('0' / '1' / '2' / 'Large' / 'Medium' / 'Small') {
  switch (val) {
    case '0':
      return 'Large'
    case '1':
      return 'Medium'
    case '2':
      return 'Small'
    default:
      return val
  }
}
minimapIconColor = 'Red' / 'Green' / 'Blue' / 'Brown' / 'White' / 'Yellow' / 'Cyan' / 'Grey' / 'Orange' / 'Pink' / 'Purple'
minimapIconShape = 'Circle' / 'Diamond' / 'Hexagon' / 'Square' / 'Star' / 'Triangle' / 'Cross' / 'Moon' / 'Raindrop' / 'Kite' / 'Pentagon' / 'UpsideDownHouse'
playEffectColor = 'Red' / 'Green' / 'Blue' / 'Brown' / 'White' / 'Yellow' / 'Cyan' / 'Grey' / 'Orange' / 'Pink' / 'Purple'
soundId =
   '10' / '11' / '12' / '13' / '14' / '15' / '16'
  / '1' / '2' / '3' / '4' / '5' / '6' / '7' / '8' / '9'
  / 'ShAlchemy' / 'ShBlessed' / 'ShChaos' / 'ShDivine' / 'ShExalted' / 'ShFusing' / 'ShGeneral' / 'ShMirror' / 'ShRegal' / 'ShVaal'
soundVolume = num:num &{ return 0 <= num && num <= 300 } { return num }

//
// Atomic Value
//
boolean = val:('True' / 'False') { return val === 'True' }
string = '"' string:$[^\n|^"]* '"' { return string }
num = num:$[0-9]+ { return parseInt(num, 10) }

//
// Base Token
//
br = [\n] { return undefined }
_ = ' '
__ = _+ { return ' ' }
indent = '    '

//
// Indent
//
SAMEDENT
  = i:$indent* &{ return getIndentLevel(i) === indentLevel } { return indentLevel }

INDENT
  = i:$indent+ &{ return getIndentLevel(i) > indentLevel } { indentLevel += 1; return indentLevel }

OUTDENT
  = '' { indentLevel -= 1; return indentLevel  }
