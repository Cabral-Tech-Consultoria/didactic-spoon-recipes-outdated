import {AxiosInstance, AxiosResponse} from 'axios'
import {ConstructHttpInstance} from '../../infra/http'
import {injectable} from 'inversify'
import {IRecipeService} from './protocols/i-recipe.service'
import {BaseQueryStringSearch} from '../../infra/protocols/interfaces/querystring.interface'
import {IRecipe, ISimilarRecipe} from '../protocols/interfaces/recipe.interface'
import {QueryAutocompleteSearch} from '../../infra/protocols/interfaces/query-autocomplete-search.interface'
import {IAutocompleteSearch} from '../protocols/interfaces/autocomplete-search.interface'
import {IRandomRecipes, IRecipeInfo} from '../protocols/interfaces/recipe-info.interface'
import {QueryIngredients} from '../../infra/protocols/interfaces/query-ingredients.interface'
import {IRecipeIngredientsInfo} from '../protocols/interfaces/ingredient.interface'
import {INutrients} from '../protocols/interfaces/nutrients.interface'
import {QueryRandom} from '../../infra/protocols/interfaces/query-random.intreface'
import {INutrition} from '../protocols/interfaces/nutrition.interface'
import {QuerySimilar} from '../../infra/protocols/interfaces/query-similar.interface'

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