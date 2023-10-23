import axios, {AxiosInstance} from 'axios'

export const ConstructHttpInstance = (prefix: string): AxiosInstance => {
	return axios.create({
		baseURL: `https://api.spoonacular.com/${prefix}`,
		timeout: 6000,
		headers: {'x-api-key': 'f01c59785f7a44bea435e9c72d36c605'}
	})
}