import {describe, expect, jest, test} from '@jest/globals'
import {badRequestError, internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import { getRecipeNutrition } from '../../../../src/presentation/controllers/recipes/get-recipe-nutrition'
import {promiseResolver} from '../../../index'

const makeSut = () => {
	return {
		getRecipeNutrition
	}
}

describe('Get Nutrition By Recipe Controller', () => {
	//<editor-fold desc="Should return MissingParamError if no id was provided">
	test('Should return MissingParamError if no id was provided', async () => {
		const sut = makeSut()

		const response = await sut.getRecipeNutrition()

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('id').body))
		expect(response.statusCode).toBe(missingParamError('id').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return BadRequestError if no data was found">
	test('Should return BadRequestError if no data was found', async () => {
		const sut = makeSut()

		const mock = promiseResolver(badRequestError())()

		jest
			.spyOn(sut, 'getRecipeNutrition')
			.mockReturnValueOnce(mock)

		const response = await sut.getRecipeNutrition(782461)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const sut = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(sut, 'getRecipeNutrition')
			.mockReturnValueOnce(mock)

		const response = await sut.getRecipeNutrition(782461)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>
})