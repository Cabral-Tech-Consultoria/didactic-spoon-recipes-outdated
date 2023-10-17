import {InternalServerError} from '../internal-server.error'

export const internalServerError = () => {
	const err = new InternalServerError()
	return {
		statusCode: 500,
		body: JSON.stringify({ message: err.message })
	}
}