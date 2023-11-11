import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {DIContainerConfig, TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {AuthController} from '../../controllers/auth/auth.controller'
import {IAuthController} from '../../controllers/auth/protocols/i-auth.controller'
import {AuthService} from '../../../domain/services/auth.service'
import {IAuthService} from '../../../domain/services/protocols/i-auth.service'

export const handle: Handler = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	DIContainerConfig.bindClass<IAuthController>(TYPES_DI.AuthController, AuthController)
	DIContainerConfig.bindClass<IAuthService>(TYPES_DI.AuthService, AuthService)

	const controller = DIContainerConfig.container.resolve(AuthController)

	return controller.register(JSON.parse(event.body as string))
}