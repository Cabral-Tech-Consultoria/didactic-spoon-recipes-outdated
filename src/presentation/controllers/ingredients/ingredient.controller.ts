import {IIngredientController} from './protocols/i-ingredient.controller'
import {APIGatewayProxyResult} from 'aws-lambda'
import {IIngredientService} from '../../../domain/services/protocols/i-ingredient.service'
import {noContent, ok} from '../../../infra/http'
import {
	badRequestError,
	internalServerError,
	invalidParamError,
	missingParamError
} from '../../../infra/error/http/error'
import {inject, injectable} from 'inversify'
import {TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {IIngredientInfo} from '../../../domain/protocols/interfaces/ingredient.interface'

import {validateRequiredParams} from '../../../main/validations/ingredients'
import {NutrientAmount} from '../../../domain/protocols/interfaces/nutrient-amount.interface'
import {AmountConversion} from '../../../domain/protocols/interfaces/amount-conversion.interface'
import {
	QueryAutocompleteIngredientSearch,
	QueryIngredientSearch,
	QueryIngredientById,
	QueryComputeIngredientNutrientAmount,
	QueryConvertAmounts
} from '../../../infra/protocols/interfaces'
import {
	AutocompleteIngredientSearch
} from '../../../domain/protocols/interfaces/autocomplete-ingredient-search.interface'
import {QueryIngredientSubstitutes} from '../../../infra/protocols/interfaces/query-ingredient-substitutes.interface'
import {IngredientSubstitutes} from '../../../domain/protocols/interfaces/ingredient-substitutes.interface'

@injectable()
export class IngredientController implements IIngredientController {
	constructor(@inject(TYPES_DI.IngredientService) private service: IIngredientService) {}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async search(params?: QueryIngredientSearch): Promise<APIGatewayProxyResult> {
		try {
			if (!params?.query) {
				return missingParamError('query')
			}

			const { data } = await this.service.search(params)

			if (!data.results.length) {
				return noContent()
			}

			return ok(data.results)
		} catch {
			return internalServerError()
		}
	}

	async getIngredientById(id?: number, params?: QueryIngredientById): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}

			const { data } = await this.service.getIngredientById(id, params)

			if (!data) {
				return badRequestError()
			}

			return ok<IIngredientInfo>(data)
		} catch {
			return internalServerError()
		}
	}

	async computeIngredientNutrientAmount(
		id?: number,
		params?: QueryComputeIngredientNutrientAmount
	): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return badRequestError()
			}

			const missingParams = validateRequiredParams<QueryComputeIngredientNutrientAmount>(
				params!,
				['nutrient', 'target']
			)

			if (missingParams.length) {
				return missingParamError(missingParams.join(', '))
			}

			const { data } = await this.service.computeIngredientNutrientAmount(id, params)

			if (!data) {
				return invalidParamError()
			}

			return ok<NutrientAmount>(data)
		} catch (e) {
			return internalServerError()
		}
	}

	async convertAmounts(params?: QueryConvertAmounts): Promise<APIGatewayProxyResult> {
		try {
			if (!params) {
				return badRequestError()
			}

			const requiredParamsMissing = validateRequiredParams<QueryConvertAmounts>(
				params!,
				[
					'ingredientName',
					'sourceAmount',
					'sourceUnit',
					'targetUnit',
				]
			)

			if (requiredParamsMissing.length) {
				return missingParamError(requiredParamsMissing.join(','))
			}

			const { data } = await this.service.convertAmounts(params)

			if (!data) {
				return badRequestError()
			}

			return ok<AmountConversion>(data)
		} catch {
			return internalServerError()
		}
	}

	async autocompleteIngredientsSearch(params?: QueryAutocompleteIngredientSearch): Promise<APIGatewayProxyResult> {
		try {
			if (!params || !params.query) {
				return badRequestError()
			}

			const { data } = await this.service.autocompleteIngredientsSearch(params)

			if (!data) {
				return noContent()
			}

			return ok<AutocompleteIngredientSearch[]>(data)
		} catch {
			return internalServerError()
		}
	}

	async getIngredientSubstitutes(params?: QueryIngredientSubstitutes): Promise<APIGatewayProxyResult> {
		try {
			if (!params?.ingredientName) {
				return badRequestError()
			}

			const { data } = await this.service.getIngredientSubstitutes(params)

			if (!data) {
				return badRequestError()
			}

			return ok<IngredientSubstitutes>(data)
		} catch {
			return internalServerError()
		}
	}
}