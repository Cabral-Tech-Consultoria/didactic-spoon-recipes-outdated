import {ImageType} from './recipe-info.interface'

export interface IRecipe {
  id: number,
  title: string,
  image: string,
  imageType: ImageType,
}

export interface ISimilarRecipe {
  id: number,
  title: string,
  imageType: ImageType,
  readyInMinutes: number,
  servings: number,
  sourceUrl: string
}