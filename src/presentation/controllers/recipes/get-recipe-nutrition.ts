import RecipeService, {ok} from '../../../infra/http'
import {badRequestError, internalServerError, missingParamError} from '../../../infra/error/http/error'
import {APIGatewayProxyResult} from 'aws-lambda'
import {INutrition} from '../../../domain/protocols/interfaces/nutrition.interface'

export const getRecipeNutrition = async (id?: number): Promise<APIGatewayProxyResult> => {
	try {
		if (!id) {
			return missingParamError('id')
		}

		const { data } = await RecipeService
			.http
			.get<INutrition>(`/${id}/nutritionWidget.json`)

		if (!data) {
			return badRequestError()
		}

		return ok<INutrition>(data)
	} catch {
		return internalServerError()
	}
}