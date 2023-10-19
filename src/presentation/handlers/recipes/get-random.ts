import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {ConvertTo} from '../../../utils/convertion/converter'
import {getRandom} from '../../controllers/recipes/get-random'
import {QueryRandom} from '../../../infra/protocols/interfaces/query-random.intreface'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return getRandom(ConvertTo<QueryRandom>(event.queryStringParameters))
}