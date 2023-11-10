import {IAuthController} from './protocols/i-auth.controller'
import {UserDTO} from '../../../infra/protocols/dtos/user.dto'
import {APIGatewayProxyResult} from 'aws-lambda'
import {validateRequiredParams} from '../../../main/validations/validate-required-params'
import {badRequestError, internalServerError, unprocessableEntityError} from '../../../infra/error/http/error'
import {ok} from '../../../infra/http'

export class AuthController implements IAuthController {
	async register(user: UserDTO): Promise<APIGatewayProxyResult> {
		try {
			const {
				name,
				username,
				email,
				phoneNumber,
				password,
				passwordConfirmation
			} = user
			const requiredProperties = ['name', 'username', 'email', 'phoneNumber', 'password']
			const propertiesMissing = validateRequiredParams<UserDTO>(user, requiredProperties)

			if (propertiesMissing.length) {
				return unprocessableEntityError()
			}

			if (password !== passwordConfirmation) {
				return badRequestError()
			}

			return ok({
				name,
				username,
				email,
				phoneNumber,
				password,
				passwordConfirmation
			})
		} catch (err) {
			return internalServerError()
		}
	}
}