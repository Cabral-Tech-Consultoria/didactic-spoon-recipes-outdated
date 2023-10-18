import logger from '../../../infra/logger/log'
import {BaseQueryStringSearch} from '../../../infra/protocols/interfaces/querystring.interface'
import {IRecipe} from '../../../domain/protocols/interfaces/recipe.interface'
import { default as RecipeService } from '../../../infra/http'
import {APIGatewayProxyResult} from 'aws-lambda'
import {noContent, ok} from '../../../infra/http'
import {internalServerError} from '../../../infra/error/http/error'

export const get = async (params: BaseQueryStringSearch): Promise<APIGatewayProxyResult> => {
	try {
		logger.info({ message: 'Params obtained from client', body: params })

		logger.info({ message: 'Converted querystring params', body: params })

		const { data } = await RecipeService
			.http
			.get<{ results: IRecipe[] }>('/complexSearch', { params })

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