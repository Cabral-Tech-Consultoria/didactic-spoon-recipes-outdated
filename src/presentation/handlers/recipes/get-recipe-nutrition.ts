import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda'
import {getRecipeNutrition} from '../../controllers/recipes/get-recipe-nutrition'

export const handle: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return getRecipeNutrition(Number(event?.pathParameters?.id))
}