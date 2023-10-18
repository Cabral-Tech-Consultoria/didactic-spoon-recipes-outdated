import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {ConvertTo} from '../../../../utils/convertion/converter'
import {BaseQueryStringSearch} from '../../../../infra/protocols/interfaces/querystring.interface'
import {get} from '../../../controllers/recipes/get'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return get(ConvertTo<BaseQueryStringSearch>(event.queryStringParameters))
}