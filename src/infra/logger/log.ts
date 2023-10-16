import pino, {Logger} from 'pino'

class Log {
	constructor() {
		this.instance = pino({
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true
				}
			}
		})
	}

	instance: Logger

	info(params: unknown) {
		this.instance.info(params)
	}

	error(params: unknown) {
		this.instance.error(params)
	}

	warn(params: unknown) {
		this.instance.warn(params)
	}
}

export default new Log()