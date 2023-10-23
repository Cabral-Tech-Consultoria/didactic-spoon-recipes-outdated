import axios, {AxiosInstance} from 'axios'

export const ConstructHttpInstance = (prefix: string): AxiosInstance => {
	return axios.create({
		baseURL: `https://api.spoonacular.com/${prefix}`,
		timeout: 6000,
		headers: {'x-api-key': 'f01c59785f7a44bea435e9c72d36c605'}
	})
}

export const TranslationHttpFactory = (prefix: string): AxiosInstance => {
	config()

	return axios.create({
		baseURL: `https://lecto-translation.p.rapidapi.com/v1/${prefix}`,
		timeout: 6000,
		headers: {
			'X-RapidAPI-Key': String(process.env.TRANSLATION_API_KEY),
			'X-RapidAPI-Host': String(process.env.TRANSLATION_API_ADDRESS),
		}
	})
}