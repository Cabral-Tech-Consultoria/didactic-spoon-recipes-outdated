import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {DIContainerConfig, TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {IngredientController} from '../../controllers/ingredients/ingredient.controller'
import {IngredientService} from '../../../domain/services/ingredient.service'
import {ConvertTo} from '../../../utils/convertion/converter'
import {QueryIngredientSearch} from '../../../infra/protocols/interfaces/query-ingredient-search.interface'
import {IIngredientController} from '../../controllers/ingredients/protocols/i-ingredient.controller'
import {IIngredientService} from '../../../domain/services/protocols/i-ingredient.service'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	DIContainerConfig.bindClass<IIngredientController>(TYPES_DI.IngredientController, IngredientController)
	DIContainerConfig.bindClass<IIngredientService>(TYPES_DI.IngredientService, IngredientService)

	const controller = DIContainerConfig.container.resolve(IngredientController)

	return controller.search(ConvertTo<QueryIngredientSearch>(event.queryStringParameters))
}