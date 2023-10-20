import {ImageType} from './recipe-info.interface'
import {ICaloricBreakDown, INutrient, IProperty} from './nutrition.interface'

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

export interface IIngredientInfo {
  id: number,
  original: string,
  originalName: string,
  name: string,
  amount: number,
  unit: string,
  unitShort: string,
  unitLong: string,
  possibleUnits: string[],
  estimatedCost: {
    value: number,
    unit: string
  },
  consistency: string,
  shoppingListUnits: string[],
  aisle: string,
  image: string,
  meta: string[],
  nutrition: {
    nutrients: INutrient[],
    properties: IProperty[],
    flavonoids: IProperty[],
    caloricBreakdown: ICaloricBreakDown,
    weightPerServing: {
      amount: number,
      unit: string
    }
  },
  categoryPath: string[]
}