import {noContent, ok} from '../../../infra/http'
import {BaseQueryStringSearch} from '../../../infra/protocols/interfaces/querystring.interface'
import {APIGatewayProxyResult} from 'aws-lambda'
import logger from '../../../infra/logger/log'
import {IRecipe, ISimilarRecipe} from '../../../domain/protocols/interfaces/recipe.interface'
import {badRequestError, internalServerError, missingParamError} from '../../../infra/error/http/error'
import {IRandomRecipes, IRecipeInfo} from '../../../domain/protocols/interfaces/recipe-info.interface'
import {QueryIngredients} from '../../../infra/protocols/interfaces/query-ingredients.interface'
import {IRecipeIngredientsInfo} from '../../../domain/protocols/interfaces/ingredient.interface'
import {QueryAutocompleteSearch} from '../../../infra/protocols/interfaces/query-autocomplete-search.interface'
import {IAutocompleteSearch} from '../../../domain/protocols/interfaces/autocomplete-search.interface'
import {INutrients} from '../../../domain/protocols/interfaces/nutrients.interface'
import {IsObjectEmpty} from '../../../utils/objects/check-null-properties'
import {QueryRandom} from '../../../infra/protocols/interfaces/query-random.intreface'
import {INutrition} from '../../../domain/protocols/interfaces/nutrition.interface'
import {QuerySimilar} from '../../../infra/protocols/interfaces/query-similar.interface'
import {IRecipeController} from './protocols/i-recipe.controller'
import {inject, injectable} from 'inversify'
import {IRecipeService} from '../../../domain/services/protocols/i-recipe.service'
import {TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {ITranslationService} from '../../../domain/services/protocols/i-translation.service'

@injectable()
export class RecipeController implements IRecipeController {
	constructor(
		@inject(TYPES_DI.RecipeService) private recipeService: IRecipeService,
		@inject(TYPES_DI.TranslationService) private translationService: ITranslationService
	) {}

	async get(params: BaseQueryStringSearch): Promise<APIGatewayProxyResult>  {
		try {
			logger.info({ message: 'Params obtained from client', body: params })

			logger.info({ message: 'Converted querystring params', body: params })

			const { data } = await this.recipeService.get(params)

			logger.info({ message: 'Items returned from recipe api', body: data.results })

			if (!data.results.length) {
				logger.info({ message: 'No data received' })
				return noContent()
			}

			const { trans } = await this.translationService.translateJSON<IRecipe[]>({
				to: 'pt',
				from: 'en',
				json: data.results,
				protected_paths: []
			})

			if (!trans.length) {
				return internalServerError()
			}

			logger.info({ message: 'Return the data received' })
			return ok(trans)
		} catch {
			return internalServerError()
		}
	}

	async getAutocompleteSearch(params?: QueryAutocompleteSearch): Promise<APIGatewayProxyResult> {
		try {
			if (!params?.query) {
				return missingParamError('query')
			}

			const { data } = await this.recipeService.getAutocompleteSearch(params)

			if (!data.length) {
				return noContent()
			}

			const { trans } = await this.translationService.translateJSON<IAutocompleteSearch[]>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: []
			})

			if (!trans.length) {
				return internalServerError()
			}

			return ok(trans)
		} catch {
			return internalServerError()
		}
	}

	async getById(id?: number, includeNutrition?: boolean): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}

			const { data } = await this.recipeService.getById(id, includeNutrition)

			if (!data) {
				return badRequestError()
			}

			const { trans } = await this.translationService.translateJSON<IRecipeInfo>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: ['image']
			})

			if (!trans) {
				return internalServerError()
			}

			return ok(trans)
		} catch {
			return internalServerError()
		}
	}

	async getByIngredients(params: QueryIngredients): Promise<APIGatewayProxyResult> {
		try {
			if (!params.ingredients) {
				return missingParamError('ingredients')
			}

			const { data } = await this.recipeService.getByIngredients(params)

			if (!data.length) {
				return noContent()
			}

			const { trans } = await this.translationService.translateJSON<IRecipeIngredientsInfo[]>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: ['image']
			})

			if (!trans.length) {
				return internalServerError()
			}

			return ok(trans)
		} catch {
			return internalServerError()
		}
	}

	async getByNutrients(nutrients: INutrients): Promise<APIGatewayProxyResult> {
		try {
			logger.info({ message: 'Params obtained from client', body: nutrients })

			logger.info({ message: 'Verify if all properties are empty' })
			if (IsObjectEmpty(nutrients)) {
				const params = { ...nutrients, random: true }

				logger.info({ message: 'Search for recipes based on these params', body: params })

				const { data } = await this.recipeService.getByNutrients(params)

				logger.info({ message: 'Recipes obtained from api', body: data })

				return ok(data)
			}

			logger.info({ message: 'Search for recipes based on these params', body: nutrients })

			const { data } = await this.recipeService.getByNutrients({ ...nutrients })

			logger.info({ message: 'Recipes obtained from api', body: data })

			if (!data.length) {
				logger.info({ message: 'Return no content if none is found' })

				return noContent()
			}

			const { trans } = await this.translationService.translateJSON<IRecipe[]>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: []
			})

			if (!trans.length) {
				return internalServerError()
			}

			logger.info({ message: 'Recipes obtained from api', body: data })

			return ok(trans)
		} catch {
			return internalServerError()
		}
	}

	async getRandom(params?: QueryRandom): Promise<APIGatewayProxyResult> {
		try {
			const { data } = await this.recipeService.getRandom(params)

			if (!data.recipes.length) {
				return internalServerError()
			}

			const { trans } = await this.translationService.translateJSON<IRandomRecipes>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: []
			})

			if (!trans.recipes.length) {
				return internalServerError()
			}

			return ok(trans)
		} catch {
			return internalServerError()
		}
	}

	async getRecipeNutrition(id?: number): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}

			const { data } = await this.recipeService.getRecipeNutrition(id)

			if (!data) {
				return badRequestError()
			}

			const { trans } = await this.translationService.translateJSON<INutrition>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: []
			})

			if (!trans) {
				return internalServerError()
			}

			return ok<INutrition>(trans)
		} catch {
			return internalServerError()
		}
	}

	async getSimilarById(id?: number, params?: QuerySimilar): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}
			const { data } = await this.recipeService.getSimilarById(id, params)

			if (!data.length) {
				return noContent()
			}

			const { trans } = await this.translationService.translateJSON<ISimilarRecipe[]>({
				to: 'pt',
				from: 'en',
				json: data,
				protected_paths: []
			})

			if (!trans.length) {
				return internalServerError()
			}

			return ok(trans)
		} catch {
			return internalServerError()
		}
	}
}