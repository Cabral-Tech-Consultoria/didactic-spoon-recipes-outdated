import {AxiosInstance, AxiosResponse} from 'axios'
import {ConstructHttpInstance} from '../../infra/http'
import {IIngredientService} from './protocols/i-ingredient.service'
import {QueryIngredientSearch} from '../../infra/protocols/interfaces/query-ingredient-search.interface'
import {IIngredientSearchList} from '../protocols/interfaces/ingredient-search.interface'

export class IngredientService implements IIngredientService {
	private http: AxiosInstance
	constructor() {
		this.http = ConstructHttpInstance('/food/ingredients')
	}

	async search(params?: QueryIngredientSearch): Promise<AxiosResponse<IIngredientSearchList>> {
		return this.http.get<IIngredientSearchList>('/search', { params })
	}
}