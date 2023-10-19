import { APIGatewayProxyResult } from 'aws-lambda'
import { internalServerError } from '../../../infra/error/http/error'
import RecipeService, {noContent, ok} from '../../../infra/http'
import {INutrients} from '../../../domain/protocols/interfaces/nutrients.interface'
import {IsObjectEmpty} from '../../../utils/objects/check-null-properties'
import {IRecipe} from '../../../domain/protocols/interfaces/recipe.interface'
import logger from '../../../infra/logger/log'

export const getByNutrients = async (nutrients: INutrients): Promise<APIGatewayProxyResult> => {
	try {
		logger.info({ message: 'Params obtained from client', body: nutrients })
		const url: string = '/findByNutrients'

		logger.info({ message: 'Verify if all properties are empty' })
		if (IsObjectEmpty(nutrients)) {
			const params = { ...nutrients, random: true }

			logger.info({ message: 'Search for recipes based on these params', body: params })

			const { data } = await RecipeService
				.http
				.get(url, {params})

			logger.info({ message: 'Recipes obtained from api', body: data })

			return ok(data)
		}

		logger.info({ message: 'Search for recipes based on these params', body: nutrients })

		const { data } = await RecipeService
			.http
			.get<IRecipe[]>(url, {
				params: { ...nutrients }
			})

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