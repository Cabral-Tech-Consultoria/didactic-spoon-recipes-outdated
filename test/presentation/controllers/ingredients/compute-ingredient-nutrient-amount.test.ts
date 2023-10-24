import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {makeSut} from '../../../test-domains/ingredients'
import {
	badRequestError,
	internalServerError,
	invalidParamError,
	missingParamError
} from '../../../../src/infra/error/http/error'
import {buildAxiosResponse, promiseResolver} from '../../../index'

describe('Compute Ingredient Nutrient Amount Controller', () => {
	//<editor-fold desc="Should return MissingParamError if no id was provided">
	test('Should return MissingParamError if no id was provided', async () => {
		const { controller } = makeSut()

		const response = await controller
			.computeIngredientNutrientAmount(
				undefined,
				{
					nutrient: 'protein',
					target: 25,
					unit: 'g'
				})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return MissingParamError if no nutrient was provided">
	test('Should return MissingParamError if no nutrient was provided', async () => {
		const { controller } = makeSut()

		const response = await controller
			.computeIngredientNutrientAmount(
				123456,
				{
					nutrient: '',
					target: 25,
					unit: 'g'
				})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('nutrient').body))
		expect(response.statusCode).toBe(missingParamError('nutrient').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return MissingParamError if no target was provided">
	test('Should return MissingParamError if no target was provided', async () => {
		const { controller } = makeSut()

		const response = await controller
			.computeIngredientNutrientAmount(
				123456,
				{
					nutrient: 'protein',
					target: 0,
					unit: 'g'
				})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('target').body))
		expect(response.statusCode).toBe(missingParamError('target').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'computeIngredientNutrientAmount')
			.mockReturnValueOnce(mock)

		const response = await controller
			.computeIngredientNutrientAmount(
				123456,
				{
					nutrient: 'protein',
					target: 25,
					unit: 'g'
				})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-

	test('Should return InvalidParamError if no data is returned', async () => {
		const { ingredientService, controller } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(null))()

		jest
			.spyOn(ingredientService, 'computeIngredientNutrientAmount')
			.mockReturnValueOnce(mock)

		const response = await controller
			.computeIngredientNutrientAmount(
				123456,
				{
					nutrient: 'protein',
					target: 25,
					unit: 'g'
				})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(invalidParamError().body))
		expect(response.statusCode).toBe(invalidParamError().statusCode)
	})
})