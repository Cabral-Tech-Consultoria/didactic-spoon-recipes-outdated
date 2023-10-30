import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {makeSut} from '../../../test-domains/recipes'
import {ok} from '../../../../src/infra/http'
import {randomRecipesMock} from '../../mock/random-recipes.mock'
import {internalServerError} from '../../../../src/infra/error/http/error'
import {buildAxiosResponse, promiseResolver} from '../../../index'
import {mockGetRandomRecipes} from '../../../test-domains/translation'

describe('Get Random Controller', () => {
	//<editor-fold desc="Should return 200 and 3 results">
	test('Should return 200 and 3 results', async () => {
		const {controller, recipeService, translationService} = makeSut()

		const mock = promiseResolver(buildAxiosResponse(randomRecipesMock()))()

		jest
			.spyOn(recipeService, 'getRandom')
			.mockReturnValueOnce(mock)

		const mockTranslated = promiseResolver({trans: mockGetRandomRecipes})()

		jest
			.spyOn(translationService, 'translateJSON')
			.mockReturnValueOnce(mockTranslated)

		const response = await controller.getRandom({number: 3})

		expect(JSON.parse(response.body).length).toEqual(JSON.parse(ok(mockGetRandomRecipes).body).length)
		expect(response.statusCode).toBe(ok(mockGetRandomRecipes).statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const {controller} = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'getRandom')
			.mockReturnValueOnce(mock)

		const response = await controller.getRandom({number: 1})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toEqual(internalServerError().statusCode)
	})
	//</editor-fold>
})