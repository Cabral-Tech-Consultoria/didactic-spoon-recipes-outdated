import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {buildAxiosResponse, makeSut} from '../../../test-domains/recipes'
import {ok} from '../../../../src/infra/http'
import {randomRecipesMock} from '../../mock/random-recipes.mock'
import {internalServerError} from '../../../../src/infra/error/http/error'
import {promiseResolver} from '../../../index'

describe('Get Random Controller', () => {
	//<editor-fold desc="Should return 200 and 3 results">
	test('Should return 200 and 3 results', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(randomRecipesMock()))()

		jest
			.spyOn(service, 'getRandom')
			.mockReturnValueOnce(mock)

		const response = await controller.getRandom({ number: 3 })

		expect(JSON.parse(response.body).recipes.length).toEqual(JSON.parse(ok(randomRecipesMock()).body).recipes.length)
		expect(response.statusCode).toBe(ok({}).statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getRandom')
			.mockReturnValueOnce(mock)

		const response = await controller.getRandom({ number: 1 })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})