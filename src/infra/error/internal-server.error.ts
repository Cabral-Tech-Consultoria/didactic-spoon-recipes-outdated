export class InternalServerError extends Error {
	constructor() {
		super()
		this.message = 'InternalServerError: Occurred an unexpected error. Try again later.'
		this.stack = 'InternalServerError'
	}
}