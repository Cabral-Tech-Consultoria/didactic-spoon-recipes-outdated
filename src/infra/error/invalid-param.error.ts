export class InvalidParamError extends Error {
	constructor() {
		super()
		this.message = 'InvalidParamError: The parameters given are invalid. Review the parameters and try again.'
		this.stack = 'InvalidParamError'
	}
}