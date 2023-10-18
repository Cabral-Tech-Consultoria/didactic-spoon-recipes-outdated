export class MissingParamError extends Error {
	constructor(param: string) {
		super()
		this.message = `MissingParamError: The request is missing the \\${param}\\.`
		this.stack = 'MissingParamError'
	}
}