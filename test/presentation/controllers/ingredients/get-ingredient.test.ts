import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {makeSut, mockGetIngredientById, mockGetIngredientByIdTranslated} from '../../../test-domains/ingredients'
import {badRequestError, internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {buildAxiosResponse, promiseResolver} from '../../../index'
import {ok} from '../../../../src/infra/http'

describe('Get Ingredient By IdController', () => {
	//<editor-fold desc="Should return BadRequestError if no id was provided">
	test('Should return BadRequestError if no id was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.getIngredientById(undefined, { amount: 1, unit: 'grams' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('id').body))
		expect(response.statusCode).toBe(missingParamError('id').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getIngredientById')
			.mockReturnValueOnce(mock)

		const response = await controller.getIngredientById(123456, { amount: 1, unit: 'grams' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return BadRequestError if no data was found with the id provided">
	test('Should return BadRequestError if no data was found with the id provided', async () => {
		const { ingredientService, controller } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(null))()

		jest
			.spyOn(ingredientService, 'getIngredientById')
			.mockReturnValueOnce(mock)

		const response = await controller.getIngredientById(123345567, { amount: 10, unit: 'grams' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	test('Should return 200 if a valid id was provided', async () => {
		const { ingredientService, translationService, controller } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(mockGetIngredientById))()

		jest
			.spyOn(ingredientService, 'getIngredientById')
			.mockReturnValueOnce(mock)

		const translateMock = promiseResolver({trans: mockGetIngredientByIdTranslated})()

		jest
			.spyOn(translationService, 'translateJSON')
			.mockReturnValueOnce(translateMock)

		const response = await controller.getIngredientById(123456, { amount: 10, unit: 'grams' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(ok(mockGetIngredientByIdTranslated).body))
		expect(response.statusCode).toBe(ok(mockGetIngredientByIdTranslated).statusCode)
	})
})