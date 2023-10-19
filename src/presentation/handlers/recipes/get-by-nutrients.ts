import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {getByNutrients} from '../../controllers/recipes/get-by-nutrients'
import {ConvertTo} from '../../../utils/convertion/converter'
import {INutrients} from '../../../domain/protocols/interfaces/nutrients.interface'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return getByNutrients(ConvertTo<INutrients>(event.queryStringParameters))
}