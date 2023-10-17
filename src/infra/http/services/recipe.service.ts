import {AxiosInstance} from 'axios'
import {ConstructHttpInstance} from '../http.client'

class RecipeService {
	constructor() {
		this.http = ConstructHttpInstance('recipes/complexSearch')
	}

	public http: AxiosInstance
}

export default new RecipeService()