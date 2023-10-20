import {QueryIngredientSearch} from '../../../../infra/protocols/interfaces/query-ingredient-search.interface'
import {APIGatewayProxyResult} from 'aws-lambda'
import {QueryIngredientById} from '../../../../infra/protocols/interfaces/query-ingredient-by-id.interface'

export interface IIngredientController {
  search(params?: QueryIngredientSearch): Promise<APIGatewayProxyResult>
  getIngredientById(id?: number, params?: QueryIngredientById): Promise<APIGatewayProxyResult>
}