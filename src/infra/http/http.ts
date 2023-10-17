import {APIGatewayProxyResult} from 'aws-lambda'

export const ok = <T>(data: T): APIGatewayProxyResult => {
	return {
		statusCode: 200,
		body: JSON.stringify(data)
	}
}

export const noContent = (): APIGatewayProxyResult => {
	return {
		statusCode: 204,
		body: JSON.stringify(null)
	}
}