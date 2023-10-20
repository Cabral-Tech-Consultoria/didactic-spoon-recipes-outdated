import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {makeSut} from '../../../test-domains/ingredients'
import {buildAxiosResponse, promiseResolver} from '../../../index'
import {noContent} from '../../../../src/infra/http'
import {internalServerError, missingParamError} from '../../../../src/infra/error/http/error'

describe('Search Ingredients', () => {
	//<editor-fold desc="Should return 204 if no data was found">
	test('Should return 204 if no data was found', async () => {
		const { service, controller } = makeSut()

		const mock = promiseResolver(buildAxiosResponse({
			results: [],
			offset: 0,
			number: 0,
			totalResults: 0
		}))()

		jest
			.spyOn(service, 'search')
			.mockReturnValueOnce(mock)

		const response = await controller.search({ query: 'apple' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(noContent().body))
		expect(response.statusCode).toBe(noContent().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'search')
			.mockReturnValueOnce(mock)

		const response = await controller.search({ query: 'peace fruit' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return MissingParamError if query was not provided">
	test('Should return MissingParamError if query was not provided', async () => {
		const { controller } = makeSut()

		const response = await controller.search()

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('query').body))
		expect(response.statusCode).toBe(missingParamError('query').statusCode)
	})
	//</editor-fold>
})