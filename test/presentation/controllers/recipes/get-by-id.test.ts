import {describe, expect, jest, test} from '@jest/globals'
import { getById } from '../../../../src/presentation/controllers/recipes/get-by-id'
import {badRequestError, internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {promiseResolver} from '../../../index'
import {ok} from '../../../../src/infra/http'

const makeSut = () => {
	return {
		getById
	}
}

describe('Get By Id Controller', () => {
	//<editor-fold desc="Should return MissingParamError if no id was provided">
	test('Should return MissingParamError if no id was provided', async () => {
		const sut = makeSut()

		const response = await sut.getById(0, false)

		const missingParamDefault = missingParamError('id')

		expect(response.statusCode).toBe(missingParamDefault.statusCode)
		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamDefault.body))
	})
	//</editor-fold>

	//<editor-fold desc="Should return 200 if a valid id was provided">
	test('Should return 200 if a valid id was provided', async () => {
		const sut = makeSut()

		const mock = promiseResolver(ok({}))()

		jest
			.spyOn(sut, 'getById')
			.mockReturnValueOnce(mock)

		const response = await sut.getById(716429, false)

		expect(response.statusCode).toBe(200)
	})
	//</editor-fold>

	test('Should return 400 if no result is return', async () => {
		const sut = makeSut()

		const mock = promiseResolver(badRequestError())()

		jest
			.spyOn(sut, 'getById')
			.mockReturnValueOnce(mock)

		const response = await sut.getById(123, false)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toEqual(badRequestError().statusCode)
	})

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const sut = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(sut, 'getById')
			.mockReturnValueOnce(mock)

		const response = await sut.getById(716429, false)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})