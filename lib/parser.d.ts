/// <reference types="typescript" />

// export as namespace advancedPoeFilter

export interface AdvancedBlock {
  id: string
  name: string
  activity: string
  conditions: Object
  actions: Object
  branches: Array<Branch>
  location: {
    start: {
      line: number
      column: number
      offset: number
    }
    end: {
      line: number
      column: number
      offset: number
    }
  }
}

export interface Branch {
  name: string
  type: string
  blocks: Array<AdvancedBlock>
}

export function parse(advancedScriptText: string): Array<AdvancedBlock>
