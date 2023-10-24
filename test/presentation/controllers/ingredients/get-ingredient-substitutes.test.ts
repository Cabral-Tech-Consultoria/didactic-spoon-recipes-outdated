import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {makeSut} from '../../../test-domains/ingredients'
import {badRequestError, internalServerError} from '../../../../src/infra/error/http/error'
import {buildAxiosResponse, promiseResolver} from '../../../index'

describe('Get Ingredient Substitutes Controller', () => {
	//<editor-fold desc="Should return BadRequestError if no ingredientName was provided">
	test('Should return BadRequestError if no ingredientName was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.getIngredientSubstitutes()

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return BadRequestError if no data was returned">
	test('Should return BadRequestError if no data was returned', async () => {
		const { controller, ingredientService } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(null))()

		jest
			.spyOn(ingredientService, 'getIngredientSubstitutes')
			.mockReturnValueOnce(mock)

		const response = await controller.getIngredientSubstitutes({ ingredientName: 'chuck' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getIngredientSubstitutes')
			.mockReturnValueOnce(mock)

		const response = await controller.getIngredientSubstitutes({ ingredientName: 'chuck' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>
})