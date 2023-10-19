import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {getById} from '../../controllers/recipes/get-by-id'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return getById(
		Number(event.pathParameters?.id),
		event.queryStringParameters?.includeNutrition === 'true'
	)
}