import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {makeSut} from '../../../test-domains/recipes'
import {noContent} from '../../../../src/infra/http'
import {buildAxiosResponse, promiseResolver} from '../../../index'

describe('Get Similar By Id Comtroller', () => {
	//<editor-fold desc="Should return MissingParamError if no id was provided">
	test('Should return MissingParamError if no id was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.getSimilarById(undefined)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('id').body))
		expect(response.statusCode).toBe(406)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 204 if no similar recipe was found">
	test('Should return 204 if no similar recipe was found', async () => {
		const { controller, recipeService } = makeSut()

		const mock = promiseResolver(buildAxiosResponse([]))()

		jest
			.spyOn(recipeService, 'getSimilarById')
			.mockReturnValueOnce(mock)

		const response = await controller.getSimilarById(754393)

		expect(JSON.parse(response.body)).toBeNull()
		expect(response.statusCode).toBe(noContent().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getSimilarById')
			.mockReturnValueOnce(mock)

		const response = await controller.getSimilarById(754393, { number: 5 })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})