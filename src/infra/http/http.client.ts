import axios, {AxiosInstance} from 'axios'
import { config } from 'dotenv'

export const FoodHttpFactory = (prefix: string): AxiosInstance => {
	config()

	return axios.create({
		baseURL: `https://api.spoonacular.com/${prefix}`,
		timeout: 6000,
		headers: {'x-api-key': String(process.env.FOOD_API_KEY)}
	})
}

export const TranslationHttpFactory = (prefix: string): AxiosInstance => {
	config()

	return axios.create({
		baseURL: `https://aibit-translator.p.rapidapi.com/api/v1/${prefix}`,
		timeout: 6000,
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'accept-encoding': '',
			'X-RapidAPI-Key': String(process.env.TRANSLATION_API_KEY),
			'X-RapidAPI-Host': String(process.env.TRANSLATION_API_ADDRESS),
		}
	})
}