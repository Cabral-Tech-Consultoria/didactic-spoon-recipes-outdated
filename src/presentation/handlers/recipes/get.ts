import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {ConvertTo} from '../../../utils/convertion/converter'
import {BaseQueryStringSearch} from '../../../infra/protocols/interfaces/querystring.interface'
import {DIContainerConfig, TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {RecipeController} from '../../controllers/recipes/recipe.controller'
import {RecipeService} from '../../../domain/services/recipe.service'
import {IRecipeController} from '../../controllers/recipes/protocols/i-recipe.controller'
import {IRecipeService} from '../../../domain/services/protocols/i-recipe.service'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	DIContainerConfig.bindClass<IRecipeController>(TYPES_DI.RecipeController, RecipeController)
	DIContainerConfig.bindClass<IRecipeService>(TYPES_DI.RecipeService, RecipeService)

	const controller = DIContainerConfig.container.resolve(RecipeController)

	return controller.get(ConvertTo<BaseQueryStringSearch>(event.queryStringParameters))
}