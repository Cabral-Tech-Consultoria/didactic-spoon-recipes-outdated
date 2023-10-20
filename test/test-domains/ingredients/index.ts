import {IngredientController} from '../../../src/presentation/controllers/ingredients/ingredient.controller'
import {IIngredientService} from '../../../src/domain/services/protocols/i-ingredient.service'
import {QueryIngredientSearch} from '../../../src/infra/protocols/interfaces/query-ingredient-search.interface'
import {AxiosResponse} from 'axios'
import {
	IIngredientSearchList
} from '../../../src/domain/protocols/interfaces/ingredient-search.interface'
import {buildAxiosResponse} from '../../index'

export const makeSut = () => {
	const service = buildIngredientsService()
	const controller = new IngredientController(service)

	return {
		service,
		controller
	}
}

export const buildIngredientsService = () => {
	class IngredientsServiceStub implements IIngredientService {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		search(params?: QueryIngredientSearch): Promise<AxiosResponse<IIngredientSearchList>> {
			return Promise.resolve(buildAxiosResponse({
				results: [],
				offset: 0,
				number: 0,
				totalResults: 0
			}))
		}
	}

	return new IngredientsServiceStub()
}