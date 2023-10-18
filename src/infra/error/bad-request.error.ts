export class BadRequestError extends Error {
	constructor() {
		super()
		this.message = 'BadRequestError: Something went wrong. Try again later.'
		this.stack = 'BadRequestError'
	}
}