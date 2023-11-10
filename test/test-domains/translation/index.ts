import {ITranslationService} from '../../../src/domain/services/protocols/i-translation.service'
import {TranslationDTO, TranslationTextDTO} from '../../../src/infra/protocols/dtos/translation.dto'
import {Translation} from '../../../src/domain/protocols/interfaces/translation.interface'

export const buildTranslationService = () => {
	class TranslationServiceStub implements ITranslationService {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		translateJSON<T>(translation: TranslationDTO<T>): Promise<Translation<T>> {
			return Promise.resolve({trans: mockGetIngredientByIdTranslated} as Translation<T>)
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		translateText(translation: TranslationTextDTO<string>): Promise<Translation<string>> {
			return Promise.resolve({trans: 'frango'})
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		translateListTexts(translations: TranslationTextDTO<string[]>): Promise<Translation<string[]>> {
			return Promise.resolve({trans: ['frango', 'batata doce']})
		}

	}

	return new TranslationServiceStub()
}

export const mockGetIngredientByIdTranslated = {
	'id': '9266',
	'original': 'abacaxi',
	'originalName': 'abacaxi',
	'name': 'abacaxi',
	'amount': '3',
	'unit': '',
	'unitShort': '',
	'unitLong': '',
	'possibleUnits': ['pedaço', 'fatiar', 'fruta', 'g', 'onças', 'xícara', 'servindo'],
	'estimatedCost': {'value': '897', 'unit': 'Centavos dos EUA'},
	'consistency': 'sólido',
	'shoppingListUnits': ['peças'],
	'aisle': 'Produzir',
	'image': 'pineapple.jpg',
	'nutrition': {
		'nutrients': [{
			'name': 'Gordura saturada',
			'amount': '0,24',
			'unit': 'g',
			'percentOfDailyNeeds': '1,53'
		}, {'name': 'Ácido fólico', 'amount': '0', 'unit': 'μg', 'percentOfDailyNeeds': '0'}, {
			'name': 'Vitamina A',
			'amount': '1574,7',
			'unit': 'UI',
			'percentOfDailyNeeds': '31h49'
		}, {'name': 'Sódio', 'amount': '27h15', 'unit': 'mg', 'percentOfDailyNeeds': '1.18'}, {
			'name': 'Ferro',
			'amount': '7,87',
			'unit': 'mg',
			'percentOfDailyNeeds': '43,74'
		}, {'name': 'Cafeína', 'amount': '0', 'unit': 'mg', 'percentOfDailyNeeds': '0'}, {
			'name': 'Vitamina B2',
			'amount': '0,87',
			'unit': 'mg',
			'percentOfDailyNeeds': '51.11'
		}, {'name': 'Fósforo', 'amount': '217,2', 'unit': 'mg', 'percentOfDailyNeeds': '21.72'}, {
			'name': 'Vitamina C',
			'amount': '1297,77',
			'unit': 'mg',
			'percentOfDailyNeeds': '1573.05'
		}, {'name': 'Manganês', 'amount': '25.17', 'unit': 'mg', 'percentOfDailyNeeds': '1258,4'}, {
			'name': 'Vitamina K',
			'amount': '19',
			'unit': 'μg',
			'percentOfDailyNeeds': '18.1'
		}, {'name': 'Zinco', 'amount': '3.26', 'unit': 'mg', 'percentOfDailyNeeds': '21.72'}, {
			'name': 'Vitamina B6',
			'amount': '3.04',
			'unit': 'mg',
			'percentOfDailyNeeds': '152.04'
		}, {'name': 'Vitamina E', 'amount': '0,54', 'unit': 'mg', 'percentOfDailyNeeds': '3,62'}, {
			'name': 'Licopeno',
			'amount': '0',
			'unit': 'μg',
			'percentOfDailyNeeds': '0'
		}, {'name': 'Potássio', 'amount': '2.959,35', 'unit': 'mg', 'percentOfDailyNeeds': '84,55'}, {
			'name': 'Fibra',
			'amount': '38.01',
			'unit': 'g',
			'percentOfDailyNeeds': '152.04'
		}, {'name': 'Calorias', 'amount': '1357,5', 'unit': 'calorias', 'percentOfDailyNeeds': '67,88'}, {
			'name': 'Açúcar',
			'amount': '267,43',
			'unit': 'g',
			'percentOfDailyNeeds': '297.14'
		}, {'name': 'Gordura monoinsaturada', 'amount': '0,35', 'unit': 'g', 'percentOfDailyNeeds': '0'}, {
			'name': 'Colina',
			'amount': '149,32',
			'unit': 'mg',
			'percentOfDailyNeeds': '0'
		}, {'name': 'Folato', 'amount': '488,7', 'unit': 'μg', 'percentOfDailyNeeds': '122,18'}, {
			'name': 'Vitamina D',
			'amount': '0',
			'unit': 'μg',
			'percentOfDailyNeeds': '0'
		}, {
			'name': 'Carboidratos Líquidos',
			'amount': '317,65',
			'unit': 'g',
			'percentOfDailyNeeds': '115,51'
		}, {'name': 'Magnésio', 'amount': '325,8', 'unit': 'mg', 'percentOfDailyNeeds': '81,45'}, {
			'name': 'Gordo',
			'amount': '3.26',
			'unit': 'g',
			'percentOfDailyNeeds': '5.01'
		}, {'name': 'Carboidratos', 'amount': '355,67', 'unit': 'g', 'percentOfDailyNeeds': '118,56'}, {
			'name': 'Proteína',
			'amount': '14,66',
			'unit': 'g',
			'percentOfDailyNeeds': '29.32'
		}, {
			'name': 'Gordura poliinsaturada',
			'amount': '1.09',
			'unit': 'g',
			'percentOfDailyNeeds': '0'
		}, {'name': 'Colesterol', 'amount': '0', 'unit': 'mg', 'percentOfDailyNeeds': '0'}, {
			'name': 'Cobre',
			'amount': '2,99',
			'unit': 'mg',
			'percentOfDailyNeeds': '149,32'
		}, {'name': 'Álcool', 'amount': '0', 'unit': 'g', 'percentOfDailyNeeds': '0'}, {
			'name': 'Vitamina b12',
			'amount': '0',
			'unit': 'μg',
			'percentOfDailyNeeds': '0'
		}, {'name': 'Cálcio', 'amount': '352,95', 'unit': 'mg', 'percentOfDailyNeeds': '35,29'}, {
			'name': 'Selênio',
			'amount': '2,71',
			'unit': 'μg',
			'percentOfDailyNeeds': '3,88'
		}, {'name': 'Vitamina B1', 'amount': '2.14', 'unit': 'mg', 'percentOfDailyNeeds': '142,99'}, {
			'name': 'Vitamina B3',
			'amount': '13.57',
			'unit': 'mg',
			'percentOfDailyNeeds': '67,88'
		}, {'name': 'Vitamina B5', 'amount': '5,78', 'unit': 'mg', 'percentOfDailyNeeds': '57,83'}],
		'properties': [{'name': 'Índice glicêmico', 'amount': '58,67', 'unit': ''}, {
			'name': 'Carga Glicêmica',
			'amount': '186,36',
			'unit': ''
		}, {'name': 'Pontuação nutricional', 'amount': '53.146956521739135', 'unit': '%'}],
		'flavonoids': [{'name': 'Cianidina', 'amount': '0', 'unit': 'mg'}, {
			'name': 'Petunidina',
			'amount': '0',
			'unit': 'mg'
		}, {'name': 'Delfinidina', 'amount': '0', 'unit': 'mg'}, {
			'name': 'Malvidina',
			'amount': '0',
			'unit': 'mg'
		}, {'name': 'Pelargonidina', 'amount': '0', 'unit': 'mg'}, {
			'name': 'Peonidina',
			'amount': '0',
			'unit': 'mg'
		}, {'name': 'Catequina', 'amount': '0', 'unit': 'mg'}, {
			'name': 'Epigalocatequina',
			'amount': '0',
			'unit': 'mg'
		}, {'name': 'Epicatequina', 'amount': '0', 'unit': 'mg'}, {
			'name': 'Epicatequina 3-galato',
			'amount': '0',
			'unit': 'mg'
		}, {'name': 'Epigalocatequina 3-galato', 'amount': '0', 'unit': 'mg'}, {
			'name': 'Teaflavina',
			'amount': '0',
			'unit': ''
		}, {'name': 'Tearubigins', 'amount': '0', 'unit': ''}, {
			'name': 'Eriodictiol',
			'amount': '0',
			'unit': ''
		}, {'name': 'Hesperetina', 'amount': '0', 'unit': 'mg'}, {
			'name': 'Naringenina',
			'amount': '0',
			'unit': 'mg'
		}, {'name': 'Apigenina', 'amount': '0', 'unit': 'mg'}, {
			'name': 'Luteolina',
			'amount': '0,27',
			'unit': 'mg'
		}, {'name': 'Isorhamnetina', 'amount': '0', 'unit': ''}, {
			'name': 'Kaempferol',
			'amount': '0',
			'unit': 'mg'
		}, {'name': 'Miricetina', 'amount': '0,27', 'unit': 'mg'}, {
			'name': 'Quercetina',
			'amount': '3.8',
			'unit': 'mg'
		}, {'name': 'Teaflavina-3,3\'-digalato', 'amount': '0', 'unit': ''}, {
			'name': 'Teaflavina-3\'-galato',
			'amount': '0',
			'unit': ''
		}, {'name': 'Teaflavina-3-galato', 'amount': '0', 'unit': ''}, {
			'name': 'Galocatequina',
			'amount': '0',
			'unit': 'mg'
		}],
		'caloricBreakdown': {'percentProtein': '3,88', 'percentFat': '1,94', 'percentCarbs': '94,18'},
		'weightPerServing': {'amount': '2715', 'unit': 'g'}
	},
	'categoryPath': ['fruta tropical', 'fruta']
}
export const mockConvertAmountTranslated = {
	'sourceAmount': '2,5',
	'sourceUnit': 'xícaras',
	'targetAmount': '312,5',
	'targetUnit': 'gramas',
	'answer': '2,5 xícaras de farinha equivalem a 312,5 gramas.',
	'type': 'CONVERSÃO'
}
export const mockAutocompleteIngredientsSearchTranslated = [{
	'name': 'maçã',
	'image': 'maçã.jpg',
	'id': '9003',
	'aisle': 'Produzir',
	'possibleUnits': ['pequeno', 'grande', 'pedaço', 'fatiar', 'g', 'muito pequeno', 'médio', 'onças', 'fatia de xícara', 'Serviço NLEA', 'xícara', 'servindo']
}, {
	'name': 'compota de maçã',
	'image': 'compota de maçã.png',
	'id': '9019',
	'aisle': 'Enlatado e Jarred',
	'possibleUnits': ['g', 'onças', 'xícara', 'servindo', 'colher de sopa']
}, {
	'name': 'suco de maçã',
	'image': 'suco de maçã.jpg',
	'id': '9016',
	'aisle': 'Bebidas',
	'possibleUnits': ['g', 'caixa de bebida', 'onças', 'colher de chá', 'garrafa NFS', 'onça fluida', 'xícara', 'servindo', 'colher de sopa']
}, {
	'name': 'cidra de maçã',
	'image': 'cidra de maçã.jpg',
	'id': '1009016',
	'aisle': 'Bebidas',
	'possibleUnits': ['g', 'caixa de bebida', 'onças', 'colher de chá', 'garrafa NFS', 'onça fluida', 'xícara', 'servindo', 'colher de sopa']
}, {
	'name': 'geléia de maçã',
	'image': 'geléia de maçã.jpg',
	'id': '10019297',
	'aisle': 'Manteigas de nozes, geléias e mel',
	'possibleUnits': ['g', 'onças', 'pacote', 'colher de chá', 'xícara', 'servindo', 'colher de sopa']
}, {
	'name': 'manteiga de maçã',
	'image': 'geléia de maçã.jpg',
	'id': '19294',
	'aisle': 'Manteigas de nozes, geléias e mel',
	'possibleUnits': ['g', 'onças', 'xícara', 'servindo', 'colher de sopa']
}, {
	'name': 'tempero de torta de maçã',
	'image': 'garam-masala.jpg',
	'id': '1042035',
	'aisle': 'Especiarias e temperos',
	'possibleUnits': ['g', 'onças', 'colher de chá', 'xícara', 'colher de sopa']
}, {
	'name': 'recheio de torta de maçã',
	'image': 'fatia de torta de maçã.jpg',
	'id': '19312',
	'aisle': 'Cozimento',
	'possibleUnits': ['pode', 'g', 'onças', 'servindo']
}, {
	'name': 'vinagre de maçã',
	'image': 'vinagre de cidra de maçã.jpg',
	'id': '2048',
	'aisle': 'Azeite, vinagre, molho para salada',
	'possibleUnits': ['g', 'onças', 'colher de chá', 'xícara', 'colher de sopa']
}, {
	'name': 'bacon defumado de macieira',
	'image': 'bacon cru.png',
	'id': '10123',
	'aisle': 'Carne',
	'possibleUnits': ['fatia crua', 'pacote', 'faixa', 'erupção cutânea', 'pedaço', 'fatiar', 'g', 'onças', 'servindo']
}]

export const mockGetRecipesTranslated = [{
	'id': '715495',
	'title': 'Pizza de Queijo e Tomate Peru',
	'image': 'https://spoonacular.com/recipeImages/715495-312x231.jpg',
	'imageType': 'jpg'
}, {
	'id': '715769',
	'title': 'Brócolis Quinoa Pilaf',
	'image': 'https://spoonacular.com/recipeImages/715769-312x231.jpg',
	'imageType': 'jpg'
}, {
	'id': '715538',
	'title': 'O que fazer para o jantar hoje à noite?? Carne De Porco E Massa Estilo Bruscheta',
	'image': 'https://spoonacular.com/recipeImages/715538-312x231.jpg',
	'imageType': 'jpg'
}, {
	'id': '659109',
	'title': 'Risoto de quinoa com salmão',
	'image': 'https://spoonacular.com/recipeImages/659109-312x231.jpg',
	'imageType': 'jpg'
}, {
	'id': '648279',
	'title': 'Macarrão Italiano de Atum',
	'image': 'https://spoonacular.com/recipeImages/648279-312x231.jpg',
	'imageType': 'jpg'
}]
export const mockGetRandomRecipes = [{
	'vegetarian': 'falso',
	'vegan': 'falso',
	'glutenFree': 'verdadeiro',
	'dairyFree': 'falso',
	'veryHealthy': 'falso',
	'cheap': 'falso',
	'veryPopular': 'falso',
	'sustainable': 'falso',
	'lowFodmap': 'falso',
	'weightWatcherSmartPoints': '7',
	'gaps': 'não',
	'preparationMinutes': '-1',
	'cookingMinutes': '-1',
	'aggregateLikes': '8',
	'healthScore': '15',
	'creditsText': 'Foodista.com – A enciclopédia culinária que todos podem editar',
	'license': 'CC POR 3,0',
	'sourceName': 'Foodista',
	'pricePerServing': '250,75',
	'extendedIngredients': [{
		'id': '2044',
		'aisle': 'Produzir',
		'image': 'manjericão fresco.jpg',
		'consistency': 'SÓLIDO',
		'name': 'folhas de manjericão',
		'nameClean': 'manjericão fresco',
		'original': '15 folhas grandes de manjericão',
		'originalName': 'folhas de manjericão',
		'amount': '15',
		'unit': 'grande',
		'measures': {
			'us': {'amount': '15', 'unitShort': 'grande', 'unitLong': 'grandes'},
			'metric': {'amount': '15', 'unitShort': 'grande', 'unitLong': 'grandes'}
		}
	}, {
		'id': '2044',
		'aisle': 'Produzir',
		'image': 'manjericão.jpg',
		'consistency': 'SÓLIDO',
		'name': 'folhas de manjericão',
		'nameClean': 'manjericão fresco',
		'original': '15 folhas grandes de manjericão',
		'originalName': 'folhas de manjericão',
		'amount': '15',
		'unit': 'grande',
		'measures': {
			'us': {'amount': '15', 'unitShort': 'grande', 'unitLong': 'grandes'},
			'metric': {'amount': '15', 'unitShort': 'grande', 'unitLong': 'grandes'}
		}
	}, {
		'id': '1002030',
		'aisle': 'Especiarias e temperos',
		'image': 'pimenta.jpg',
		'consistency': 'SÓLIDO',
		'name': 'pimenta',
		'nameClean': 'Pimenta preta',
		'original': 'Pimenta preta moída na hora a gosto',
		'originalName': 'Pimenta preta moída na hora a gosto',
		'amount': '5',
		'unit': 'porções',
		'meta': ['preto', 'recém-moído', 'provar'],
		'measures': {
			'us': {'amount': '5', 'unitShort': 'porções', 'unitLong': 'porções'},
			'metric': {'amount': '5', 'unitShort': 'porções', 'unitLong': 'porções'}
		}
	}, {
		'id': '11209',
		'aisle': 'Produzir',
		'image': 'berinjela.png',
		'consistency': 'SÓLIDO',
		'name': 'beringela',
		'nameClean': 'beringela',
		'original': '1 berinjela grande e firme, cortada horizontalmente com 1/2 "de espessura, 8 a 10 fatias',
		'originalName': 'berinjela firme, cortada horizontalmente com 1/2 "de espessura, 8 a 10 fatias',
		'amount': '1',
		'unit': 'grande',
		'meta': ['espesso', 'empresa', 'fatiado'],
		'measures': {
			'us': {'amount': '1', 'unitShort': 'grande', 'unitLong': 'grande'},
			'metric': {'amount': '1', 'unitShort': 'grande', 'unitLong': 'grande'}
		}
	}, {
		'id': '10211215',
		'aisle': 'Produzir',
		'image': 'alho.jpg',
		'consistency': 'SÓLIDO',
		'name': 'dente de alho',
		'nameClean': 'dentes de alho inteiros',
		'original': '1 dente de alho pequeno picado',
		'originalName': 'dente de alho picado',
		'amount': '1',
		'unit': 'pequeno',
		'meta': ['picado'],
		'measures': {
			'us': {'amount': '1', 'unitShort': 'pequeno', 'unitLong': 'pequeno'},
			'metric': {'amount': '1', 'unitShort': 'pequeno', 'unitLong': 'pequeno'}
		}
	}, {
		'id': '1159',
		'aisle': 'Queijo',
		'image': 'queijo de cabra.jpg',
		'consistency': 'SÓLIDO',
		'name': 'queijo de cabra suave',
		'nameClean': 'queijo de cabra',
		'original': '1 xícara de queijo de cabra macio e suave',
		'originalName': 'queijo de cabra macio e suave',
		'amount': '1',
		'unit': 'xícara',
		'meta': ['macio'],
		'measures': {
			'us': {'amount': '1', 'unitShort': 'xícara', 'unitLong': 'xícara'},
			'metric': {'amount': '227', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}, {
		'id': '4053',
		'aisle': 'Azeite, vinagre, molho para salada',
		'image': 'azeite-de-oliva.jpg',
		'consistency': 'LÍQUIDO',
		'name': 'azeite',
		'nameClean': 'azeite',
		'original': '2 colheres de sopa de azeite',
		'originalName': 'azeite',
		'amount': '2',
		'unit': 'colheres de sopa',
		'measures': {
			'us': {'amount': '2', 'unitShort': 'colheres de sopa', 'unitLong': 'colheres de sopa'},
			'metric': {'amount': '2', 'unitShort': 'colheres de sopa', 'unitLong': 'colheres de sopa'}
		}
	}, {
		'id': '1038',
		'aisle': 'Queijo',
		'image': 'parmesão.jpg',
		'consistency': 'SÓLIDO',
		'name': 'queijo pecorino romano',
		'nameClean': 'pecorino romano',
		'original': '1/4 xícara de queijo Pecorino Romano ralado finamente',
		'originalName': 'Queijo Pecorino Romano ralado fino',
		'amount': '0,25',
		'unit': 'xícara',
		'meta': ['finamente ralado'],
		'measures': {
			'us': {'amount': '0,25', 'unitShort': 'xícaras', 'unitLong': 'xícaras'},
			'metric': {'amount': '25', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}, {
		'id': '10411529',
		'aisle': 'Produzir',
		'image': 'tomate-ameixa.png',
		'consistency': 'SÓLIDO',
		'name': 'tomate ameixa',
		'nameClean': 'Tomates ameixa',
		'original': '8 onças de tomate ameixa em fatias finas',
		'originalName': 'tomate ameixa em fatias finas',
		'amount': '8',
		'unit': 'onças',
		'meta': ['em fatias finas'],
		'measures': {
			'us': {'amount': '8', 'unitShort': 'onças', 'unitLong': 'onças'},
			'metric': {'amount': '226.796', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}, {
		'id': '2047',
		'aisle': 'Especiarias e temperos',
		'image': 'sal.jpg',
		'consistency': 'SÓLIDO',
		'name': 'sal',
		'nameClean': 'sal de mesa',
		'original': 'Sal a gosto',
		'originalName': 'Sal a gosto',
		'amount': '5',
		'unit': 'porções',
		'meta': ['provar'],
		'measures': {
			'us': {'amount': '5', 'unitShort': 'porções', 'unitLong': 'porções'},
			'metric': {'amount': '5', 'unitShort': 'porções', 'unitLong': 'porções'}
		}
	}, {
		'id': '11529',
		'aisle': 'Produzir',
		'image': 'tomate.png',
		'consistency': 'SÓLIDO',
		'name': 'Calda de tomate',
		'nameClean': 'tomate',
		'original': '3/4 xícara de Coulis de tomate (receita abaixo)',
		'originalName': 'Coulis de tomate (receita abaixo)',
		'amount': '0,75',
		'unit': 'xícara',
		'meta': ['(receita abaixo)'],
		'measures': {
			'us': {'amount': '0,75', 'unitShort': 'xícaras', 'unitLong': 'xícaras'},
			'metric': {'amount': '111,75', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}, {
		'id': '11529',
		'aisle': 'Produzir',
		'image': 'tomate.png',
		'consistency': 'SÓLIDO',
		'name': 'tomates de jardim',
		'nameClean': 'tomate',
		'original': '2 tomates grandes ou de jardim, cortados horizontalmente com 1/4 "de espessura, 4-5 fatias',
		'originalName': 'tomates tradicionais ou de jardim, cortados horizontalmente com 1/4 "de espessura, 4-5 fatias',
		'amount': '2',
		'unit': 'grande',
		'meta': ['espesso', 'fatiado'],
		'measures': {
			'us': {'amount': '2', 'unitShort': 'grande', 'unitLong': 'grandes'},
			'metric': {'amount': '2', 'unitShort': 'grande', 'unitLong': 'grandes'}
		}
	}],
	'id': '645696',
	'title': 'Pilhas de berinjela grelhada e tomate tradicional com coulis de manjericão e tomate',
	'readyInMinutes': '45',
	'servings': '5',
	'sourceUrl': 'http://www.foodista.com/recipe/WXQZBFHK/grilled-eggplant-and-heirloom-tomato-stacks-with-basil-and-tomato-coulis',
	'image': 'https://spoonacular.com/recipeImages/645696-556x370.jpg',
	'imageType': 'jpg',
	'summary': 'Berinjela grelhada e pilhas de tomate tradicional com manjericão e tomate Coulis é um acompanhamento sem glúten e primordial. Uma porção deste prato contém cerca de 12g de proteína, 17g de gordura e um total de 238 calorias. Esta receita serve 5 pessoas. Por $2,51 por porção, esta receita cobre 13% de suas necessidades diárias de vitaminas e minerais. Esta receita da Foodista tem 8 leques. Se você tiver dente de alho, coulis de tomate, berinjela e alguns outros ingredientes em mãos, poderá prepará-lo. O Quatro de Julho será ainda mais especial com esta receita. Do preparo ao prato, esta receita leva cerca de 45 minutos. Considerando tudo isso, decidimos que esta receita merece uma pontuação colherada de 84%. Essa pontuação é ótima. Pilhas de berinjela grelhada e tomate tradicional com manjericão e tomate Coulis, Pilhas de Berinjela e Tomate Grelhados e Pilhas de berinjela grelhada, tomate e queijo feta são muito semelhantes a esta receita.',
	'dishTypes': ['acompanhamento'],
	'diets': ['Não contém gluten', 'primitivo'],
	'occasions': ['Dia dos Pais', '4 de julho', 'verão'],
	'instructions': 'Prepare o Coulis de tomate:Faça incisões rasas com uma faca ao redor dos caules do tomate e retire-os.Faça uma incisão rasa em X na parte inferior do tomate. tomates.Leve uma panela grande com água para ferver.Mergulhe os tomates na água por 10 segundos.Retire e mergulhe os tomates em uma tigela com gelo. água.Retire os tomates resfriados da água.Retire a pele.Retire as sementes e pique os tomates grosseiramente.Combine tomate, alho e azeite na tigela do processador de alimentos.Processe até ficar homogêneo.Adicione sal e pimenta.Deixe o Tomato Coulis repousar em temperatura ambiente por uma hora antes de servir.Prepare a berinjela:Pré-aqueça a grelha do forno ou prepare a grelha.Picele levemente as fatias de berinjela dos dois lados com azeite.Polvilhe com sal e pimenta.Disponha na assadeira e grelhe no forno, virando uma vez, até dourar, cerca de 3 minutos de cada lado.Ou grelhe na churrasqueira. , virando, até dourar e ficar cozido.Organizar pilhas:Combine o alho e o queijo de cabra em uma tigela pequena.Adicione sal e preto moído na hora pimenta a gosto.Disponha 1/2 das fatias de berinjela em uma travessa.Coloque 2 colheres de chá de queijo de cabra por cima.Cubra com 1 folha de manjericão.< /li>Coloque a segunda fatia de berinjela na folha de manjericão.Cubra com uma colher de chá de queijo de cabra e folha de manjericão.Regue levemente 2-3 colheres de chá de Coulis de tomate sobre e ao redor do pilha de berinjela.Decore com uma colher de chá de queijo Pecorino Romano ralado.Sirva imediatamente.',
	'analyzedInstructions': [{
		'name': '',
		'steps': [{
			'number': '1',
			'step': 'Prepare Coulis de tomate: Faça incisões rasas com uma faca ao redor dos caules do tomate e retire-os. Faça uma incisão rasa em X no fundo dos tomates. .',
			'ingredients': [{
				'id': '11529',
				'name': 'tomate',
				'localizedName': 'tomate',
				'image': 'tomate.png'
			}, {'id': '14412', 'name': 'água', 'localizedName': 'água', 'image': 'água.png'}],
			'equipment': [{
				'id': '404669',
				'name': 'panela de molho',
				'localizedName': 'panela de molho',
				'image': 'panela de molho.jpg'
			}, {'id': '404745', 'name': 'faca', 'localizedName': 'faca', 'image': 'chefs-faca.jpg'}]
		}, {
			'number': '2',
			'step': 'Retire e mergulhe os tomates em uma tigela com água gelada.',
			'ingredients': [{'id': '14412', 'name': 'água', 'localizedName': 'água', 'image': 'água.png'}, {
				'id': '11529',
				'name': 'tomate',
				'localizedName': 'tomate',
				'image': 'tomate.png'
			}],
			'equipment': [{'id': '404783', 'name': 'tigela', 'localizedName': 'tigela', 'image': 'tigela.jpg'}]
		}, {
			'number': '3',
			'step': 'Retire os tomates resfriados da água. Retire a pele.',
			'ingredients': [{
				'id': '11529',
				'name': 'tomate',
				'localizedName': 'tomate',
				'image': 'tomate.png'
			}, {'id': '14412', 'name': 'água', 'localizedName': 'água', 'image': 'água.png'}]
		}, {
			'number': '4',
			'step': 'Retire as sementes e pique os tomates grosseiramente.',
			'ingredients': [{
				'id': '11529',
				'name': 'tomate',
				'localizedName': 'tomate',
				'image': 'tomate.png'
			}, {'id': '93818', 'name': 'sementes', 'localizedName': 'sementes', 'image': 'sementes de girassol.jpg'}]
		}, {
			'number': '5',
			'step': 'Misture os tomates, o alho e o azeite na tigela do processador de alimentos. Processe até ficar homogêneo.',
			'ingredients': [{
				'id': '4053',
				'name': 'azeite',
				'localizedName': 'azeite',
				'image': 'azeite-de-oliva.jpg'
			}, {'id': '11529', 'name': 'tomate', 'localizedName': 'tomate', 'image': 'tomate.png'}, {
				'id': '11215',
				'name': 'alho',
				'localizedName': 'alho',
				'image': 'alho.png'
			}],
			'equipment': [{
				'id': '404771',
				'name': 'processador de alimentos',
				'localizedName': 'processador de alimentos',
				'image': 'processador de alimentos.png'
			}, {'id': '404783', 'name': 'tigela', 'localizedName': 'tigela', 'image': 'tigela.jpg'}]
		}, {
			'number': '6',
			'step': 'Adicione sal e pimenta.',
			'ingredients': [{
				'id': '1102047',
				'name': 'sal e pimenta',
				'localizedName': 'sal e pimenta',
				'image': 'sal e pimenta.jpg'
			}]
		}, {
			'number': '7',
			'step': 'Deixe o Coulis de Tomate repousar em temperatura ambiente por uma hora antes de servir. Prepare a Berinjela: Pré-aqueça a grelha do forno ou prepare a grelha. Pincele levemente as fatias de berinjela dos dois lados com azeite.',
			'ingredients': [{
				'id': '4053',
				'name': 'azeite',
				'localizedName': 'azeite',
				'image': 'azeite-de-oliva.jpg'
			}, {'id': '11209', 'name': 'beringela', 'localizedName': 'beringela', 'image': 'berinjela.png'}, {
				'id': '11529',
				'name': 'tomate',
				'localizedName': 'tomate',
				'image': 'tomate.png'
			}],
			'equipment': [{
				'id': '405914',
				'name': 'frango',
				'localizedName': 'frango',
				'image': 'forno.jpg'
			}, {'id': '404706', 'name': 'grade', 'localizedName': 'grade', 'image': 'grelha.jpg'}, {
				'id': '404784',
				'name': 'forno',
				'localizedName': 'forno',
				'image': 'forno.jpg'
			}],
			'length': {'number': '60', 'unit': 'minutos'}
		}]
	}, {
		'name': 'Polvilhe com sal e pimenta. Disponha na assadeira e grelhe no forno, virando uma vez, até dourar, cerca de 3 minutos de cada lado. Ou grelhe na churrasqueira, virando, até dourar e ficar cozido.',
		'steps': [{
			'number': '1',
			'step': 'Combine o alho e o queijo de cabra em uma tigela pequena.',
			'ingredients': [{
				'id': '1159',
				'name': 'queijo de cabra',
				'localizedName': 'queijo de cabra',
				'image': 'queijo de cabra.jpg'
			}, {'id': '11215', 'name': 'alho', 'localizedName': 'alho', 'image': 'alho.png'}],
			'equipment': [{'id': '404783', 'name': 'tigela', 'localizedName': 'tigela', 'image': 'tigela.jpg'}]
		}, {
			'number': '2',
			'step': 'Adicione sal e pimenta-do-reino moída na hora a gosto. Disponha 1/2 das fatias de berinjela em uma travessa. Coloque 2 colheres de chá de queijo de cabra por cima.',
			'ingredients': [{
				'id': '1002030',
				'name': 'Pimenta preta da terra',
				'localizedName': 'Pimenta preta da terra',
				'image': 'pimenta.jpg'
			}, {
				'id': '1159',
				'name': 'queijo de cabra',
				'localizedName': 'queijo de cabra',
				'image': 'queijo de cabra.jpg'
			}, {
				'id': '2044',
				'name': 'manjericão fresco',
				'localizedName': 'manjericão fresco',
				'image': 'manjericão fresco.jpg'
			}, {'id': '11209', 'name': 'beringela', 'localizedName': 'beringela', 'image': 'berinjela.png'}, {
				'id': '2047',
				'name': 'sal',
				'localizedName': 'sal',
				'image': 'sal.jpg'
			}]
		}, {
			'number': '3',
			'step': 'Coloque a segunda fatia de berinjela na folha de manjericão. Cubra com uma colher de chá de queijo de cabra e folha de manjericão. Regue levemente 2-3 colheres de chá de Coulis de tomate sobre e ao redor da pilha de berinjela.',
			'ingredients': [{
				'id': '1159',
				'name': 'queijo de cabra',
				'localizedName': 'queijo de cabra',
				'image': 'queijo de cabra.jpg'
			}, {
				'id': '2044',
				'name': 'manjericão fresco',
				'localizedName': 'manjericão fresco',
				'image': 'manjericão fresco.jpg'
			}, {'id': '11209', 'name': 'beringela', 'localizedName': 'beringela', 'image': 'berinjela.png'}, {
				'id': '11529',
				'name': 'tomate',
				'localizedName': 'tomate',
				'image': 'tomate.png'
			}]
		}, {
			'number': '4',
			'step': 'Decore com uma colher de chá de queijo Pecorino Romano ralado.',
			'ingredients': [{
				'id': '1038',
				'name': 'pecorino romano',
				'localizedName': 'pecorino romano',
				'image': 'parmesão.jpg'
			}]
		}, {'number': '5', 'step': 'Sirva imediatamente.'}]
	}],
	'spoonacularSourceUrl': 'https://spoonacular.com/grilled-eggplant-and-heirloom-tomato-stacks-with-manjericão-e-tomato-coulis-645696'
}, {
	'vegetarian': 'verdadeiro',
	'vegan': 'falso',
	'glutenFree': 'falso',
	'dairyFree': 'falso',
	'veryHealthy': 'falso',
	'cheap': 'falso',
	'veryPopular': 'falso',
	'sustainable': 'falso',
	'lowFodmap': 'falso',
	'weightWatcherSmartPoints': '16',
	'gaps': 'não',
	'preparationMinutes': '-1',
	'cookingMinutes': '-1',
	'aggregateLikes': '2',
	'healthScore': '4',
	'creditsText': 'Foodista.com – A enciclopédia culinária que todos podem editar',
	'license': 'CC POR 3,0',
	'sourceName': 'Foodista',
	'pricePerServing': '77,26',
	'extendedIngredients': [{
		'id': '1095',
		'aisle': 'Cozimento',
		'image': 'leite evaporado.png',
		'consistency': 'SÓLIDO',
		'name': 'Leite condensado',
		'nameClean': 'leite condensado',
		'original': '½ xícara de leite condensado',
		'originalName': 'Leite condensado',
		'amount': '0,5',
		'unit': 'xícara',
		'measures': {
			'us': {'amount': '0,5', 'unitShort': 'xícaras', 'unitLong': 'xícaras'},
			'metric': {'amount': '153', 'unitShort': 'ml', 'unitLong': 'mililitros'}
		}
	}, {
		'id': '20027',
		'aisle': 'Cozimento',
		'image': 'pó branco.jpg',
		'consistency': 'SÓLIDO',
		'name': 'amido de milho',
		'nameClean': 'amido de milho',
		'original': '¼ xícara de amido de milho',
		'originalName': 'amido de milho',
		'amount': '0,25',
		'unit': 'xícara',
		'measures': {
			'us': {'amount': '0,25', 'unitShort': 'xícaras', 'unitLong': 'xícaras'},
			'metric': {'amount': '32', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}, {
		'id': '1125',
		'aisle': 'Leite, ovos, outros laticínios',
		'image': 'gema de ovo.jpg',
		'consistency': 'SÓLIDO',
		'name': 'gemas de ovo',
		'nameClean': 'gema de ovo',
		'original': '5 gemas de ovo',
		'originalName': 'gemas de ovo',
		'amount': '5',
		'unit': '',
		'measures': {
			'us': {'amount': '5', 'unitShort': '', 'unitLong': ''},
			'metric': {'amount': '5', 'unitShort': '', 'unitLong': ''}
		}
	}, {
		'id': '19334',
		'aisle': 'Cozimento',
		'image': 'açúcar mascavo escuro.png',
		'consistency': 'SÓLIDO',
		'name': 'açúcar mascavo',
		'nameClean': 'açúcar mascavo dourado',
		'original': '1 xícara de açúcar mascavo claro',
		'originalName': 'açúcar mascavo claro',
		'amount': '1',
		'unit': 'xícara',
		'meta': ['luz'],
		'measures': {
			'us': {'amount': '1', 'unitShort': 'xícara', 'unitLong': 'xícara'},
			'metric': {'amount': '220', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}, {
		'id': '19334',
		'aisle': 'Cozimento',
		'image': 'açúcar mascavo claro.jpg',
		'consistency': 'SÓLIDO',
		'name': 'açúcar mascavo',
		'nameClean': 'açúcar mascavo dourado',
		'original': '1 xícara de açúcar mascavo claro',
		'originalName': 'açúcar mascavo claro',
		'amount': '1',
		'unit': 'xícara',
		'meta': ['luz'],
		'measures': {
			'us': {'amount': '1', 'unitShort': 'xícara', 'unitLong': 'xícara'},
			'metric': {'amount': '220', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}, {
		'id': '1077',
		'aisle': 'Leite, ovos, outros laticínios',
		'image': 'leite.png',
		'consistency': 'LÍQUIDO',
		'name': 'leite homogeneizado',
		'nameClean': 'leite',
		'original': '2 xícaras de leite homogeneizado',
		'originalName': 'leite homogeneizado',
		'amount': '2',
		'unit': 'xícaras',
		'measures': {
			'us': {'amount': '2', 'unitShort': 'xícaras', 'unitLong': 'xícaras'},
			'metric': {'amount': '488', 'unitShort': 'ml', 'unitLong': 'mililitros'}
		}
	}, {
		'id': '10020080',
		'aisle': 'Cozimento',
		'image': 'farinha.png',
		'consistency': 'SÓLIDO',
		'name': 'farinha de pastelaria',
		'nameClean': 'farinha de trigo integral',
		'original': '2 ½ xícaras de farinha de pastelaria (para todos os fins está bom)',
		'originalName': 'farinha de pastelaria (para todos os fins está bem)',
		'amount': '2,5',
		'unit': 'xícaras',
		'meta': ['Todos os propósitos', 'multar', '( é )'],
		'measures': {
			'us': {'amount': '2,5', 'unitShort': 'xícaras', 'unitLong': 'xícaras'},
			'metric': {'amount': '300', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}, {
		'id': '2047',
		'aisle': 'Especiarias e temperos',
		'image': 'sal.jpg',
		'consistency': 'SÓLIDO',
		'name': 'sal',
		'nameClean': 'sal de mesa',
		'original': 'sal',
		'originalName': 'sal',
		'amount': '10',
		'unit': 'porções',
		'measures': {
			'us': {'amount': '10', 'unitShort': 'porções', 'unitLong': 'porções'},
			'metric': {'amount': '10', 'unitShort': 'porções', 'unitLong': 'porções'}
		}
	}, {
		'id': '1145',
		'aisle': 'Leite, ovos, outros laticínios',
		'image': 'fatiado de manteiga.jpg',
		'consistency': 'SÓLIDO',
		'name': 'manteiga',
		'nameClean': 'manteiga sem sal',
		'original': '6 colheres de sopa de manteiga sem sal',
		'originalName': 'manteiga sem sal',
		'amount': '6',
		'unit': 'colher de sopa',
		'meta': ['sem sal'],
		'measures': {
			'us': {'amount': '6', 'unitShort': 'colheres de sopa', 'unitLong': 'colheres de sopa'},
			'metric': {'amount': '6', 'unitShort': 'colheres de sopa', 'unitLong': 'colheres de sopa'}
		}
	}, {
		'id': '14051',
		'aisle': 'Bebidas Alcoólicas',
		'image': 'vodca.jpg',
		'consistency': 'LÍQUIDO',
		'name': 'vodka',
		'nameClean': 'vodka',
		'original': '¼ xícara de vodca gelada',
		'originalName': 'vodka gelada',
		'amount': '0,25',
		'unit': 'xícara',
		'meta': ['frio'],
		'measures': {
			'us': {'amount': '0,25', 'unitShort': 'xícaras', 'unitLong': 'xícaras'},
			'metric': {'amount': '60', 'unitShort': 'ml', 'unitLong': 'mililitros'}
		}
	}, {
		'id': '14412',
		'aisle': 'Bebidas',
		'image': 'água.png',
		'consistency': 'LÍQUIDO',
		'name': 'água',
		'nameClean': 'água',
		'original': '¼ xícara de água fria',
		'originalName': 'água fria',
		'amount': '0,25',
		'unit': 'xícara',
		'meta': ['frio'],
		'measures': {
			'us': {'amount': '0,25', 'unitShort': 'xícaras', 'unitLong': 'xícaras'},
			'metric': {'amount': '59.147', 'unitShort': 'ml', 'unitLong': 'mililitros'}
		}
	}, {
		'id': '14052',
		'aisle': 'Bebidas Alcoólicas',
		'image': 'garrafa de uísque.jpg',
		'consistency': 'LÍQUIDO',
		'name': 'whisky irlandês',
		'nameClean': 'uísque',
		'original': '1 onça de uísque irlandês',
		'originalName': 'Uísque irlandês',
		'amount': '1',
		'unit': 'onças',
		'measures': {
			'us': {'amount': '1', 'unitShort': 'onças', 'unitLong': 'onça'},
			'metric': {'amount': '28h35', 'unitShort': 'g', 'unitLong': 'gramas'}
		}
	}],
	'id': '648010',
	'title': 'Torta de Whisky Irlandês',
	'readyInMinutes': '45',
	'servings': '10',
	'sourceUrl': 'http://www.foodista.com/recipe/K7SR4SYV/irish-whiskey-pie',
	'image': 'https://spoonacular.com/recipeImages/648010-556x370.png',
	'imageType': 'png',
	'summary': 'A torta de uísque irlandês pode ser a sobremesa que você está procurando. Por 77 centavos por porção, esta receita cobre 12% de suas necessidades diárias de vitaminas e minerais. Esta receita serve 10 pessoas. Observando sua figura? Esta receita ovo-lacto vegetariana tem 387 calorias, 8g de proteína e 13g de gordura por porção. Esta receita da Foodista tem 2 leques. Vá até a loja e compre manteiga, sal, açúcar mascavo e algumas outras coisas para fazer hoje. st. Patrick Day ficará ainda mais especial com esta receita. Esta receita é típica da cozinha europeia. Do preparo ao prato, esta receita leva cerca de 45 minutos. Levando todos os fatores em consideração, esta receita obtém uma pontuação colherada de 36%, o que é bastante ruim. Receitas semelhantes incluem Pão de soda de uísque irlandês com manteiga de uísque irlandês, Torta de brownie de uísque irlandês e  Bolo de maçã irlandês com molho de caramelo de uísque irlandês .',
	'cuisines': ['europeu', 'irlandês'],
	'dishTypes': ['sobremesa'],
	'diets': ['ovo lacto vegetariano'],
	'occasions': ['dia de São Patricio'],
	'instructions': 'Para a crosta:Peneire a farinha e o sal em uma tigela grande.Use um processador de alimentos, um liquidificador ou duas facas e uma boa quantidade de paciência, corte a manteiga na farinha.Adicione água e vodka mexendo após cada adição até formar uma massa.Faça uma bola e corte-a ao meio.Achate cada metade em um disco, embrulhe-as em papel manteiga e leve à geladeira por pelo menos meia hora antes de assar.Você só precisará de uma metade para esta receita, então fique à vontade para congelar. a outra metade para futuras emergências de torta.Quando estiver pronto para assar, pré-aqueça o forno a 375°CColoque a massa sobre uma superfície bem enfarinhada e, usando um rolo bem enfarinhado, estenda a massa. massa para caber em uma forma de torta de 23 cm.Coloque a massa na forma de torta e apare e amasse as bordas.Fure a massa várias vezes com um garfo. Enrole a massa com papel alumínio e preencha o centro com pesos de torta ou feijões secos.Coloque no centro do forno e leve ao forno por 25 minutos.Retire os pesos e papel alumínio e leve ao forno por mais nove minutos ou até dourar.Retire do forno e deixe esfriar.Para o recheio:Em uma forma média tigela grande, misture o leite condensado, o amido de milho e o sal.Adicione as gemas, uma de cada vez, mexendo até incorporar após cada adição. Reserve.Em uma panela média, derreta a manteiga em fogo moderado.Adicione o açúcar mascavo e deixe borbulhar um pouco.Adicione lentamente o leite.< /li>Adicione a mistura de ovos lentamente, mexendo sempre.Deixe ferver novamente enquanto bate a mistura.Quando a mistura estiver fervendo, deixe cozinhar enquanto mexe por aproximadamente um minuto ou até engrossar.Retire do fogo e misture o uísque.Despeje em uma forma de torta resfriada e cubra com filme plástico.Coloque em coloque na geladeira e deixe descansar por quatro horas.Você pode servir a torta com chantilly se quiser, mas acho que é tão saborosa que gosto de comê-la ao natural.',
	'analyzedInstructions': [{
		'name': '',
		'steps': [{
			'number': '1',
			'step': 'Para a crosta: Peneire a farinha e o sal em uma tigela grande. Usando um processador de alimentos, um liquidificador ou duas facas e muita paciência, corte a manteiga na farinha.',
			'ingredients': [{
				'id': '1001',
				'name': 'manteiga',
				'localizedName': 'manteiga',
				'image': 'fatiado de manteiga.jpg'
			}, {'id': '0', 'name': 'crosta', 'localizedName': 'crosta', 'image': ''}, {
				'id': '20081',
				'name': 'farinha multiuso',
				'localizedName': 'farinha multiuso',
				'image': 'farinha.png'
			}, {'id': '2047', 'name': 'sal', 'localizedName': 'sal', 'image': 'sal.jpg'}],
			'equipment': [{
				'id': '404771',
				'name': 'processador de alimentos',
				'localizedName': 'processador de alimentos',
				'image': 'processador de alimentos.png'
			}, {
				'id': '404726',
				'name': 'liquidificador',
				'localizedName': 'liquidificador',
				'image': 'liquidificador.png'
			}, {'id': '404783', 'name': 'tigela', 'localizedName': 'tigela', 'image': 'tigela.jpg'}]
		}, {
			'number': '2',
			'step': 'Adicione água e vodka mexendo após cada adição até formar uma massa. Forme uma bola e corte ao meio. preciso de uma metade para esta receita, então fique à vontade para congelar a outra metade para futuras emergências de torta. Quando estiver pronto para assar, pré-aqueça o forno a 375',
			'ingredients': [{'id': '0', 'name': 'massa', 'localizedName': 'massa', 'image': 'massa de pizza'}, {
				'id': '14051',
				'name': 'vodka',
				'localizedName': 'vodka',
				'image': 'vodca.jpg'
			}, {'id': '14412', 'name': 'água', 'localizedName': 'água', 'image': 'água.png'}, {
				'id': '10018364',
				'name': 'enrolar',
				'localizedName': 'enrolar',
				'image': 'farinha-tortilla.jpg'
			}],
			'equipment': [{
				'id': '404739',
				'name': 'papel de cera',
				'localizedName': 'papel de cera',
				'image': 'papel-cera.jpg'
			}, {'id': '404784', 'name': 'forno', 'localizedName': 'forno', 'image': 'forno.jpg'}]
		}, {
			'number': '3',
			'step': 'Coloque a massa sobre uma superfície bem enfarinhada e, usando um rolo bem enfarinhado, estenda a massa para caber em uma forma de torta de 23 cm.',
			'ingredients': [{
				'id': '0',
				'name': 'rolar',
				'localizedName': 'rolar',
				'image': 'jantar-rolinhos de fermento.jpg'
			}],
			'equipment': [{'id': '404746', 'name': 'rolo', 'localizedName': 'rolo', 'image': 'rolo de massa.jpg'}]
		}, {
			'number': '4',
			'step': 'Coloque a massa na forma de torta e corte e amasse as bordas. Pique a massa várias vezes com um garfo. Enrole a massa com papel alumínio e preencha o centro com pesos de torta ou feijão seco.',
			'ingredients': [{
				'id': '10116032',
				'name': 'feijão seco',
				'localizedName': 'feijão seco',
				'image': 'feijão-roxo.jpg'
			}, {'id': '0', 'name': 'massa', 'localizedName': 'massa', 'image': 'massa de pizza'}, {
				'id': '10018364',
				'name': 'enrolar',
				'localizedName': 'enrolar',
				'image': 'farinha-tortilla.jpg'
			}],
			'equipment': [{
				'id': '404765',
				'name': 'folha de alumínio',
				'localizedName': 'folha de alumínio',
				'image': 'folha de alumínio.png'
			}]
		}, {
			'number': '5',
			'step': 'Coloque no centro do forno e leve ao forno por 25 minutos.',
			'equipment': [{'id': '404784', 'name': 'forno', 'localizedName': 'forno', 'image': 'forno.jpg'}],
			'length': {'number': '25', 'unit': 'minutos'}
		}, {
			'number': '6',
			'step': 'Retire os pesos e o papel alumínio e leve ao forno por mais nove minutos ou até dourar.',
			'equipment': [{'id': '404784', 'name': 'forno', 'localizedName': 'forno', 'image': 'forno.jpg'}, {
				'id': '404765',
				'name': 'folha de alumínio',
				'localizedName': 'folha de alumínio',
				'image': 'folha de alumínio.png'
			}],
			'length': {'number': '9', 'unit': 'minutos'}
		}, {
			'number': '7',
			'step': 'Retire do forno e deixe esfriar. Para o Recheio: Em uma tigela média misture o leite condensado, o amido de milho e o sal.',
			'ingredients': [{
				'id': '1095',
				'name': 'leite condensado',
				'localizedName': 'leite condensado',
				'image': 'leite evaporado.png'
			}, {
				'id': '20027',
				'name': 'amido de milho',
				'localizedName': 'amido de milho',
				'image': 'pó branco.jpg'
			}, {'id': '2047', 'name': 'sal', 'localizedName': 'sal', 'image': 'sal.jpg'}],
			'equipment': [{
				'id': '404661',
				'name': 'batedor',
				'localizedName': 'batedor',
				'image': 'batedor.png'
			}, {'id': '404783', 'name': 'tigela', 'localizedName': 'tigela', 'image': 'tigela.jpg'}, {
				'id': '404784',
				'name': 'forno',
				'localizedName': 'forno',
				'image': 'forno.jpg'
			}]
		}, {
			'number': '8',
			'step': 'Adicione as gemas, uma de cada vez, mexendo até incorporar após cada adição. Reserve. Em uma panela média, derreta a manteiga em fogo moderado.',
			'ingredients': [{
				'id': '1125',
				'name': 'gema de ovo',
				'localizedName': 'gema de ovo',
				'image': 'gema de ovo.jpg'
			}, {'id': '1001', 'name': 'manteiga', 'localizedName': 'manteiga', 'image': 'fatiado de manteiga.jpg'}],
			'equipment': [{
				'id': '404661',
				'name': 'batedor',
				'localizedName': 'batedor',
				'image': 'batedor.png'
			}, {
				'id': '404669',
				'name': 'panela de molho',
				'localizedName': 'panela de molho',
				'image': 'panela de molho.jpg'
			}]
		}, {
			'number': '9',
			'step': 'Adicione o açúcar mascavo e deixe borbulhar um pouco. Misture lentamente o leite.',
			'ingredients': [{
				'id': '19334',
				'name': 'açúcar mascavo',
				'localizedName': 'açúcar mascavo',
				'image': 'açúcar mascavo escuro.png'
			}, {'id': '1077', 'name': 'leite', 'localizedName': 'leite', 'image': 'leite.png'}],
			'equipment': [{'id': '404661', 'name': 'batedor', 'localizedName': 'batedor', 'image': 'batedor.png'}]
		}, {
			'number': '10',
			'step': 'Adicione a mistura de ovos lentamente, mexendo sempre. Deixe ferver novamente enquanto mexe a mistura. Quando a mistura estiver fervendo, deixe cozinhar mexendo por aproximadamente um minuto ou até engrossar.',
			'ingredients': [{'id': '1123', 'name': 'ovo', 'localizedName': 'ovo', 'image': 'ovo.png'}],
			'equipment': [{'id': '404661', 'name': 'batedor', 'localizedName': 'batedor', 'image': 'batedor.png'}],
			'length': {'number': '1', 'unit': 'minutos'}
		}, {
			'number': '11',
			'step': 'Retire do fogo e misture o whisky.',
			'ingredients': [{'id': '14052', 'name': 'uísque', 'localizedName': 'uísque', 'image': 'garrafa de uísque.jpg'}]
		}, {
			'number': '12',
			'step': 'Despeje em uma forma de torta resfriada e cubra com filme plástico.',
			'ingredients': [{
				'id': '18334',
				'name': 'crosta de torta',
				'localizedName': 'crosta de torta',
				'image': 'torta-crosta.jpg'
			}, {'id': '10018364', 'name': 'enrolar', 'localizedName': 'enrolar', 'image': 'farinha-tortilla.jpg'}],
			'equipment': [{
				'id': '404730',
				'name': 'filme plástico',
				'localizedName': 'filme plástico',
				'image': 'plástico-wrap.jpg'
			}]
		}, {
			'number': '13',
			'step': 'Coloque na geladeira e deixe descansar por quatro horas. Você pode servir a torta com chantilly se quiser, mas acho tão saborosa que gosto de comê-la ao natural.',
			'ingredients': [{'id': '1054', 'name': 'chantilly', 'localizedName': 'chantilly', 'image': 'chantilly.jpg'}],
			'length': {'number': '240', 'unit': 'minutos'}
		}]
	}],
	'spoonacularSourceUrl': 'https://spoonacular.com/irish-whiskey-pie-648010'
}]