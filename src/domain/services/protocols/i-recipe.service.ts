import {BaseQueryStringSearch} from '../../../infra/protocols/interfaces'
import {QueryAutocompleteSearch} from '../../../infra/protocols/interfaces'
import {QueryIngredients} from '../../../infra/protocols/interfaces'
import {INutrients} from '../../protocols/interfaces/nutrients.interface'
import {QueryRandom} from '../../../infra/protocols/interfaces'
import {QuerySimilar} from '../../../infra/protocols/interfaces'
import {IRecipe, ISimilarRecipe} from '../../protocols/interfaces/recipe.interface'
import {IAutocompleteSearch} from '../../protocols/interfaces/autocomplete-search.interface'
import {IRandomRecipes, IRecipeInfo} from '../../protocols/interfaces/recipe-info.interface'
import {IRecipeIngredientsInfo} from '../../protocols/interfaces/ingredient.interface'
import {INutrition} from '../../protocols/interfaces/nutrition.interface'
import {AxiosResponse} from 'axios'

export interface IRecipeService {
  get(params: BaseQueryStringSearch): Promise<AxiosResponse<{results: IRecipe[] }>>
  getAutocompleteSearch(params?: QueryAutocompleteSearch): Promise<AxiosResponse<IAutocompleteSearch[]>>
  getById(id?: number, includeNutrition?: boolean): Promise<AxiosResponse<IRecipeInfo>>
  getByIngredients(params: QueryIngredients): Promise<AxiosResponse<IRecipeIngredientsInfo[]>>
  getByNutrients(nutrients: INutrients): Promise<AxiosResponse<IRecipe[]>>
  getRandom(params?: QueryRandom): Promise<AxiosResponse<IRandomRecipes>>
  getRecipeNutrition(id?: number): Promise<AxiosResponse<INutrition>>
  getSimilarById(id?: number, params?: QuerySimilar): Promise<AxiosResponse<ISimilarRecipe[]>>
}