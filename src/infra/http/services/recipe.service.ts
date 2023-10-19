import {AxiosInstance, AxiosResponse} from 'axios'
import {ConstructHttpInstance} from '../http.client'
import {injectable} from 'inversify'
import {IRecipeService} from './protocols/i-recipe.service'
import {BaseQueryStringSearch} from '../../protocols/interfaces/querystring.interface'
import {IRecipe, ISimilarRecipe} from '../../../domain/protocols/interfaces/recipe.interface'
import {QueryAutocompleteSearch} from '../../protocols/interfaces/query-autocomplete-search.interface'
import {IAutocompleteSearch} from '../../../domain/protocols/interfaces/autocomplete-search.interface'
import {IRandomRecipes, IRecipeInfo} from '../../../domain/protocols/interfaces/recipe-info.interface'
import {QueryIngredients} from '../../protocols/interfaces/query-ingredients.interface'
import {IRecipeIngredientsInfo} from '../../../domain/protocols/interfaces/ingredient.interface'
import {INutrients} from '../../../domain/protocols/interfaces/nutrients.interface'
import {QueryRandom} from '../../protocols/interfaces/query-random.intreface'
import {INutrition} from '../../../domain/protocols/interfaces/nutrition.interface'
import {QuerySimilar} from '../../protocols/interfaces/query-similar.interface'

@injectable()
export class RecipeService implements IRecipeService {
	public http: AxiosInstance

	constructor() {
		this.http = ConstructHttpInstance('recipes')
	}

	async get(params: BaseQueryStringSearch): Promise<AxiosResponse<{ results: IRecipe[] }>> {
		return this
			.http
			.get<{results: IRecipe[] }>('/complexSearch', { params })
	}

	getAutocompleteSearch(params?: QueryAutocompleteSearch): Promise<AxiosResponse<IAutocompleteSearch[]>> {
		return this
			.http
			.get<IAutocompleteSearch[]>('/autocomplete', { params })
	}

	getById(id?: number, includeNutrition?: boolean): Promise<AxiosResponse<IRecipeInfo>> {
		return this
			.http
			.get<IRecipeInfo>(`/${id}/information`, { params: { includeNutrition } })
	}

	getByIngredients(params: QueryIngredients): Promise<AxiosResponse<IRecipeIngredientsInfo[]>> {
		return this
			.http
			.get<IRecipeIngredientsInfo[]>('/findByIngredients', {
				params
			})
	}

	getByNutrients(nutrients: INutrients): Promise<AxiosResponse<IRecipe[]>> {
		return this
			.http
			.get('/findByNutrients', {params: nutrients})
	}

	getRandom(params?: QueryRandom): Promise<AxiosResponse<IRandomRecipes[]>> {
		return this
			.http
			.get<IRandomRecipes[]>('/random', {
				params
			})
	}

	getRecipeNutrition(id?: number): Promise<AxiosResponse<INutrition>> {
		return this
			.http
			.get<INutrition>(`/${id}/nutritionWidget.json`)
	}

	getSimilarById(id?: number, params?: QuerySimilar): Promise<AxiosResponse<ISimilarRecipe[]>> {
		return this
			.http
			.get<ISimilarRecipe[]>(`/${id}/similar`, {
				params
			})
	}

}