import axios, {AxiosInstance} from 'axios'
import dotenv from 'dotenv'

class HttpClient {
	constructor() {
		dotenv.config()

		this.instance = axios.create({
			baseURL: 'https://api.spoonacular.com',
			timeout: 1000,
			headers: {'x-api-key': String(process.env.API_KEY)}
		})
	}
	instance: AxiosInstance
}

export default new HttpClient()