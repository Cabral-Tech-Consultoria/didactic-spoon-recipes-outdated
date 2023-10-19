import {internalServerError, missingParamError} from '../../../infra/error/http/error'
import RecipeService, {noContent, ok} from '../../../infra/http'
import {APIGatewayProxyResult} from 'aws-lambda'
import {ISimilarRecipe} from '../../../domain/protocols/interfaces/recipe.interface'
import {QuerySimilar} from '../../../infra/protocols/interfaces/query-similar.interface'

export const getSimilarById = async (id?: number, params?: QuerySimilar): Promise<APIGatewayProxyResult> => {
	try {
		if (!id) {
			return missingParamError('id')
		}
		const { data } = await RecipeService
			.http
			.get<ISimilarRecipe[]>(`/${id}/similar`, {
				params
			})

		if (!data.length) {
			return noContent()
		}

		return ok<ISimilarRecipe[]>(data)
	} catch {
		return internalServerError()
	}
}