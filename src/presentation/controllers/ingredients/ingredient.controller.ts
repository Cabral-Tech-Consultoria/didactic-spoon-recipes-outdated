import {IIngredientController} from './protocols/i-ingredient.controller'
import {QueryIngredientSearch} from '../../../infra/protocols/interfaces/query-ingredient-search.interface'
import {APIGatewayProxyResult} from 'aws-lambda'
import {IIngredientService} from '../../../domain/services/protocols/i-ingredient.service'
import {noContent, ok} from '../../../infra/http'
import {badRequestError, internalServerError, missingParamError} from '../../../infra/error/http/error'
import {inject, injectable} from 'inversify'
import {TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {QueryIngredientById} from '../../../infra/protocols/interfaces/query-ingredient-by-id.interface'
import {IIngredientInfo} from '../../../domain/protocols/interfaces/ingredient.interface'

@injectable()
export class IngredientController implements IIngredientController {
	constructor(@inject(TYPES_DI.IngredientService) private service: IIngredientService) {}
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

	async getIngredientById(id?: number, params?: QueryIngredientById): Promise<APIGatewayProxyResult> {
		try {
			if (!id) {
				return missingParamError('id')
			}

			const { data } = await this.service.getIngredientById(id, params)

			if (!data) {
				return badRequestError()
			}

			return ok<IIngredientInfo>(data)
		} catch {
			return internalServerError()
		}
	}
}