import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {makeSut, mockConvertAmount, mockConvertAmountTranslated} from '../../../test-domains/ingredients'
import {badRequestError, internalServerError, missingParamError} from '../../../../src/infra/error/http/error'
import {buildAxiosResponse, promiseResolver} from '../../../index'
import {ok} from '../../../../src/infra/http'

describe('Convert Amounts Controller', () => {
	//<editor-fold desc="Should return MissingParamError if no ingredientName was provided">
	test('Should return MissingParamError if no ingredientName was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.convertAmounts({
			ingredientName: '',
			sourceAmount: 10,
			sourceUnit: 'pieces',
			targetUnit: 'grams'
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('ingredientName').body))
		expect(response.statusCode).toBe(missingParamError('ingredientName').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return MissingParamError if no sourceAmount was provided">
	test('Should return MissingParamError if no sourceAmount was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.convertAmounts({
			ingredientName: 'chocolate',
			sourceAmount: 0,
			sourceUnit: 'pieces',
			targetUnit: 'grams'
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('sourceAmount').body))
		expect(response.statusCode).toBe(missingParamError('sourceAmount').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return MissingParamError if no sourceUnit was provided">
	test('Should return MissingParamError if no sourceUnit was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.convertAmounts({
			ingredientName: 'chocolate',
			sourceAmount: 10,
			sourceUnit: '',
			targetUnit: 'grams'
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('sourceUnit').body))
		expect(response.statusCode).toBe(missingParamError('sourceUnit').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return MissingParamError if no targetUnit was provided">
	test('Should return MissingParamError if no targetUnit was provided', async () => {
		const { controller } = makeSut()

		const response = await controller.convertAmounts({
			ingredientName: 'chocolate',
			sourceAmount: 10,
			sourceUnit: 'pieces',
			targetUnit: ''
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(missingParamError('targetUnit').body))
		expect(response.statusCode).toBe(missingParamError('targetUnit').statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return BadRequestError if no param is provided">
	test('Should return BadRequestError if no param is provided', async () => {
		const { controller } = makeSut()

		const response = await controller.convertAmounts()

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toEqual(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return InternalServerError if throws">
	test('Should return InternalServerError if throws', async () => {
		const { controller } = makeSut()

		const mock = promiseResolver(internalServerError())()

		jest
			.spyOn(controller, 'convertAmounts')
			.mockReturnValueOnce(mock)

		const response = await controller.convertAmounts({
			ingredientName: 'chocolate',
			sourceAmount: 10,
			sourceUnit: 'pieces',
			targetUnit: 'grams'
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(internalServerError().body))
		expect(response.statusCode).toBe(internalServerError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return BadRequestError if no data was returned">
	test('Should return BadRequestError if no data was returned', async () => {
		const { ingredientService, controller } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(null))()

		jest
			.spyOn(ingredientService, 'convertAmounts')
			.mockReturnValueOnce(mock)

		const response = await controller.convertAmounts({
			ingredientName: 'chocolate',
			sourceAmount: 10,
			sourceUnit: 'pieces',
			targetUnit: 'grams'
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toBe(badRequestError().statusCode)
	})
	//</editor-fold>

	//<editor-fold desc="Should return 200 and an AmountConversion object if all parameters were right">
	test('Should return 200 and an AmountConversion object if all parameters were right', async () => {
		const { controller, ingredientService, translationService } = makeSut()

		const mock = promiseResolver(buildAxiosResponse(mockConvertAmount))()

		jest
			.spyOn(ingredientService, 'convertAmounts')
			.mockReturnValueOnce(mock)

		const mockTranslated = promiseResolver({ trans: mockConvertAmountTranslated })()

		jest
			.spyOn(translationService, 'translateJSON')
			.mockReturnValueOnce(mockTranslated)

		const response = await controller.convertAmounts({
			ingredientName: 'chocolate',
			sourceAmount: 10,
			sourceUnit: 'pieces',
			targetUnit: 'grams'
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(ok(mockConvertAmountTranslated).body))
		expect(response.statusCode).toBe(ok(mockConvertAmountTranslated).statusCode)
	})
	//</editor-fold>
})