import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {DIContainerConfig} from '../../../infra/dependency-injection/types.di'
import {RecipeController} from '../../controllers/recipes/recipe.controller'
import {RecipeService} from '../../../infra/http'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	DIContainerConfig.bindClass(RecipeController)
	DIContainerConfig.bindClass(RecipeService)

	const controller = DIContainerConfig.container.resolve(RecipeController)

	return controller.getById(
		Number(event.pathParameters?.id),
		event.queryStringParameters?.includeNutrition === 'true'
	)
}