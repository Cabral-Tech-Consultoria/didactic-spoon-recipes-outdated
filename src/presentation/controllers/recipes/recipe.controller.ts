import {noContent, ok} from '../../../infra/http'
import {
	BaseQueryStringSearch,
	QueryAutocompleteSearch,
	QueryIngredients,
	QueryRandom,
	QuerySimilar
} from '../../../infra/protocols/interfaces'
import {APIGatewayProxyResult} from 'aws-lambda'
import logger from '../../../infra/logger/log'
import {IRecipe, ISimilarRecipe} from '../../../domain/protocols/interfaces/recipe.interface'
import {badRequestError, internalServerError, missingParamError} from '../../../infra/error/http/error'
import {IRecipeInfo} from '../../../domain/protocols/interfaces/recipe-info.interface'
import {IRecipeIngredientsInfo} from '../../../domain/protocols/interfaces/ingredient.interface'
import {IAutocompleteSearch} from '../../../domain/protocols/interfaces/autocomplete-search.interface'
import {INutrients} from '../../../domain/protocols/interfaces/nutrients.interface'
import {IsObjectEmpty} from '../../../utils/objects/check-null-properties'
import {IRecipeController} from './protocols/i-recipe.controller'
import {inject, injectable} from 'inversify'
import {IRecipeService} from '../../../domain/services/protocols/i-recipe.service'
import {TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {ITranslationService} from '../../../domain/services/protocols/i-translation.service'
import {TranslationFactory} from '../../../infra/factories/translation.factory'

@injectable()
export class RecipeController implements IRecipeController {
	constructor(
    @inject(TYPES_DI.RecipeService) private recipeService: IRecipeService,
    @inject(TYPES_DI.TranslationService) private translationService: ITranslationService
	) {
	}

	async get(params: BaseQueryStringSearch): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: params})

			logger.info({message: 'Verify if query is empty'})
			if (!params.query) {
				const missing = missingParamError('query')
				logger.error({message: 'Error to be returned', payload: missing})

				logger.error({message: 'Return missing param error'})
				return missing
			}

			logger.info({message: 'Start the process to translate the query param'})
			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.query)
				)
			logger.info({message: 'Param translated', body: textTranslated})

			logger.info({message: 'Start the process to retrieve the data'})
			const {data} = await this
				.recipeService
				.get({...params, query: textTranslated.trans})
			logger.info({message: 'Data retrieved', payload: data})

			logger.info({message: 'Verify if data results are empty'})
			if (!data.results.length) {
				logger.info({message: 'Return no content'})
				return noContent()
			}

			logger.info({message: 'Start the process to translate the data'})
			const {trans} = await this.translationService.translateJSON<IRecipe[]>({
				to: 'pt',
				from: 'en',
				json: data.results,
				protected_paths: []
			})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if data translated is empty'})
			if (!trans.length) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return the data received'})
			return ok(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getAutocompleteSearch(params?: QueryAutocompleteSearch): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: params})

			logger.info({message: 'Verify if param query is empty'})
			if (!params?.query) {
				const missing = missingParamError('query')
				logger.error({message: 'Error to be returned', payload: missing})
				return missing
			}

			logger.info({message: 'Start the process to translate the parameters received'})
			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.query)
				)
			logger.info({message: 'Parameters received', payload: textTranslated})

			logger.info({message: 'Start the process to retrieve the data'})
			const {data} = await this
				.recipeService
				.getAutocompleteSearch({
					...params,
					query: textTranslated.trans
				})
			logger.info({message: 'Data retrieved', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data.length) {
				logger.warn({message: 'Return no content'})
				return noContent()
			}

			logger.info({message: 'Start the process to translate the data received'})
			const {trans} = await this
				.translationService
				.translateJSON<IAutocompleteSearch[]>({
					to: 'pt',
					from: 'en',
					json: data,
					protected_paths: []
				})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if the translation is empty'})
			if (!trans.length) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return the data received'})
			return ok(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getById(id?: number, includeNutrition?: boolean): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: {id, includeNutrition}})

			logger.info({message: 'Verify if id is empty'})
			if (!id) {
				const missing = missingParamError('id')
				logger.error({message: 'Error to be returned', payload: missing})

				logger.error({message: 'Return missing param error'})
				return missing
			}

			logger.info({message: 'Start the process to retrieved the data'})
			const {data} = await this.recipeService.getById(id, includeNutrition)
			logger.info({message: 'Data received', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data) {
				logger.error({message: 'Return bad request error'})
				return badRequestError()
			}

			logger.info({message: 'Start the process to translate the data'})
			const {trans} = await this.translationService.translateJSON<IRecipeInfo>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: ['image']
			})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if the data translated is empty'})
			if (!trans) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return the data'})
			return ok(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getByIngredients(params: QueryIngredients): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: params})

			logger.info({message: 'Verify if params ingredients are empty'})
			if (!params.ingredients) {
				const missing = missingParamError('ingredients')
				logger.error({message: 'Error to be returned', payload: missing})

				logger.error({message: 'Return missing param error'})
				return missing
			}

			logger.info({message: 'Start the process to translate the parameters'})
			const textTranslated = await this
				.translationService
				.translateText(
					TranslationFactory.make(params.ingredients)
				)
			logger.info({message: 'Parameters translated', payload: textTranslated})

			logger.info({message: 'Start the process to retrieve the data'})
			const {data} = await this
				.recipeService
				.getByIngredients({
					...params,
					ingredients: textTranslated.trans
				})
			logger.info({message: 'Data retrieved', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data.length) {
				logger.warn({message: 'Return no content'})
				return noContent()
			}

			logger.info({message: 'Start the process to translate data'})
			const {trans} = await this.translationService.translateJSON<IRecipeIngredientsInfo[]>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: ['image']
			})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if data translated is empty'})
			if (!trans.length) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return data translated'})
			return ok(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getByNutrients(nutrients: INutrients): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: nutrients})
			let params = {...nutrients}

			logger.info({message: 'Verify if the object is empty'})
			if (IsObjectEmpty(nutrients)) {
				logger.info({message: 'Assign true to random property'})
				params = {...nutrients, random: true}
			}

			logger.info({message: 'Start the process to retrieve the data'})
			const {data} = await this.recipeService.getByNutrients(params)
			logger.info({message: 'Data retrieved', payload: data})

			logger.info({message: 'Verify if data is empty'})
			if (!data.length) {
				logger.warn({message: 'Return no content'})
				return noContent()
			}

			logger.info({message: 'Start the process to translate the data received'})
			const {trans} = await this.translationService.translateJSON<IRecipe[]>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: []
			})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if the translated data is empty'})
			if (!trans.length) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return data translated'})
			return ok(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getRandom(params?: QueryRandom): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameters received', payload: params})

			logger.info({message: 'Start the process to retrieve data'})
			const {data} = await this.recipeService.getRandom(params)
			logger.info({message: 'Retrieved data', payload: data})

			logger.info({message: 'Verify if data recipes are empty'})
			if (!data.recipes.length) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Map the random recipe'})
			const mappedRecipes = data
				.recipes
				.map(({
					id, title, dishTypes, diets
				}) => ({
					id, title, dishTypes, diets
				}))
			logger.info({message: 'Random recipe mapped', payload: mappedRecipes})

			logger.info({message: 'Start the process to translate the data received'})
			const {trans} = await this.translationService.translateJSON({
				to: 'pt',
				from: 'en',
				json: mappedRecipes,
				protected_paths: []
			})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if data translated is empty'})
			if (!trans.length) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return data translated'})
			return ok(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getRecipeNutrition(id?: number): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameter received', payload: id})

			logger.info({message: 'Verify if id is empty'})
			if (!id) {
				const missing = missingParamError('id')
				logger.error({message: 'Error to be returned', payload: missing})

				logger.error({message: 'Return missing param error'})
				return missing
			}

			logger.info({message: 'Start the process to retrieve data'})
			const {data} = await this.recipeService.getRecipeNutrition(id)
			logger.info({message: 'Retrieved data', payload: data})

			logger.info({message: 'Verify if data recipes are empty'})
			if (!data) {
				return badRequestError()
			}

			const {
				good,
				bad,
				properties,
				caloricBreakdown,
				calories,
				carbs,
				fat,
				protein,
				ingredients
			} = data

			const filteredIngredients = ingredients.map((i) => {
				return {
					...i,
					nutrients: i.nutrients.filter((n) => n.amount > 0)
				}
			})

			logger.info({message: '[FIRST]: Start the process to translate the data received'})
			const firstTranslation = await this.translationService.translateJSON({
				to: 'pt',
				from: 'en',
				json: {
					good, bad, properties,
					caloricBreakdown, calories,
					carbs, fat, protein
				},
				protected_paths: []
			})

			logger.info({message: '[SECOND]: Start the process to translate the data received'})
			const secondTranslation = await this.translationService.translateJSON({
				to: 'pt',
				from: 'en',
				json: {ingredients: filteredIngredients},
				protected_paths: []
			})


			logger.info({message: 'Data translated', payload: {...firstTranslation.trans, ...secondTranslation.trans}})

			logger.info({message: 'Verify if translated data is empty'})
			if (!firstTranslation.trans && !secondTranslation.trans) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return data translated'})
			return ok({...firstTranslation.trans, ...secondTranslation.trans})
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}

	async getSimilarById(id?: number, params?: QuerySimilar): Promise<APIGatewayProxyResult> {
		try {
			logger.info({message: 'Parameter received', payload: {id, params}})

			logger.info({message: 'Verify if id is empty'})
			if (!id) {
				const missing = missingParamError('id')
				logger.error({message: 'Error to be returned', payload: missing})

				logger.error({message: 'Return missing param error'})
				return missing
			}

			logger.info({message: 'Start the process to retrieve data'})
			const {data} = await this.recipeService.getSimilarById(id, params)
			logger.info({message: 'Verify if data recipes are empty'})

			logger.info({message: 'Verify if data is empty'})
			if (!data.length) {
				logger.warn({message: 'Return no content'})
				return noContent()
			}

			logger.info({message: 'Start the process to translate the data received'})
			const {trans} = await this.translationService.translateJSON<ISimilarRecipe[]>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: []
			})
			logger.info({message: 'Data translated', payload: trans})

			logger.info({message: 'Verify if translated data is empty'})
			if (!trans.length) {
				logger.error({message: 'Return internal server error'})
				return internalServerError()
			}

			logger.info({message: 'Return data translated'})
			return ok(trans)
		} catch (err) {
			logger.error({message: '[ERROR]: Display the error', error: err})
			return internalServerError()
		}
	}
}