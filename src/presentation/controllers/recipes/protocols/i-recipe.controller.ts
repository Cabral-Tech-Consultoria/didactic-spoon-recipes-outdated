import {BaseQueryStringSearch} from '../../../../infra/protocols/interfaces'
import {APIGatewayProxyResult} from 'aws-lambda'
import {QueryAutocompleteSearch} from '../../../../infra/protocols/interfaces'
import {QueryIngredients} from '../../../../infra/protocols/interfaces'
import {INutrients} from '../../../../domain/protocols/interfaces/nutrients.interface'
import {QueryRandom} from '../../../../infra/protocols/interfaces'
import {QuerySimilar} from '../../../../infra/protocols/interfaces'

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