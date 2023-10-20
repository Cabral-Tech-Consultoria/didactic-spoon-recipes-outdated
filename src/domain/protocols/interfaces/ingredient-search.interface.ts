export interface IIngredientSearch {
  id: number,
  name: string,
  image: string
}

export interface IIngredientSearchList {
  results: IIngredientSearch[],
  offset: number,
  number: number,
  totalResults: number
}