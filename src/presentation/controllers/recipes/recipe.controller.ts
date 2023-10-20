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

@injectable()
export class RecipeController implements IRecipeController {
	constructor(@inject(TYPES_DI.RecipeService) private service: IRecipeService) {}

	async get(params: BaseQueryStringSearch): Promise<APIGatewayProxyResult>  {
		try {
			logger.info({ message: 'Params obtained from client', body: params })

			logger.info({ message: 'Converted querystring params', body: params })

			const { data } = await this.service.get(params)

			logger.info({ message: 'Items returned from recipe api', body: data.results })

			if (!data.results.length) {
				logger.info({ message: 'No data received' })
				return noContent()
			}

			logger.info({ message: 'Return the data received' })
			return ok<IRecipe[]>(data.results)
		} catch {
			return internalServerError()
		}
	}

	async getAutocompleteSearch(params?: QueryAutocompleteSearch): Promise<APIGatewayProxyResult> {
		try {
			if (!params?.query) {
				return missingParamError('query')
			}

			const { data } = await this.service.getAutocompleteSearch(params)

			if (!data.length) {
				return noContent()
			}

			return ok<IAutocompleteSearch[]>(data)
		} catch {
			return internalServerError()
		}
	}

	async getById(id?: number, includeNutrition?: boolean): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}

			const { data } = await this.service.getById(id, includeNutrition)

			if (!data) {
				return badRequestError()
			}

			return ok<IRecipeInfo>(data)
		} catch {
			return internalServerError()
		}
	}

	async getByIngredients(params: QueryIngredients): Promise<APIGatewayProxyResult> {
		try {
			if (!params.ingredients) {
				return missingParamError('ingredients')
			}

			const { data } = await this.service.getByIngredients(params)

			if (!data.length) {
				return noContent()
			}

			return ok<IRecipeIngredientsInfo[]>(data)
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

				const { data } = await this.service.getByNutrients(params)

				logger.info({ message: 'Recipes obtained from api', body: data })

				return ok(data)
			}

			logger.info({ message: 'Search for recipes based on these params', body: nutrients })

			const { data } = await this.service.getByNutrients({ ...nutrients })

			logger.info({ message: 'Recipes obtained from api', body: data })

			if (!data.length) {
				logger.info({ message: 'Return no content if none is found' })

				return noContent()
			}

			logger.info({ message: 'Recipes obtained from api', body: data })

			return ok(data)
		} catch {
			return internalServerError()
		}
	}

	async getRandom(params?: QueryRandom): Promise<APIGatewayProxyResult> {
		try {
			const { data } = await this.service.getRandom(params)

			return ok<IRandomRecipes[]>(data)
		} catch {
			return internalServerError()
		}
	}

	async getRecipeNutrition(id?: number): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}

			const { data } = await this.service.getRecipeNutrition(id)

			if (!data) {
				return badRequestError()
			}

			return ok<INutrition>(data)
		} catch {
			return internalServerError()
		}
	}

	async getSimilarById(id?: number, params?: QuerySimilar): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}
			const { data } = await this.service.getSimilarById(id, params)

			if (!data.length) {
				return noContent()
			}

			return ok<ISimilarRecipe[]>(data)
		} catch {
			return internalServerError()
		}
	}
}