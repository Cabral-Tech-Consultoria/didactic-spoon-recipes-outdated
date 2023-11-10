export class UnprocessableEntityError extends Error {
	constructor() {
		super()
		this.message = 'UnprocessableEntityError: The object received is malformed or is missing required properties.'
		this.stack = 'UnprocessableEntityError'
	}
}