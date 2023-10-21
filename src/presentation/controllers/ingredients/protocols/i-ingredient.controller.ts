import {QueryIngredientSearch} from '../../../../infra/protocols/interfaces/query-ingredient-search.interface'
import {APIGatewayProxyResult} from 'aws-lambda'
import {QueryIngredientById} from '../../../../infra/protocols/interfaces/query-ingredient-by-id.interface'
import {
	QueryComputeIngredientNutrientAmount
} from '../../../../infra/protocols/interfaces/query-compute-ingredient-nutrient-amount.interface'
import {QueryConvertAmounts} from '../../../../infra/protocols/interfaces/query-convert-amounts.interface'

export interface IIngredientController {
  search(params?: QueryIngredientSearch): Promise<APIGatewayProxyResult>
  getIngredientById(id?: number, params?: QueryIngredientById): Promise<APIGatewayProxyResult>
  computeIngredientNutrientAmount(id?: number, params?: QueryComputeIngredientNutrientAmount): Promise<APIGatewayProxyResult>
  convertAmounts(params?: QueryConvertAmounts): Promise<APIGatewayProxyResult>
}