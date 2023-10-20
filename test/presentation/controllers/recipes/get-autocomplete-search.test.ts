import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {noContent} from '../../../../src/infra/http'
import {buildAxiosResponse, makeSut} from '../../../test-domains/recipes'
import {missingParamError} from '../../../../src/infra/error/http/error'
import {promiseResolver} from '../../../index'

describe('Get Auto Complete Search Controller', () => {
	//<editor-fold desc="Should return 204 if no query was provided">
	test('Should return MissingParamError if no query was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.getAutocompleteSearch({ number: 10 })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('query').body))
		expect(response.statusCode).toBe(missingParamError('query').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 204 if no data was found">
	test('Should return 204 if no data was found', async () => {
		const { controller, service } = makeSut()

		const mock = promiseResolver(buildAxiosResponse([]))()

		jest
			.spyOn(service, 'getAutocompleteSearch')
			.mockReturnValueOnce(mock)

		const response = await controller.getAutocompleteSearch({ query: 'rice', number: 10 })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(noContent().body))
		expect(response.statusCode).toBe(noContent().statusCode)
	})
	//</editor-fold>
})