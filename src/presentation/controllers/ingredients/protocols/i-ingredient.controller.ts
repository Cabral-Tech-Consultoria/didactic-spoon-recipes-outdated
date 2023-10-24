import {QueryIngredientSearch} from '../../../../infra/protocols/interfaces'
import {APIGatewayProxyResult} from 'aws-lambda'
import {QueryIngredientById} from '../../../../infra/protocols/interfaces'
import {
	QueryComputeIngredientNutrientAmount
} from '../../../../infra/protocols/interfaces'
import {QueryConvertAmounts} from '../../../../infra/protocols/interfaces'
import {
	QueryAutocompleteIngredientSearch
} from '../../../../infra/protocols/interfaces'
import {
	QueryIngredientSubstitutes
} from '../../../../infra/protocols/interfaces/query-ingredient-substitutes.interface'

export interface IIngredientController {
  search(params?: QueryIngredientSearch): Promise<APIGatewayProxyResult>
  getIngredientById(id?: number, params?: QueryIngredientById): Promise<APIGatewayProxyResult>
  computeIngredientNutrientAmount(id?: number, params?: QueryComputeIngredientNutrientAmount): Promise<APIGatewayProxyResult>
  convertAmounts(params?: QueryConvertAmounts): Promise<APIGatewayProxyResult>
  autocompleteIngredientsSearch(params?: QueryAutocompleteIngredientSearch): Promise<APIGatewayProxyResult>
  getIngredientSubstitutes(params?: QueryIngredientSubstitutes): Promise<APIGatewayProxyResult>
}