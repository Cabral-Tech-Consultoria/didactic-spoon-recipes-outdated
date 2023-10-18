import {InternalServerError} from '../internal-server.error'
import {MissingParamError} from '../missing-param.error'

export const internalServerError = () => {
	const err = new InternalServerError()
	return {
		statusCode: 500,
		body: JSON.stringify({ message: err.message })
	}
}

export const missingParamError = (param: string) => {
	const err = new MissingParamError(param)
	return {
		statusCode: 406,
		body: JSON.stringify({ message: err.message })
	}
}