import {describe, test, jest, expect} from '@jest/globals'
import {getByNutrients} from '../../../../src/presentation/controllers/recipes/get-by-nutrients'
import {promiseResolver} from '../../../index'
import {internalServerError} from '../../../../src/infra/error/http/error'
import {noContent} from '../../../../src/infra/http'

const makeSut = () => {
	return {
		getByNutrients
	}
}

describe('Get By Nutrients Controller', () => {
	//<editor-fold desc="Should return 204 if no data was found">
	test('Should return 204 if no data was found', async () => {
		const sut = makeSut()

		const mock = promiseResolver(noContent())()

		jest
			.spyOn(sut, 'getByNutrients')
			.mockReturnValueOnce(mock)

		const response = await sut.getByNutrients({ minProtein: 100 })

		expect(JSON.parse(response.body)).toBeNull()
		expect(response.statusCode).toBe(204)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const sut = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(sut, 'getByNutrients')
			.mockReturnValueOnce(mock)

		const response = await sut.getByNutrients({})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})