import {IIngredientSearchList} from '../../protocols/interfaces/ingredient-search.interface'
import {AxiosResponse} from 'axios'
import {IIngredientInfo} from '../../protocols/interfaces/ingredient.interface'
import {NutrientAmount} from '../../protocols/interfaces/nutrient-amount.interface'
import {AmountConversion} from '../../protocols/interfaces/amount-conversion.interface'
import {
	QueryAutocompleteIngredientSearch,
	QueryIngredientSearch,
	QueryIngredientById,
	QueryComputeIngredientNutrientAmount,
	QueryConvertAmounts
} from '../../../infra/protocols/interfaces'
import {AutocompleteIngredientSearch} from '../../protocols/interfaces/autocomplete-ingredient-search.interface'
import {QueryIngredientSubstitutes} from '../../../infra/protocols/interfaces/query-ingredient-substitutes.interface'
import {IngredientSubstitutes} from '../../protocols/interfaces/ingredient-substitutes.interface'

export interface IIngredientService {
  search(params?: QueryIngredientSearch): Promise<AxiosResponse<IIngredientSearchList>>
  getIngredientById(id?: number, params?: QueryIngredientById):Promise<AxiosResponse<IIngredientInfo>>
  computeIngredientNutrientAmount(id?: number, params?: QueryComputeIngredientNutrientAmount): Promise<AxiosResponse<NutrientAmount>>
  convertAmounts(params?: QueryConvertAmounts): Promise<AxiosResponse<AmountConversion>>
  autocompleteIngredientsSearch(params?: QueryAutocompleteIngredientSearch): Promise<AxiosResponse<AutocompleteIngredientSearch[]>>
  getIngredientSubstitutes(params?: QueryIngredientSubstitutes): Promise<AxiosResponse<IngredientSubstitutes>>
}