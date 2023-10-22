import {IngredientController} from '../../../src/presentation/controllers/ingredients/ingredient.controller'
import {IIngredientService} from '../../../src/domain/services/protocols/i-ingredient.service'
import {AxiosResponse} from 'axios'
import {
	IIngredientSearchList
} from '../../../src/domain/protocols/interfaces/ingredient-search.interface'
import {buildAxiosResponse} from '../../index'
import {IIngredientInfo} from '../../../src/domain/protocols/interfaces/ingredient.interface'
import {NutrientAmount} from '../../../src/domain/protocols/interfaces/nutrient-amount.interface'
import {AmountConversion} from '../../../src/domain/protocols/interfaces/amount-conversion.interface'
import {
	QueryAutocompleteIngredientSearch,
	QueryIngredientSearch,
	QueryIngredientById,
	QueryComputeIngredientNutrientAmount,
	QueryConvertAmounts
} from '../../../src/infra/protocols/interfaces'
import {
	AutocompleteIngredientSearch
} from '../../../src/domain/protocols/interfaces/autocomplete-ingredient-search.interface'

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
		async search(params?: QueryIngredientSearch): Promise<AxiosResponse<IIngredientSearchList>> {
			return Promise.resolve(buildAxiosResponse(mockSearch))
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		getIngredientById(id?: number, params?: QueryIngredientById): Promise<AxiosResponse<IIngredientInfo>> {
			return Promise.resolve(buildAxiosResponse(mockGetIngredientById))
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		computeIngredientNutrientAmount(id?: number, params?: QueryComputeIngredientNutrientAmount): Promise<AxiosResponse<NutrientAmount>> {
			return Promise.resolve(buildAxiosResponse(mockComputeIngredientNutrientAmount))
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async convertAmounts(params?: QueryConvertAmounts): Promise<AxiosResponse<AmountConversion>> {
			return Promise.resolve(buildAxiosResponse(mockConvertAmount))
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async autocompleteIngredientsSearch(params?: QueryAutocompleteIngredientSearch): Promise<AxiosResponse<AutocompleteIngredientSearch[]>> {
			return Promise.resolve(buildAxiosResponse(mockAutocompleteIngredientsSearch))
		}

	}

	return new IngredientsServiceStub()
}

const mockSearch = {
	results: [{'id':19400,'name':'banana chips','image':'banana-chips.jpg'},{'id':93779,'name':'banana liqueur','image':'limoncello.jpg'}],
	offset: 0,
	number: 0,
	totalResults: 0
}

export const mockGetIngredientById = {'id':9266,'original':'pineapples','originalName':'pineapples','name':'pineapples','amount':1.0,'unit':'','unitShort':'','unitLong':'','possibleUnits':['piece','slice','fruit','g','oz','cup','serving'],'estimatedCost':{'value':299.0,'unit':'US Cents'},'consistency':'solid','shoppingListUnits':['pieces'],'aisle':'Produce','image':'pineapple.jpg','meta':[],'nutrition':{'nutrients':[{'name':'Calories','amount':452.5,'unit':'cal','percentOfDailyNeeds':22.63},{'name':'Fat','amount':1.09,'unit':'g','percentOfDailyNeeds':1.67},{'name':'Saturated Fat','amount':0.08,'unit':'g','percentOfDailyNeeds':0.51},{'name':'Carbohydrates','amount':118.74,'unit':'g','percentOfDailyNeeds':39.58},{'name':'Net Carbohydrates','amount':106.07,'unit':'g','percentOfDailyNeeds':38.57},{'name':'Sugar','amount':89.14,'unit':'g','percentOfDailyNeeds':99.05},{'name':'Cholesterol','amount':0.0,'unit':'mg','percentOfDailyNeeds':0.0},{'name':'Sodium','amount':9.05,'unit':'mg','percentOfDailyNeeds':0.39},{'name':'Protein','amount':4.89,'unit':'g','percentOfDailyNeeds':9.77},{'name':'Vitamin C','amount':432.59,'unit':'mg','percentOfDailyNeeds':524.35},{'name':'Manganese','amount':8.39,'unit':'mg','percentOfDailyNeeds':419.47},{'name':'Fiber','amount':12.67,'unit':'g','percentOfDailyNeeds':50.68},{'name':'Vitamin B6','amount':1.01,'unit':'mg','percentOfDailyNeeds':50.68},{'name':'Copper','amount':1.0,'unit':'mg','percentOfDailyNeeds':49.78},{'name':'Vitamin B1','amount':0.72,'unit':'mg','percentOfDailyNeeds':47.66},{'name':'Folate','amount':162.9,'unit':'µg','percentOfDailyNeeds':40.73},{'name':'Potassium','amount':986.45,'unit':'mg','percentOfDailyNeeds':28.18},{'name':'Magnesium','amount':108.6,'unit':'mg','percentOfDailyNeeds':27.15},{'name':'Vitamin B3','amount':4.53,'unit':'mg','percentOfDailyNeeds':22.63},{'name':'Vitamin B5','amount':1.93,'unit':'mg','percentOfDailyNeeds':19.28},{'name':'Vitamin B2','amount':0.29,'unit':'mg','percentOfDailyNeeds':17.04},{'name':'Iron','amount':2.62,'unit':'mg','percentOfDailyNeeds':14.58},{'name':'Calcium','amount':117.65,'unit':'mg','percentOfDailyNeeds':11.77},{'name':'Vitamin A','amount':524.9,'unit':'IU','percentOfDailyNeeds':10.5},{'name':'Zinc','amount':1.09,'unit':'mg','percentOfDailyNeeds':7.24},{'name':'Phosphorus','amount':72.4,'unit':'mg','percentOfDailyNeeds':7.24},{'name':'Vitamin K','amount':6.34,'unit':'Âµg','percentOfDailyNeeds':6.03},{'name':'Selenium','amount':0.91,'unit':'Âµg','percentOfDailyNeeds':1.29},{'name':'Vitamin E','amount':0.18,'unit':'mg','percentOfDailyNeeds':1.21}],'properties':[{'name':'Glycemic Index','amount':58.67,'unit':''},{'name':'Glycemic Load','amount':62.23,'unit':''}],'flavonoids':[{'name':'Cyanidin','amount':0.0,'unit':'mg'}],'caloricBreakdown':{'percentProtein':3.88,'percentFat':1.94,'percentCarbs':94.18},'weightPerServing':{'amount':905,'unit':'g'}},'categoryPath':['tropical fruit','fruit']}
export const mockComputeIngredientNutrientAmount = {'amount': 65.32,'unit': 'oz'}
export const mockConvertAmount = {'sourceAmount':2.5,'sourceUnit':'cups','targetAmount':312.5,'targetUnit':'grams','answer':'2.5 cups flour translates to 312.5 grams.'}
export const mockAutocompleteIngredientsSearch = [{'name':'apple','image':'apple.jpg','id':9003,'aisle':'Produce','possibleUnits':['small','large','piece','slice','g','extra small','medium','oz','cup slice','cup','serving']},{'name':'applesauce','image':'applesauce.png','id':9019,'aisle':'Canned and Jarred','possibleUnits':['g','oz','cup','serving','tablespoon']},{'name':'apple juice','image':'apple-juice.jpg','id':9016,'aisle':'Beverages','possibleUnits':['g','drink box','fl oz','oz','teaspoon','cup','serving','tablespoon']},{'name':'apple cider','image':'apple-cider.jpg','id':1009016,'aisle':'Beverages','possibleUnits':['g','drink box','fl oz','oz','teaspoon','bottle NFS','cup','serving','tablespoon']},{'name':'apple jelly','image':'apple-jelly.jpg','id':10019297,'aisle':'Nut butters, Jams, and Honey','possibleUnits':['g','oz','packet','teaspoon','cup','serving','tablespoon']}]