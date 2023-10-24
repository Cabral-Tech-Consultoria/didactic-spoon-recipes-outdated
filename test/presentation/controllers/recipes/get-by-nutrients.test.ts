import 'reflect-metadata'
import {describe, test, jest, expect} from '@jest/globals'
import {makeSut} from '../../../test-domains/recipes'
import {internalServerError} from '../../../../src/infra/error/http/error'
import {buildAxiosResponse, promiseResolver} from '../../../index'

describe('Get By Nutrients Controller', () => {
	//<editor-fold desc="Should return 204 if no data was found">
	test('Should return 204 if no data was found', async () => {
		const { controller, recipeService } = makeSut()

		const mock = promiseResolver(buildAxiosResponse([]))()

		jest
			.spyOn(recipeService, 'getByNutrients')
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