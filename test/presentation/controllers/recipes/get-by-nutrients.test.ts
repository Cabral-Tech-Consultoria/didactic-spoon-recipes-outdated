import 'reflect-metadata'
import {describe, test, jest, expect} from '@jest/globals'
import {buildAxiosResponse, makeSut, promiseResolver} from '../../../index'
import {internalServerError} from '../../../../src/infra/error/http/error'

describe('Get By Nutrients Controller', () => {
	//<editor-fold desc="Should return 204 if no data was found">
	test('Should return 204 if no data was found', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver(buildAxiosResponse([]))()

		jest
			.spyOn(service, 'getByNutrients')
			.mockReturnValueOnce(mock)

		const response = await controller.getByNutrients({ minProtein: 25 })

		expect(JSON.parse(response.body)).toBeNull()
		expect(response.statusCode).toBe(204)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getByNutrients')
			.mockReturnValueOnce(mock)

		const response = await controller.getByNutrients({})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})