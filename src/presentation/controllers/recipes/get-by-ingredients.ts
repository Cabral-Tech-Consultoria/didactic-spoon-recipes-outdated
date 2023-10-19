import {QueryIngredients} from '../../../infra/protocols/interfaces/query-ingredients.interface'
import {internalServerError, missingParamError} from '../../../infra/error/http/error'
import RecipeService, {noContent, ok} from '../../../infra/http'
import {APIGatewayProxyResult} from 'aws-lambda'
import {IRecipeIngredientsInfo} from '../../../domain/protocols/interfaces/ingredient.interface'

export const getByIngredients = async (params: QueryIngredients): Promise<APIGatewayProxyResult> => {
	try {
		if (!params.ingredients) {
			return missingParamError('ingredients')
		}

		const { data } = await RecipeService
			.http
			.get<IRecipeIngredientsInfo[]>('findByIngredient', {
				params
			})

		if (!data.length) {
			return noContent()
		}

		return ok<IRecipeIngredientsInfo[]>(data)
	} catch {
		return internalServerError()
	}
}