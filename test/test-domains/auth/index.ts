import {AuthController} from '../../../src/presentation/controllers/auth/auth.controller'

export const makeSut = () => {
	const controller = new AuthController()

	return {
		controller
	}
}