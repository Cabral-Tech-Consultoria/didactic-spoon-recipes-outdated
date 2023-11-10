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

import {validateRequiredParams} from '../../../main/validations/validate-required-params'
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
import {IIngredientSearch,} from '../../../domain/protocols/interfaces/ingredient-search.interface'
import {TranslationFactory} from '../../../infra/factories/translation.factory'
import logger from '../../../infra/logger/log'

@injectable()
export class IngredientController implements IIngredientController {
	constructor(
    @inject(TYPES_DI.IngredientService) private ingredientService: IIngredientService,
    @inject(TYPES_DI.TranslationService) private translationService: ITranslationService
	) {
	}

	async search(params?: QueryIngredientSearch): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Received params', payload: params})

			logger.info({message: 'Validates if query was provided'})
			if (!params?.query) {
				logger.warn({message: 'Param query was not provided'})
				const missingError = missingParamError('query')

				logger.error({message: 'The error returned', payload: missingError})
				return missingError
			}

			logger.info({message: 'Start the process to translate query param'})
			const textTranslated = await this
				.translationService
				.translateText(TranslationFactory.make(params.query))
			logger.info({message: 'Translated param', payload: textTranslated})

			logger.info({message: 'Start the process to retrieve the information'})
			const {data} = await this
				.ingredientService
				.search({
					...params,
					query: textTranslated.trans
				})
			logger.info({message: 'Data received', payload: data})

			logger.info({message: 'Verify the length of data returned'})
			if (!data.results.length) {
				logger.info({message: 'Return no content'})
				return noContent()
			}

