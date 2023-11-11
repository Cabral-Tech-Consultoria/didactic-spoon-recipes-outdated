import {IAuthController} from './protocols/i-auth.controller'
import {UserDTO} from '../../../infra/protocols/dtos/user.dto'
import {APIGatewayProxyResult} from 'aws-lambda'
import {validateRequiredParams} from '../../../main/validations/validate-required-params'
import {badRequestError, unprocessableEntityError} from '../../../infra/error/http/error'
import {noContent} from '../../../infra/http'
import {inject, injectable} from 'inversify'
import {TYPES_DI} from '../../../infra/dependency-injection/types.di'
import {IAuthService} from '../../../domain/services/protocols/i-auth.service'
import logger from '../../../infra/logger/log'

import * as util from 'util'

util.inspect.defaultOptions.depth = null

@injectable()
export class AuthController implements IAuthController {
	constructor(@inject(TYPES_DI.AuthService) private service: IAuthService) {
	}

	async register(user: UserDTO): Promise<APIGatewayProxyResult> {
		logger.info({message: 'Params received', payload: user})
		try {
			logger.info({message: 'Params received', payload: user})
			const requiredProperties = ['name', 'username', 'email', 'phoneNumber', 'password']
			const propertiesMissing = validateRequiredParams<UserDTO>(user, requiredProperties)

			logger.info({message: 'Validate if there are any parameter missing'})
			if (propertiesMissing.length) {
				return unprocessableEntityError()
			}

			logger.info({message: 'Validate if password and passwordConfirmation are the same'})
			if (user.password !== user.passwordConfirmation) {
				return badRequestError()
			}

			logger.info({message: 'Try register the user'})
			await this.service.register(user)

			return noContent()
		} catch (err) {
			console.log('\n\n\n')
			console.log(err)
			return {
				statusCode: 200,
				body: JSON.stringify(err)
			}
			// return internalServerError()
		}
	}
}