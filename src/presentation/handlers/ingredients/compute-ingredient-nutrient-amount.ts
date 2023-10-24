import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {DIContainerConfig, TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {IngredientController} from '../../controllers/ingredients/ingredient.controller'
import {IngredientService} from '../../../domain/services/ingredient.service'
import {ConvertTo} from '../../../utils/convertion/converter'
import {IIngredientController} from '../../controllers/ingredients/protocols/i-ingredient.controller'
import {IIngredientService} from '../../../domain/services/protocols/i-ingredient.service'
import {
	QueryComputeIngredientNutrientAmount
} from '../../../infra/protocols/interfaces/query-compute-ingredient-nutrient-amount.interface'
import {ITranslationService} from '../../../domain/services/protocols/i-translation.service'
import {TranslationService} from '../../../domain/services/translation.service'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	DIContainerConfig.bindClass<IIngredientController>(TYPES_DI.IngredientController, IngredientController)
	DIContainerConfig.bindClass<IIngredientService>(TYPES_DI.IngredientService, IngredientService)
	DIContainerConfig.bindClass<ITranslationService>(TYPES_DI.TranslationService, TranslationService)

	const controller = DIContainerConfig.container.resolve(IngredientController)

	return controller.computeIngredientNutrientAmount(
		Number(event.pathParameters?.id),
		ConvertTo<QueryComputeIngredientNutrientAmount>(event.queryStringParameters)
	)
}