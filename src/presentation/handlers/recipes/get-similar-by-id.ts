import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {ConvertTo} from '../../../utils/convertion/converter'
import {getSimilarById} from '../../controllers/recipes/get-similar-by-id'
import {QuerySimilar} from '../../../infra/protocols/interfaces/query-similar.interface'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return getSimilarById(
		Number(event.pathParameters?.id),
		ConvertTo<QuerySimilar>(event.queryStringParameters)
	)
}