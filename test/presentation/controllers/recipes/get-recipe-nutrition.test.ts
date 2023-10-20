import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {badRequestError, internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {makeSut} from '../../../test-domains/recipes'
import {buildAxiosResponse, promiseResolver} from '../../../index'

describe('Get Nutrition By Recipe Controller', () => {
	//<editor-fold desc="Should return MissingParamError if no id was provided">
	test('Should return MissingParamError if no id was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.getRecipeNutrition()

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('id').body))
		expect(response.statusCode).toBe(missingParamError('id').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return BadRequestError if no data was found">
	test('Should return BadRequestError if no data was found', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(null))()

		jest
			.spyOn(service, 'getRecipeNutrition')
			.mockReturnValueOnce(mock)

		const response = await controller.getRecipeNutrition(782461)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getRecipeNutrition')
			.mockReturnValueOnce(mock)

		const response = await controller.getRecipeNutrition(782461)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>
})