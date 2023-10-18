import {InternalServerError} from '../internal-server.error'
import {MissingParamError} from '../missing-param.error'
import {BadRequestError} from '../bad-request.error'

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

export const badRequestError = () => {
	const err = new BadRequestError()
	return {
		statusCode: 400,
		body: JSON.stringify({ message: err.message })
	}
}