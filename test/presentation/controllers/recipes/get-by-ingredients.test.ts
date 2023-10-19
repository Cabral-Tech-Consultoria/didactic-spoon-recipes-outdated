import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {buildAxiosResponse, makeSut, promiseResolver} from '../../../index'
import {internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {noContent} from '../../../../src/infra/http'

describe('Get By Ingredients Controller', () => {
	//<editor-fold desc="Should return MissingParamError if no ingredient was provided">
	test('Should return MissingParamError if no ingredient was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.getByIngredients({ ingredients: '' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('ingredients').body))
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getByIngredients')
			.mockReturnValueOnce(mock)

		const response = await controller.getByIngredients({ ingredients: 'apple' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 204 if no data was found">
	test('Should return 204 if no data was found', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver(buildAxiosResponse([]))()

		jest
			.spyOn(service, 'getByIngredients')
			.mockReturnValueOnce(mock)

		const response = await controller.getByIngredients({ ingredients: 'ginger' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(noContent().body))
		expect(response.statusCode).toEqual(noContent().statusCode)
	})
	//</editor-fold>
})