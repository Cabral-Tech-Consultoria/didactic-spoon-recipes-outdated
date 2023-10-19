import {BaseQueryStringSearch} from '../../../protocols/interfaces/querystring.interface'
import {QueryAutocompleteSearch} from '../../../protocols/interfaces/query-autocomplete-search.interface'
import {QueryIngredients} from '../../../protocols/interfaces/query-ingredients.interface'
import {INutrients} from '../../../../domain/protocols/interfaces/nutrients.interface'
import {QueryRandom} from '../../../protocols/interfaces/query-random.intreface'
import {QuerySimilar} from '../../../protocols/interfaces/query-similar.interface'
import {IRecipe, ISimilarRecipe} from '../../../../domain/protocols/interfaces/recipe.interface'
import {IAutocompleteSearch} from '../../../../domain/protocols/interfaces/autocomplete-search.interface'
import {IRandomRecipes, IRecipeInfo} from '../../../../domain/protocols/interfaces/recipe-info.interface'
import {IRecipeIngredientsInfo} from '../../../../domain/protocols/interfaces/ingredient.interface'
import {INutrition} from '../../../../domain/protocols/interfaces/nutrition.interface'
import {AxiosResponse} from 'axios'

export interface IRecipeService {
  get(params: BaseQueryStringSearch): Promise<AxiosResponse<{results: IRecipe[] }>>
  getAutocompleteSearch(params?: QueryAutocompleteSearch): Promise<AxiosResponse<IAutocompleteSearch[]>>
  getById(id?: number, includeNutrition?: boolean): Promise<AxiosResponse<IRecipeInfo>>
  getByIngredients(params: QueryIngredients): Promise<AxiosResponse<IRecipeIngredientsInfo[]>>
  getByNutrients(nutrients: INutrients): Promise<AxiosResponse<IRecipe[]>>
  getRandom(params?: QueryRandom): Promise<AxiosResponse<IRandomRecipes[]>>
  getRecipeNutrition(id?: number): Promise<AxiosResponse<INutrition>>
  getSimilarById(id?: number, params?: QuerySimilar): Promise<AxiosResponse<ISimilarRecipe[]>>
}