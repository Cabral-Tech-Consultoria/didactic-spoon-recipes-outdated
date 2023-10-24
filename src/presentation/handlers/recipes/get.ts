import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {ConvertTo} from '../../../utils/convertion/converter'
import {BaseQueryStringSearch} from '../../../infra/protocols/interfaces'
import {DIContainerConfig, TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {RecipeController} from '../../controllers/recipes/recipe.controller'
import {RecipeService} from '../../../domain/services/recipe.service'
import {IRecipeController} from '../../controllers/recipes/protocols/i-recipe.controller'
import {IRecipeService} from '../../../domain/services/protocols/i-recipe.service'
import {ITranslationService} from '../../../domain/services/protocols/i-translation.service'
import {TranslationService} from '../../../domain/services/translation.service'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	DIContainerConfig.bindClass<IRecipeController>(TYPES_DI.RecipeController, RecipeController)
	DIContainerConfig.bindClass<IRecipeService>(TYPES_DI.RecipeService, RecipeService)
	DIContainerConfig.bindClass<ITranslationService>(TYPES_DI.TranslationService, TranslationService)

	const controller = DIContainerConfig.container.resolve(RecipeController)

	return controller.get(ConvertTo<BaseQueryStringSearch>(event.queryStringParameters))
}