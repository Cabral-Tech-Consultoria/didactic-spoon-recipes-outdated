import {AuthController} from '../../../src/presentation/controllers/auth/auth.controller'
import {IAuthService} from '../../../src/domain/services/protocols/i-auth.service'
import {UserDTO} from '../../../src/infra/protocols/dtos/user.dto'
import {SignUpCommandOutput} from '@aws-sdk/client-cognito-identity-provider'

export const makeSut = () => {
	const service = buildAuthService()
	const controller = new AuthController(service)

	return {
		controller,
		service
	}
}

export const buildAuthService = () => {
	class AuthServiceStub implements IAuthService {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async register(user: UserDTO): Promise<SignUpCommandOutput> {

			return {} as SignUpCommandOutput
		}
	}

	return new AuthServiceStub()
}