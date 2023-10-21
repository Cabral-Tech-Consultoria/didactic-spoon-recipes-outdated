import {AxiosInstance, AxiosResponse} from 'axios'
import {ConstructHttpInstance} from '../../infra/http'
import {IIngredientService} from './protocols/i-ingredient.service'
import {QueryIngredientSearch} from '../../infra/protocols/interfaces/query-ingredient-search.interface'
import {IIngredientSearchList} from '../protocols/interfaces/ingredient-search.interface'
import {injectable} from 'inversify'
import {QueryIngredientById} from '../../infra/protocols/interfaces/query-ingredient-by-id.interface'
import {IIngredientInfo} from '../protocols/interfaces/ingredient.interface'
import {
	QueryComputeIngredientNutrientAmount
} from '../../infra/protocols/interfaces/query-compute-ingredient-nutrient-amount.interface'
import {NutrientAmount} from '../protocols/interfaces/nutrient-amount.interface'
import {QueryConvertAmounts} from '../../infra/protocols/interfaces/query-convert-amounts.interface'
import {AmountConversion} from '../protocols/interfaces/amount-conversion.interface'

@injectable()
export class IngredientService implements IIngredientService {
	private http: AxiosInstance
	private httpRecipe: AxiosInstance
	constructor() {
		this.http = ConstructHttpInstance('/food/ingredients')
		this.httpRecipe = ConstructHttpInstance('/recipes')
	}

	async search(params?: QueryIngredientSearch): Promise<AxiosResponse<IIngredientSearchList>> {
		return this.http.get<IIngredientSearchList>('/search', { params })
	}

	async getIngredientById(id?: number, params?: QueryIngredientById): Promise<AxiosResponse<IIngredientInfo>> {
		return this.http.get<IIngredientInfo>(`/${id}/information`, { params })
	}

	async computeIngredientNutrientAmount(id?: number, params?: QueryComputeIngredientNutrientAmount): Promise<AxiosResponse<NutrientAmount>> {
		return this.http.get<NutrientAmount>(`/${id}/amount`, { params })
	}

	async convertAmounts(params?: QueryConvertAmounts): Promise<AxiosResponse<AmountConversion>> {
		return this.httpRecipe.get<AmountConversion>('/convert', { params })
	}
}