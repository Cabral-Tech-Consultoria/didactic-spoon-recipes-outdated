import { APIGatewayProxyResult } from 'aws-lambda'
import { internalServerError } from '../../../infra/error/http/error'
import RecipeService, {noContent, ok} from '../../../infra/http'
import {INutrients} from '../../../domain/protocols/interfaces/nutrients.interface'
import {IsObjectEmpty} from '../../../utils/objects/check-null-properties'
import {IRecipe} from '../../../domain/protocols/interfaces/recipe.interface'

export const getByNutrients = async (nutrients: INutrients): Promise<APIGatewayProxyResult> => {
	try {
		const url: string = '/findByNutrients'
		if (IsObjectEmpty(nutrients)) {
			const { data } = await RecipeService
				.http
				.get(url, {
					params: { ...nutrients, random: true }
				})

			return ok(data)
		}

		const { data } = await RecipeService
			.http
			.get<IRecipe[]>(url, {
				params: { ...nutrients }
			})

		if (data.length) {
			return noContent()
		}

		return ok(data)
	} catch {
		return internalServerError()
	}
}