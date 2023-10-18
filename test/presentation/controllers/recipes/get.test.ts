import {describe, expect, jest, test} from '@jest/globals'
import { get } from '../../../../src/presentation/controllers/recipes/get'
import {internalServerError} from '../../../../src/infra/error/http/error'
import {noContent, ok} from '../../../../src/infra/http'
import {IRecipe} from '../../../../src/domain/protocols/interfaces/recipe.interface'
import {promiseResolver} from '../../../index'

const mockedData: IRecipe[] = [
	{'id': 715563,'title': 'Pierogi Casserole','image': 'https://spoonacular.com/recipeImages/715563-312x231.jpg','imageType': 'jpg'},
	{'id': 1095836,'title': 'Romanian Pea and Chicken Stew','image': 'https://spoonacular.com/recipeImages/1095836-312x231.jpg','imageType': 'jpg'},
	{'id': 644476,'title': 'German Goulash','image': 'https://spoonacular.com/recipeImages/644476-312x231.jpg','imageType': 'jpg'},
	{'id': 647645,'title': 'Hungarian Beef Goulash','image': 'https://spoonacular.com/recipeImages/647645-312x231.jpg','imageType': 'jpg'},
	{'id': 633063,'title': 'Austrian Goulash','image': 'https://spoonacular.com/recipeImages/633063-312x231.jpg','imageType': 'jpg'}
]

const makeSut = () => {
	return {
		get
	}
}

describe('Get Controller', () => {
	//<editor-fold desc="Should return 204 if no results were found">
	test('Should return 204 if no results were found', async () => {
		const sut = makeSut()

		const mock = promiseResolver(noContent())()

		jest
			.spyOn(sut, 'get')
			.mockReturnValueOnce(mock)
		const response = await sut.get({})

		expect(JSON.parse(response.body)).toEqual(null)
		expect(response.statusCode).toBe(204)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 200 and 5 records as provided">
	test('Should return 200 and 5 records as provided', async () => {
		const sut = makeSut()

		const mock = promiseResolver(ok<IRecipe[]>(mockedData))()

		jest
			.spyOn(sut, 'get')
			.mockReturnValueOnce(mock)

		const response = await sut.get({ number: '5' })

		expect(JSON.parse(response.body).length).toBe(5)
		expect(response.statusCode).toBe(200)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const sut = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(sut, 'get')
			.mockReturnValueOnce(mock)

		const response = await sut.get({})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>
})