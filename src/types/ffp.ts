export type Ratio = {
  id?: number
  creditCardId: number
  ratio: number
  ffpId?: number
}

export type FFP = {
  id: number         // ✅ FIXED: was `string`, should be `number`
  name: string
  assetName: string
  enabled: boolean
  archived: boolean
  createdAt: string
  updatedAt: string
  ratios: Ratio[]
}
