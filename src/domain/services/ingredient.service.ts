import {AxiosInstance, AxiosResponse} from 'axios'
import {ConstructHttpInstance} from '../../infra/http'
import {IIngredientService} from './protocols/i-ingredient.service'
import {IIngredientSearchList} from '../protocols/interfaces/ingredient-search.interface'
import {injectable} from 'inversify'
import {IIngredientInfo} from '../protocols/interfaces/ingredient.interface'
import {NutrientAmount} from '../protocols/interfaces/nutrient-amount.interface'
import {AmountConversion} from '../protocols/interfaces/amount-conversion.interface'
import {
	QueryAutocompleteIngredientSearch,
	QueryIngredientSearch,
	QueryIngredientById,
	QueryComputeIngredientNutrientAmount,
	QueryConvertAmounts
} from '../../infra/protocols/interfaces'
import {AutocompleteIngredientSearch} from '../protocols/interfaces/autocomplete-ingredient-search.interface'

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

	async autocompleteIngredientsSearch(params?: QueryAutocompleteIngredientSearch): Promise<AxiosResponse<AutocompleteIngredientSearch[]>> {
		return this.http.get('/autocomplete', { params })
	}
}