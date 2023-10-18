import {APIGatewayProxyResult} from 'aws-lambda'
import {jest} from '@jest/globals'

export const promiseResolver = (data: APIGatewayProxyResult) => {
	return jest.fn(() => Promise.resolve(data))
}