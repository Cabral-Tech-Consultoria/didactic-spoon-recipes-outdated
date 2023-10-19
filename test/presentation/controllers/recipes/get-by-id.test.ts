import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {badRequestError, internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {buildAxiosResponse, makeSut, mockedGetById, promiseResolver} from '../../../index'

describe('Get By Id Controller', () => {
	//<editor-fold desc="Should return MissingParamError if no id was provided">
	test('Should return MissingParamError if no id was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.getById(0, false)

		const missingParamDefault = missingParamError('id')

		expect(response.statusCode).toBe(missingParamDefault.statusCode)
		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamDefault.body))
	})
	//</editor-fold>

	//<editor-fold desc="Should return 200 if a valid id was provided">
	test('Should return 200 if a valid id was provided', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(mockedGetById))()

		jest
			.spyOn(service, 'getById')
			.mockReturnValueOnce(mock)

		const response = await controller.getById(716429, false)

		expect(response.statusCode).toBe(200)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 400 if no result is return">
	test('Should return 400 if no result is return', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(null))()

		jest
			.spyOn(service, 'getById')
			.mockReturnValueOnce(mock)

		const response = await controller.getById(123, false)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toEqual(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getById')
			.mockReturnValueOnce(mock)

		const response = await controller.getById(716429, false)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})