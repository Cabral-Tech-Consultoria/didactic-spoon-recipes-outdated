import {QueryIngredientSearch} from '../../../infra/protocols/interfaces/query-ingredient-search.interface'
import {IIngredientSearchList} from '../../protocols/interfaces/ingredient-search.interface'
import {AxiosResponse} from 'axios'

export interface IIngredientService {
  search(params?: QueryIngredientSearch): Promise<AxiosResponse<IIngredientSearchList>>
}