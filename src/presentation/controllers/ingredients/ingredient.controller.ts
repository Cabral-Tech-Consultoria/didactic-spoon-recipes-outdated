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
	QueryComputeIngredientNutrientAmount,
	QueryConvertAmounts,
	QueryIngredientById,
	QueryIngredientSearch
} from '../../../infra/protocols/interfaces'
import {
	AutocompleteIngredientSearch
} from '../../../domain/protocols/interfaces/autocomplete-ingredient-search.interface'
import {QueryIngredientSubstitutes} from '../../../infra/protocols/interfaces/query-ingredient-substitutes.interface'
import {IngredientSubstitutes} from '../../../domain/protocols/interfaces/ingredient-substitutes.interface'
import {ITranslationService} from '../../../domain/services/protocols/i-translation.service'
import {
	IIngredientSearch,
} from '../../../domain/protocols/interfaces/ingredient-search.interface'
import {TranslationFactory} from '../../../infra/factories/translation.factory'

@injectable()
export class IngredientController implements IIngredientController {
	constructor(
		@inject(TYPES_DI.IngredientService) private ingredientService: IIngredientService,
		@inject(TYPES_DI.TranslationService) private translationService: ITranslationService
	) {}

	async search(params?: QueryIngredientSearch): Promise<APIGatewayProxyResult> {
		try {
			if (!params?.query) {
				return missingParamError('query')
			}

			const textTranslated = await this
				.translationService
				.translateText(TranslationFactory.make(params.query))

			const { data } = await this
				.ingredientService
				.search({
					...params,
					query: textTranslated.trans
				})

			if (!data.results.length) {
				return noContent()
			}

			const { trans } = await this
				.translationService
				.translateJSON<IIngredientSearch[]>({
					to: 'pt',
					from: 'en',
					json: data.results,
					protected_paths: ['image']
				})

			if (!trans) {
				return internalServerError()
			}

			return ok<IIngredientSearch[]>(trans)
		} catch {
			return internalServerError()
		}
	}

	async getIngredientById(id?: number, params?: QueryIngredientById): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}

			const { data } = await this.ingredientService.getIngredientById(id, params)

			if (!data) {
				return badRequestError()
			}

			const { trans } = await this
				.translationService
				.translateJSON<IIngredientInfo>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: ['image']
				})

			if (!trans) {
				return internalServerError()
			}

			return ok<IIngredientInfo>(trans)
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

			const { data } = await this.ingredientService.computeIngredientNutrientAmount(id, params)

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
				[ 'ingredientName', 'sourceAmount', 'sourceUnit', 'targetUnit' ]
			)

			if (requiredParamsMissing.length) {
				return missingParamError(requiredParamsMissing.join(','))
			}

			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.ingredientName)
				)

			const { data } = await this
				.ingredientService
				.convertAmounts({
					...params,
					ingredientName: textTranslated.trans
				})

			if (!data) {
				return badRequestError()
			}

			const { trans } = await this
				.translationService
				.translateJSON<AmountConversion>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: []
				})

			if (!trans) {
				return internalServerError()
			}

			return ok<AmountConversion>(trans)
		} catch {
			return internalServerError()
		}
	}

	async autocompleteIngredientsSearch(params?: QueryAutocompleteIngredientSearch): Promise<APIGatewayProxyResult> {
		try {
			if (!params || !params.query) {
				return badRequestError()
			}

			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.query)
				)

			const { data } = await this
				.ingredientService
				.autocompleteIngredientsSearch({
					...params,
					query: textTranslated.trans
				})

			if (!data) {
				return noContent()
			}

			const { trans } = await this
				.translationService
				.translateJSON<AutocompleteIngredientSearch[]>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: []
				})

			if (!trans) {
				return internalServerError()
			}

			return ok<AutocompleteIngredientSearch[]>(trans)
		} catch {
			return internalServerError()
		}
	}

	async getIngredientSubstitutes(params?: QueryIngredientSubstitutes): Promise<APIGatewayProxyResult> {
		try {
			if (!params?.ingredientName) {
				return badRequestError()
			}

			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.ingredientName)
				)

			const { data } = await this
				.ingredientService
				.getIngredientSubstitutes({
					...params,
					ingredientName: textTranslated.trans
				})

			if (!data) {
				return badRequestError()
			}

			const { trans } = await this
				.translationService
				.translateJSON<IngredientSubstitutes>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: []
				})

			if (!trans) {
				return internalServerError()
			}

			return ok<IngredientSubstitutes>(trans)
		} catch {
			return internalServerError()
		}
	}
}