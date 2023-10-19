import {describe, expect, jest, test} from '@jest/globals'
import {promiseResolver} from '../../../index'
import {internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {getByIngredients} from '../../../../src/presentation/controllers/recipes/get-by-ingredients'
import {noContent} from '../../../../src/infra/http'

const makeSut = () => {
	return {
		getByIngredients
	}
}

describe('Get By Ingredients Controller', () => {
	//<editor-fold desc="Should return MissingParamError if no ingredient was provided">
	test('Should return MissingParamError if no ingredient was provided', async () => {
		const sut = makeSut()

		const response = await sut.getByIngredients({ ingredients: '' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('ingredients').body))
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const sut = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(sut, 'getByIngredients')
			.mockReturnValueOnce(mock)

		const response = await sut.getByIngredients({ ingredients: 'apple' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 204 if no data was found">
	test('Should return 204 if no data was found', async () => {
		const sut = makeSut()

		const mock = promiseResolver(noContent())()

		jest
			.spyOn(sut, 'getByIngredients')
			.mockReturnValueOnce(mock)

		const response = await sut.getByIngredients({ ingredients: 'ginger' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(noContent().body))
		expect(response.statusCode).toEqual(noContent().statusCode)
	})
	//</editor-fold>
})