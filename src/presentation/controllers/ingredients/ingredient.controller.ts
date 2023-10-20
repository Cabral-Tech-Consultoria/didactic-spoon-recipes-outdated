import {IIngredientController} from './protocols/i-ingredient.controller'
import {QueryIngredientSearch} from '../../../infra/protocols/interfaces/query-ingredient-search.interface'
import {APIGatewayProxyResult} from 'aws-lambda'
import {IIngredientService} from '../../../domain/services/protocols/i-ingredient.service'
import {noContent, ok} from '../../../infra/http'
import {internalServerError, missingParamError} from '../../../infra/error/http/error'

export class IngredientController implements IIngredientController {
	constructor(private service: IIngredientService) {}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async search(params?: QueryIngredientSearch): Promise<APIGatewayProxyResult> {
		try {
			if (!params?.query) {
				return missingParamError('query')
			}

			const { data } = await this.service.search(params)

			if (!data.results.length) {
				return noContent()
			}

			return ok(data.results)
		} catch {
			return internalServerError()
		}
	}

}