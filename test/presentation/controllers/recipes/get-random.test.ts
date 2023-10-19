import {describe, expect, jest, test} from '@jest/globals'
import {promiseResolver} from '../../../index'
import {ok} from '../../../../src/infra/http'
import { getRandom } from '../../../../src/presentation/controllers/recipes/get-random'
import {randomRecipesMock} from '../../mock/random-recipes.mock'
import {internalServerError} from '../../../../src/infra/error/http/error'

const makeSut = () => {
	return {
		getRandom
	}
}

describe('Get Random Controller', () => {
	//<editor-fold desc="Should return 200 and 3 results">
	test('Should return 200 and 3 results', async () => {
		const sut = makeSut()

		const mock = promiseResolver(ok(randomRecipesMock()))()

		jest
			.spyOn(sut, 'getRandom')
			.mockReturnValueOnce(mock)

		const response = await sut.getRandom({ number: 3 })

		expect(JSON.parse(response.body).recipes.length).toEqual(JSON.parse(ok(randomRecipesMock()).body).recipes.length)
		expect(response.statusCode).toBe(ok({}).statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const sut = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(sut, 'getRandom')
			.mockReturnValueOnce(mock)

		const response = await sut.getRandom({ number: 1 })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})