import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {ConvertTo} from '../../../utils/convertion/converter'
import {getAutocompleteSearch} from '../../controllers/recipes/get-autocomplete-search'
import {QueryAutocompleteSearch} from '../../../infra/protocols/interfaces/query-autocomplete-search.interface'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return getAutocompleteSearch(ConvertTo<QueryAutocompleteSearch>(event.queryStringParameters))
}