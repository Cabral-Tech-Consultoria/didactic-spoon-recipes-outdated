export interface QueryIngredientSearch {
  query: string
  addChildren: boolean
  minProteinPercent: number
  maxProteinPercent: number
  minFatPercent: number
  maxFatPercent: number
  minCarbsPercent: number
  maxCarbsPercent: number
  metaInformation: boolean
  intolerances: string
  sort: string
  sortDirection: string
  language: string
  offset: number
  number: number
}