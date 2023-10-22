import {QueryIngredientSearch} from '../../../infra/protocols/interfaces/query-ingredient-search.interface'
import {IIngredientSearchList} from '../../protocols/interfaces/ingredient-search.interface'
import {AxiosResponse} from 'axios'
import {QueryIngredientById} from '../../../infra/protocols/interfaces/query-ingredient-by-id.interface'
import {IIngredientInfo} from '../../protocols/interfaces/ingredient.interface'
import {
	QueryComputeIngredientNutrientAmount
} from '../../../infra/protocols/interfaces/query-compute-ingredient-nutrient-amount.interface'
import {NutrientAmount} from '../../protocols/interfaces/nutrient-amount.interface'
import {QueryConvertAmounts} from '../../../infra/protocols/interfaces/query-convert-amounts.interface'
import {AmountConversion} from '../../protocols/interfaces/amount-conversion.interface'
import {
	QueryAutocompleteIngredientSearch
} from '../../../infra/protocols/interfaces/query-autocomplete-ingredient-search.interface'

export interface IIngredientService {
  search(params?: QueryIngredientSearch): Promise<AxiosResponse<IIngredientSearchList>>
  getIngredientById(id?: number, params?: QueryIngredientById):Promise<AxiosResponse<IIngredientInfo>>
  computeIngredientNutrientAmount(id?: number, params?: QueryComputeIngredientNutrientAmount): Promise<AxiosResponse<NutrientAmount>>
  convertAmounts(params?: QueryConvertAmounts): Promise<AxiosResponse<AmountConversion>>
  autocompleteIngredientsSearch(params?: QueryAutocompleteIngredientSearch): Promise<AxiosResponse<AmountConversion>>
}