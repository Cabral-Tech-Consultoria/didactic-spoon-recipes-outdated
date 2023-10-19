import {ImageType} from './recipe-info.interface'

export interface IRecipeIngredientsInfo {
  id: number,
  image: string,
  imageType: ImageType,
  likes: number,
  missedIngredientCount: number,
  title: string,
  unusedIngredients: IIngredient[],
  usedIngredientCount: number,
  usedIngredients: IIngredient[]
  missedIngredients: IIngredient[]
}

export interface IIngredient {
  aisle: string,
  amount: number,
  id: number,
  image: string,
  meta: string[],
  name: string,
  original: string,
  originalName: string,
  unit: string,
  unitLong: string,
  unitShort: string
}