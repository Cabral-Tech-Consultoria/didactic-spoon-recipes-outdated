import {APIGatewayProxyResult} from 'aws-lambda'
import {badRequestError, internalServerError, missingParamError} from '../../../infra/error/http/error'
import RecipeService, {ok} from '../../../infra/http'
import {IRecipeInfo} from '../../../domain/protocols/interfaces/recipe-info.interface'

export const getById = async (id: number, includeNutrition: boolean): Promise<APIGatewayProxyResult> => {
	try {
		if (!id) {
			return missingParamError('id')
		}

		const { data } = await RecipeService
			.http
			.get<IRecipeInfo>(`/${id}/information`, { params: { includeNutrition } })

		if (!data) {
			return badRequestError()
		}

		return ok<IRecipeInfo>(data)
	} catch {
		return internalServerError()
	}
}