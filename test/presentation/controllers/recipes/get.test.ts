import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {internalServerError} from '../../../../src/infra/error/http/error'
import {
	buildAxiosResponse,
	makeSut,
	mockedGetData,
	promiseResolver
} from '../../../index'
import {AxiosResponse} from 'axios'

describe('Get Controller', () => {
	//<editor-fold desc="Should return 204 if no results were found">
	test('Should return 204 if no results were found', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver<AxiosResponse>(buildAxiosResponse({results: []}))()

		jest
			.spyOn(service, 'get')
			.mockReturnValueOnce(mock)
		const response = await controller.get({})

		expect(JSON.parse(response.body)).toEqual(null)
		expect(response.statusCode).toBe(204)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 200 and 5 records as provided">
	test('Should return 200 and 5 records as provided', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver<AxiosResponse>(buildAxiosResponse(mockedGetData))()

		jest
			.spyOn(service, 'get')
			.mockReturnValueOnce(mock)

		const response = await controller.get({ number: '5' })

		expect(JSON.parse(response.body).length).toBe(5)
		expect(response.statusCode).toBe(200)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller} = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'get')
			.mockReturnValueOnce(mock)

		const response = await controller.get({})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>
})