			logger.info({message: 'Start the process to translate the data received'})
			const {trans} = await this
				.translationService
				.translateJSON<IIngredientSearch[]>({
					to: 'pt',
					from: 'en',
					json: data.results,
					protected_paths: ['image']
				})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if the data translated is not empty'})
			if (!trans) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return the data'})
			return ok<IIngredientSearch[]>(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getIngredientById(id?: number, params?: QueryIngredientById): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: {id, params}})

			logger.info({message: 'Verify if id is empty'})
			if (!id) {
				logger.error({message: 'Id was no provided'})
				const missingError = missingParamError('id')

				logger.error({message: 'Error to be returned', error: missingError})
				return missingError
			}

			logger.info({message: 'Start the process to get the ingredient'})
			const {data} = await this.ingredientService.getIngredientById(id, params)
			logger.info({message: 'Data received', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data) {
				logger.error({message: 'Return bad request error'})
				return badRequestError()
			}

			logger.info({message: 'Start the process to translated the data'})
			const {trans} = await this
				.translationService
				.translateJSON<IIngredientInfo>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: ['image']
				})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if translation is empty'})
			if (!trans) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return the data'})
			return ok<IIngredientInfo>(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async computeIngredientNutrientAmount(
		id?: number,
		params?: QueryComputeIngredientNutrientAmount
	): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: {id, params}})

			logger.info({message: 'Verify if id is empty'})
			if (!id) {
				logger.error({message: 'Return bad request error'})
				return badRequestError()
			}

			logger.info({message: 'Check if there are any empty property'})
			const missingParams = validateRequiredParams<QueryComputeIngredientNutrientAmount>(
        params!,
        ['nutrient', 'target']
			)
			logger.info({message: 'The parameters missing', payload: missingParams})

			logger.info({message: 'Verify if there are any missing parameter'})
			if (missingParams.length) {
				const missing = missingParamError(missingParams.join(', '))
				logger.warn({message: 'Parameters missing', payload: missing})

				logger.error({message: 'Return missing param error'})
				return missing
			}

			logger.info({message: 'Start the process to retrieve the data'})
			const {data} = await this.ingredientService.computeIngredientNutrientAmount(id, params)
			logger.info({message: 'Data received', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data) {
				logger.error({message: 'Return invalid param error'})
				return invalidParamError()
			}

			logger.info({message: 'Return the data'})
			return ok<NutrientAmount>(data)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async convertAmounts(params?: QueryConvertAmounts): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: params})

			logger.info({message: 'Verify if the params are empty'})
			if (!params) {
				logger.error({message: 'Return bad request error'})
				return badRequestError()
			}

			logger.info({message: 'Check if required params are empty'})
			const requiredParamsMissing = validateRequiredParams<QueryConvertAmounts>(
        params!,
        ['ingredientName', 'sourceAmount', 'sourceUnit', 'targetUnit']
			)
			logger.info({message: 'Parameters missing', payload: requiredParamsMissing})

			logger.info({message: 'Verify if there are any parameters missing'})
			if (requiredParamsMissing.length) {
				const missing = missingParamError(requiredParamsMissing.join(','))
				logger.error({message: 'Error to be returned', payload: missing})
				return missing
			}

			logger.info({message: 'Start the process to translate the received params'})
			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.ingredientName)
				)
			logger.info({message: 'Translated text', payload: textTranslated})

			logger.info({message: 'Start the process to convert the amounts'})
			const {data} = await this
				.ingredientService
				.convertAmounts({
					...params,
					ingredientName: textTranslated.trans
				})
			logger.info({message: 'Data received', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data) {
				logger.error({message: 'Return bad request error'})
				return badRequestError()
			}

			logger.info({message: 'Start the process to translate data received'})
			const {trans} = await this
				.translationService
				.translateJSON<AmountConversion>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: []
				})
			logger.info({message: 'Translated data', payload: trans})

			logger.info({message: 'Verify if translated return is empty'})
			if (!trans) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return the data'})
			return ok<AmountConversion>(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async autocompleteIngredientsSearch(params?: QueryAutocompleteIngredientSearch): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: params})

			logger.info({message: 'Verify if params and query are empty'})
			if (!params || !params.query) {
				logger.error({message: 'Return bad request error'})
				return badRequestError()
			}

			logger.info({message: 'Start the process to translate the parameters received'})
			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.query)
				)
			logger.info({message: 'Data translated', payload: textTranslated})

			logger.info({message: 'Start the process to retrieve the data'})
			const {data} = await this
				.ingredientService
				.autocompleteIngredientsSearch({
					...params,
					query: textTranslated.trans
				})
			logger.info({message: 'Data retrieved', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data) {
				logger.warn({message: 'Return no content'})
				return noContent()
			}

			logger.info({message: 'Start the process to translate the data received'})
			const {trans} = await this
				.translationService
				.translateJSON<AutocompleteIngredientSearch[]>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: []
				})
			logger.info({message: 'Data translated'})

			logger.info({message: 'Verify if data translated is empty'})
			if (!trans) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return the data'})
			return ok<AutocompleteIngredientSearch[]>(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getIngredientSubstitutes(params?: QueryIngredientSubstitutes): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: params})

			logger.info({message: 'Validate the data received'})
			if (!params?.ingredientName) {
				logger.error({message: 'Return bad request error'})
				return badRequestError()
			}

			logger.info({message: 'Start the translation params process', payload: params})
			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.ingredientName)
				)
			logger.info({message: 'Translated params', payload: {ingredientName: textTranslated.trans}})

			logger.info({message: 'Start the process to get the ingredients substitutes'})
			const {data} = await this
				.ingredientService
				.getIngredientSubstitutes({
					...params,
					ingredientName: textTranslated.trans
				})
			logger.info({message: 'Data received', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data) {
				logger.error({message: 'Return bad request error'})
				return badRequestError()
			}

			logger.info({message: 'Start the process to translate the result'})
			const {trans} = await this
				.translationService
				.translateJSON<IngredientSubstitutes>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: []
				})
			logger.info({message: 'Data received from translation service', payload: trans})

			logger.info({message: 'Verify if the translation is empty'})
			if (!trans) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return the data'})
			return ok<IngredientSubstitutes>(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}
}