import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {
	makeSut,
	mockAutocompleteIngredientsSearch
} from '../../../test-domains/ingredients'
import {badRequestError, internalServerError} from '../../../../src/infra/error/http/error'
import {buildAxiosResponse, promiseResolver} from '../../../index'
import {noContent, ok} from '../../../../src/infra/http'
import {mockAutocompleteIngredientsSearchTranslated} from '../../../test-domains/translation'

describe('Autocomplete Ingredients Search Controller', () => {
	//<editor-fold desc="Should return BadRequestError if no query was provided">
	test('Should return BadRequestError if no query was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.autocompleteIngredientsSearch({ query: '' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return BadRequestError if no params were provided">
	test('Should return BadRequestError if no params were provided', async () => {
		const { controller } = makeSut()

		const response = await controller.autocompleteIngredientsSearch()

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'autocompleteIngredientsSearch')
			.mockReturnValueOnce(mock)

		const response = await controller.autocompleteIngredientsSearch({ query: 'choco' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 204 if no data was returned">
	test('Should return 204 if no data was returned', async () => {
		const { controller, ingredientService } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(null))()

		jest
			.spyOn(ingredientService, 'autocompleteIngredientsSearch')
			.mockReturnValueOnce(mock)

		const response = await controller.autocompleteIngredientsSearch({ query: 'choco' })

		expect(JSON.parse(response.body)).toEqual(JSON.parse(noContent().body))
		expect(response.statusCode).toBe(noContent().statusCode)
	})
	//</editor-fold>

	test('Should return 200 if all required params were set', async () => {
		const { controller, ingredientService, translationService } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(mockAutocompleteIngredientsSearch))()

		jest
			.spyOn(ingredientService, 'autocompleteIngredientsSearch')
			.mockReturnValueOnce(mock)

		const mockTranslated = promiseResolver({ trans: mockAutocompleteIngredientsSearchTranslated })()

		jest
			.spyOn(translationService, 'translateJSON')
			.mockReturnValueOnce(mockTranslated)

		const response = await controller.autocompleteIngredientsSearch({
			query: 'choco',
			number: 5,
			intolerances: 'diary',
			language: 'en',
			metaInformation: false
		})

		const okResponse = ok(mockAutocompleteIngredientsSearchTranslated)

		expect(JSON.parse(response.body)).toEqual(JSON.parse(okResponse.body))
		expect(response.statusCode).toBe(okResponse.statusCode)
	})
})