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
import {
	QueryIngredientSubstitutes
} from '../../../src/infra/protocols/interfaces/query-ingredient-substitutes.interface'
import {IngredientSubstitutes} from '../../../src/domain/protocols/interfaces/ingredient-substitutes.interface'
import {ITranslationService} from '../../../src/domain/services/protocols/i-translation.service'
import {TranslationDTO} from '../../../src/infra/protocols/dtos/translation.dto'
import {Translation} from '../../../src/domain/protocols/interfaces/translation.interface'

export const makeSut = () => {
	const ingredientService = buildIngredientsService()
	const translationService = buildTranslationService()
	const controller = new IngredientController(ingredientService, translationService)

	return {
		ingredientService,
		translationService,
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

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		getIngredientSubstitutes(params?: QueryIngredientSubstitutes): Promise<AxiosResponse<IngredientSubstitutes>> {
			return Promise.resolve(buildAxiosResponse(mockIngredientSubstitutes))
		}

	}

	return new IngredientsServiceStub()
}

export const buildTranslationService = () => {
	class TranslationServiceStub implements ITranslationService {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		translateJSON<T>(translation: TranslationDTO<T>): Promise<Translation<T>> {
			return Promise.resolve({ trans: mockGetIngredientByIdTranslated } as Translation<T>)
		}

	}

	return new TranslationServiceStub()
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
export const mockIngredientSubstitutes = {'ingredient':'butter','substitutes':['1 cup = 7/8 cup shortening and 1/2 tsp salt','1 cup = 7/8 cup vegetable oil + 1/2 tsp salt','1/2 cup = 1/4 cup buttermilk + 1/4 cup unsweetened applesauce','1 cup = 1 cup margarine'],'message':'Found 4 substitutes for the ingredient.'}

export const mockGetIngredientByIdTranslated = {'id':'9266','original':'abacaxi','originalName':'abacaxi','name':'abacaxi','amount':'3','unit':'','unitShort':'','unitLong':'','possibleUnits':['pedaço','fatiar','fruta','g','onças','xícara','servindo'],'estimatedCost':{'value':'897','unit':'Centavos dos EUA'},'consistency':'sólido','shoppingListUnits':['peças'],'aisle':'Produzir','image':'pineapple.jpg','nutrition':{'nutrients':[{'name':'Gordura saturada','amount':'0,24','unit':'g','percentOfDailyNeeds':'1,53'},{'name':'Ácido fólico','amount':'0','unit':'μg','percentOfDailyNeeds':'0'},{'name':'Vitamina A','amount':'1574,7','unit':'UI','percentOfDailyNeeds':'31h49'},{'name':'Sódio','amount':'27h15','unit':'mg','percentOfDailyNeeds':'1.18'},{'name':'Ferro','amount':'7,87','unit':'mg','percentOfDailyNeeds':'43,74'},{'name':'Cafeína','amount':'0','unit':'mg','percentOfDailyNeeds':'0'},{'name':'Vitamina B2','amount':'0,87','unit':'mg','percentOfDailyNeeds':'51.11'},{'name':'Fósforo','amount':'217,2','unit':'mg','percentOfDailyNeeds':'21.72'},{'name':'Vitamina C','amount':'1297,77','unit':'mg','percentOfDailyNeeds':'1573.05'},{'name':'Manganês','amount':'25.17','unit':'mg','percentOfDailyNeeds':'1258,4'},{'name':'Vitamina K','amount':'19','unit':'μg','percentOfDailyNeeds':'18.1'},{'name':'Zinco','amount':'3.26','unit':'mg','percentOfDailyNeeds':'21.72'},{'name':'Vitamina B6','amount':'3.04','unit':'mg','percentOfDailyNeeds':'152.04'},{'name':'Vitamina E','amount':'0,54','unit':'mg','percentOfDailyNeeds':'3,62'},{'name':'Licopeno','amount':'0','unit':'μg','percentOfDailyNeeds':'0'},{'name':'Potássio','amount':'2.959,35','unit':'mg','percentOfDailyNeeds':'84,55'},{'name':'Fibra','amount':'38.01','unit':'g','percentOfDailyNeeds':'152.04'},{'name':'Calorias','amount':'1357,5','unit':'calorias','percentOfDailyNeeds':'67,88'},{'name':'Açúcar','amount':'267,43','unit':'g','percentOfDailyNeeds':'297.14'},{'name':'Gordura monoinsaturada','amount':'0,35','unit':'g','percentOfDailyNeeds':'0'},{'name':'Colina','amount':'149,32','unit':'mg','percentOfDailyNeeds':'0'},{'name':'Folato','amount':'488,7','unit':'μg','percentOfDailyNeeds':'122,18'},{'name':'Vitamina D','amount':'0','unit':'μg','percentOfDailyNeeds':'0'},{'name':'Carboidratos Líquidos','amount':'317,65','unit':'g','percentOfDailyNeeds':'115,51'},{'name':'Magnésio','amount':'325,8','unit':'mg','percentOfDailyNeeds':'81,45'},{'name':'Gordo','amount':'3.26','unit':'g','percentOfDailyNeeds':'5.01'},{'name':'Carboidratos','amount':'355,67','unit':'g','percentOfDailyNeeds':'118,56'},{'name':'Proteína','amount':'14,66','unit':'g','percentOfDailyNeeds':'29.32'},{'name':'Gordura poliinsaturada','amount':'1.09','unit':'g','percentOfDailyNeeds':'0'},{'name':'Colesterol','amount':'0','unit':'mg','percentOfDailyNeeds':'0'},{'name':'Cobre','amount':'2,99','unit':'mg','percentOfDailyNeeds':'149,32'},{'name':'Álcool','amount':'0','unit':'g','percentOfDailyNeeds':'0'},{'name':'Vitamina b12','amount':'0','unit':'μg','percentOfDailyNeeds':'0'},{'name':'Cálcio','amount':'352,95','unit':'mg','percentOfDailyNeeds':'35,29'},{'name':'Selênio','amount':'2,71','unit':'μg','percentOfDailyNeeds':'3,88'},{'name':'Vitamina B1','amount':'2.14','unit':'mg','percentOfDailyNeeds':'142,99'},{'name':'Vitamina B3','amount':'13.57','unit':'mg','percentOfDailyNeeds':'67,88'},{'name':'Vitamina B5','amount':'5,78','unit':'mg','percentOfDailyNeeds':'57,83'}],'properties':[{'name':'Índice glicêmico','amount':'58,67','unit':''},{'name':'Carga Glicêmica','amount':'186,36','unit':''},{'name':'Pontuação nutricional','amount':'53.146956521739135','unit':'%'}],'flavonoids':[{'name':'Cianidina','amount':'0','unit':'mg'},{'name':'Petunidina','amount':'0','unit':'mg'},{'name':'Delfinidina','amount':'0','unit':'mg'},{'name':'Malvidina','amount':'0','unit':'mg'},{'name':'Pelargonidina','amount':'0','unit':'mg'},{'name':'Peonidina','amount':'0','unit':'mg'},{'name':'Catequina','amount':'0','unit':'mg'},{'name':'Epigalocatequina','amount':'0','unit':'mg'},{'name':'Epicatequina','amount':'0','unit':'mg'},{'name':'Epicatequina 3-galato','amount':'0','unit':'mg'},{'name':'Epigalocatequina 3-galato','amount':'0','unit':'mg'},{'name':'Teaflavina','amount':'0','unit':''},{'name':'Tearubigins','amount':'0','unit':''},{'name':'Eriodictiol','amount':'0','unit':''},{'name':'Hesperetina','amount':'0','unit':'mg'},{'name':'Naringenina','amount':'0','unit':'mg'},{'name':'Apigenina','amount':'0','unit':'mg'},{'name':'Luteolina','amount':'0,27','unit':'mg'},{'name':'Isorhamnetina','amount':'0','unit':''},{'name':'Kaempferol','amount':'0','unit':'mg'},{'name':'Miricetina','amount':'0,27','unit':'mg'},{'name':'Quercetina','amount':'3.8','unit':'mg'},{'name':'Teaflavina-3,3\'-digalato','amount':'0','unit':''},{'name':'Teaflavina-3\'-galato','amount':'0','unit':''},{'name':'Teaflavina-3-galato','amount':'0','unit':''},{'name':'Galocatequina','amount':'0','unit':'mg'}],'caloricBreakdown':{'percentProtein':'3,88','percentFat':'1,94','percentCarbs':'94,18'},'weightPerServing':{'amount':'2715','unit':'g'}},'categoryPath':['fruta tropical','fruta']}
export const mockConvertAmountTranslated = {'sourceAmount':'2,5','sourceUnit':'xícaras','targetAmount':'312,5','targetUnit':'gramas','answer':'2,5 xícaras de farinha equivalem a 312,5 gramas.','type':'CONVERSÃO'}
export const mockAutocompleteIngredientsSearchTranslated = [{'name':'maçã','image':'maçã.jpg','id':'9003','aisle':'Produzir','possibleUnits':['pequeno','grande','pedaço','fatiar','g','muito pequeno','médio','onças','fatia de xícara','Serviço NLEA','xícara','servindo']},{'name':'compota de maçã','image':'compota de maçã.png','id':'9019','aisle':'Enlatado e Jarred','possibleUnits':['g','onças','xícara','servindo','colher de sopa']},{'name':'suco de maçã','image':'suco de maçã.jpg','id':'9016','aisle':'Bebidas','possibleUnits':['g','caixa de bebida','onças','colher de chá','garrafa NFS','onça fluida','xícara','servindo','colher de sopa']},{'name':'cidra de maçã','image':'cidra de maçã.jpg','id':'1009016','aisle':'Bebidas','possibleUnits':['g','caixa de bebida','onças','colher de chá','garrafa NFS','onça fluida','xícara','servindo','colher de sopa']},{'name':'geléia de maçã','image':'geléia de maçã.jpg','id':'10019297','aisle':'Manteigas de nozes, geléias e mel','possibleUnits':['g','onças','pacote','colher de chá','xícara','servindo','colher de sopa']},{'name':'manteiga de maçã','image':'geléia de maçã.jpg','id':'19294','aisle':'Manteigas de nozes, geléias e mel','possibleUnits':['g','onças','xícara','servindo','colher de sopa']},{'name':'tempero de torta de maçã','image':'garam-masala.jpg','id':'1042035','aisle':'Especiarias e temperos','possibleUnits':['g','onças','colher de chá','xícara','colher de sopa']},{'name':'recheio de torta de maçã','image':'fatia de torta de maçã.jpg','id':'19312','aisle':'Cozimento','possibleUnits':['pode','g','onças','servindo']},{'name':'vinagre de maçã','image':'vinagre de cidra de maçã.jpg','id':'2048','aisle':'Azeite, vinagre, molho para salada','possibleUnits':['g','onças','colher de chá','xícara','colher de sopa']},{'name':'bacon defumado de macieira','image':'bacon cru.png','id':'10123','aisle':'Carne','possibleUnits':['fatia crua','pacote','faixa','erupção cutânea','pedaço','fatiar','g','onças','servindo']}]
