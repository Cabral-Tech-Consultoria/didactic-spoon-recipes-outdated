import {QueryIngredientSearch} from '../../../../infra/protocols/interfaces/query-ingredient-search.interface'
import {APIGatewayProxyResult} from 'aws-lambda'

export interface IIngredientController {
  search(params?: QueryIngredientSearch): Promise<APIGatewayProxyResult>
}