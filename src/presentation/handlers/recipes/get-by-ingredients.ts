import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {ConvertTo} from '../../../utils/convertion/converter'
import {getByIngredients} from '../../controllers/recipes/get-by-ingredients'
import {QueryIngredients} from '../../../infra/protocols/interfaces/query-ingredients.interface'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return getByIngredients(ConvertTo<QueryIngredients>(event.queryStringParameters))
}