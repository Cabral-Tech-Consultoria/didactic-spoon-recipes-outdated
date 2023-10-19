import {describe, expect, jest, test} from '@jest/globals'
import { getSimilarById } from '../../../../src/presentation/controllers/recipes/get-similar-by-id'
import {internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {promiseResolver} from '../../../index'
import {noContent} from '../../../../src/infra/http'

const makeSut = () => {
	return {
		getSimilarById
	}
}

describe('Get Similar By Id Comtroller', () => {
	//<editor-fold desc="Should return MissingParamError if no id was provided">
	test('Should return MissingParamError if no id was provided', async () => {
		const sut = makeSut()

		const response = await sut.getSimilarById(undefined)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('id').body))
		expect(response.statusCode).toBe(406)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 204 if no similar recipe was found">
	test('Should return 204 if no similar recipe was found', async () => {
		const sut = makeSut()

		const mock = promiseResolver(noContent())()

		jest
			.spyOn(sut, 'getSimilarById')
			.mockReturnValueOnce(mock)

		const response = await sut.getSimilarById(754393)

		expect(JSON.parse(response.body)).toBeNull()
		expect(response.statusCode).toBe(noContent().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const sut = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(sut, 'getSimilarById')
			.mockReturnValueOnce(mock)

		const response = await sut.getSimilarById(754393, { number: 5 })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})