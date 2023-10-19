import {describe, expect, jest, test} from '@jest/globals'
import {noContent} from '../../../../src/infra/http'
import { getAutocompleteSearch } from '../../../../src/presentation/controllers/recipes/get-autocomplete-search'
import {promiseResolver} from '../../../index'
import {missingParamError} from '../../../../src/infra/error/http/error'

const makeSut = () => {
	return {
		getAutocompleteSearch
	}
}

describe('Get Auto Complete Search Controller', () => {
	//<editor-fold desc="Should return 204 if no query was provided">
	test('Should return MissingParamError if no query was provided', async () => {
		const sut = makeSut()

		const response = await sut.getAutocompleteSearch({ number: 10 })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('query').body))
		expect(response.statusCode).toBe(missingParamError('query').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 204 if no data was found">
	test('Should return 204 if no data was found', async () => {
		const sut = makeSut()

		const mock = promiseResolver(noContent())()

		jest
			.spyOn(sut, 'getAutocompleteSearch')
			.mockReturnValueOnce(mock)

		const response = await sut.getAutocompleteSearch({ query: 'rice', number: 10 })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(noContent().body))
		expect(response.statusCode).toBe(noContent().statusCode)
	})
	//</editor-fold>
})