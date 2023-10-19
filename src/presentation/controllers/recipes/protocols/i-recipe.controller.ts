import {BaseQueryStringSearch} from '../../../../infra/protocols/interfaces/querystring.interface'
import {APIGatewayProxyResult} from 'aws-lambda'
import {QueryAutocompleteSearch} from '../../../../infra/protocols/interfaces/query-autocomplete-search.interface'
import {QueryIngredients} from '../../../../infra/protocols/interfaces/query-ingredients.interface'
import {INutrients} from '../../../../domain/protocols/interfaces/nutrients.interface'
import {QueryRandom} from '../../../../infra/protocols/interfaces/query-random.intreface'
import {QuerySimilar} from '../../../../infra/protocols/interfaces/query-similar.interface'

export interface IRecipeController {
  get(params: BaseQueryStringSearch): Promise<APIGatewayProxyResult>
  getAutocompleteSearch(params?: QueryAutocompleteSearch): Promise<APIGatewayProxyResult>
  getById(id?: number, includeNutrition?: boolean): Promise<APIGatewayProxyResult>
  getByIngredients(params: QueryIngredients): Promise<APIGatewayProxyResult>
  getByNutrients(nutrients: INutrients): Promise<APIGatewayProxyResult>
  getRandom(params?: QueryRandom): Promise<APIGatewayProxyResult>
  getRecipeNutrition(id?: number): Promise<APIGatewayProxyResult>
  getSimilarById(id?: number, params?: QuerySimilar): Promise<APIGatewayProxyResult>
}