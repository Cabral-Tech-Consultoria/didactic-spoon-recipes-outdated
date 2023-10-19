import {APIGatewayProxyResult} from 'aws-lambda'
import {QueryAutocompleteSearch} from '../../../infra/protocols/interfaces/query-autocomplete-search.interface'
import RecipeService, {noContent, ok} from '../../../infra/http'
import {internalServerError, missingParamError} from '../../../infra/error/http/error'
import {IAutocompleteSearch} from '../../../domain/protocols/interfaces/autocomplete-search.interface'

export const getAutocompleteSearch = async (params?: QueryAutocompleteSearch): Promise<APIGatewayProxyResult> => {
	try {
		if (!params?.query) {
			return missingParamError('query')
		}

		const { data } = await RecipeService
			.http
			.get<IAutocompleteSearch[]>('/autocomplete', { params })

		if (!data.length) {
			return noContent()
		}

		return ok<IAutocompleteSearch[]>(data)
	} catch {
		return internalServerError()
	}
}