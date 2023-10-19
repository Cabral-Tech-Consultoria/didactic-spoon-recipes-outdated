import {QueryRandom} from '../../../infra/protocols/interfaces/query-random.intreface'
import RecipeService, {ok} from '../../../infra/http'
import {APIGatewayProxyResult} from 'aws-lambda'
import {internalServerError} from '../../../infra/error/http/error'
import {IRandomRecipes} from '../../../domain/protocols/interfaces/recipe-info.interface'

export const getRandom = async (params?: QueryRandom): Promise<APIGatewayProxyResult> => {
	try {
		const { data } = await RecipeService
			.http
			.get<IRandomRecipes[]>('/random', {
				params
			})

		return ok<IRandomRecipes[]>(data)
	} catch {
		return internalServerError()
	}
}