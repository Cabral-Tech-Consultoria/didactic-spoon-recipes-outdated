import {describe, expect, jest, test} from '@jest/globals'
import {makeSut} from '../../../test-domains/ingredients'
import {buildAxiosResponse, promiseResolver} from '../../../index'
import {noContent} from '../../../../src/infra/http'

describe('Search Ingredients', () => {
	test('Should return 204 if no data was found', async () => {
		const { service, controller } = makeSut()

		const mock = promiseResolver(buildAxiosResponse([]))()

		jest
			.spyOn(service, 'search')
			.mockReturnValueOnce(mock)

		const response = await controller.search({ query: 'apple' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(noContent().body))
		expect(response.statusCode).toBe(noContent().statusCode)
	})
})