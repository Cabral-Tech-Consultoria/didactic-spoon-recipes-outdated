import {InternalServerError} from '../internal-server.error'
import {MissingParamError} from '../missing-param.error'
import {BadRequestError} from '../bad-request.error'
import {InvalidParamError} from '../invalid-param.error'
import {UnprocessableEntityError} from '../unprocessable-entity.error'

export const internalServerError = () => {
	const err = new InternalServerError()
	return {
		statusCode: 500,
		body: JSON.stringify({message: err.message})
	}
}

export const missingParamError = (param: string) => {
	const err = new MissingParamError(param)
	return {
		statusCode: 406,
		body: JSON.stringify({message: err.message})
	}
}

export const badRequestError = () => {
	const err = new BadRequestError()
	return {
		statusCode: 400,
		body: JSON.stringify({message: err.message})
	}
}

export const invalidParamError = () => {
	const err = new InvalidParamError()
	return {
		statusCode: 422,
		body: JSON.stringify({message: err.message})
	}
}

export const unprocessableEntityError = () => {
	const err = new UnprocessableEntityError()
	return {
		statusCode: 422,
		body: JSON.stringify({message: err.message})
	}
}