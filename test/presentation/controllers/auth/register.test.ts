import {describe, expect, test} from '@jest/globals'
import {makeSut} from '../../../test-domains/auth'
import {badRequestError, unprocessableEntityError} from '../../../../src/infra/error/http/error'

describe('Register User Controller', () => {
	test('Should return UnprocessableEntityError if no name is provided', async () => {
		const {controller} = makeSut()

		const response = await controller.register({
			name: 'name',
			username: '',
			email: 'email@email.com',
			phoneNumber: '+55909128734',
			password: 'password',
			passwordConfirmation: 'password',
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(unprocessableEntityError().body))
		expect(response.statusCode).toEqual(unprocessableEntityError().statusCode)
	})

	test('Should return UnprocessableEntityError if no username is provided', async () => {
		const {controller} = makeSut()

		const response = await controller.register({
			name: 'name',
			username: '',
			email: 'email@email.com',
			phoneNumber: '+55909128734',
			password: 'password',
			passwordConfirmation: 'password',
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(unprocessableEntityError().body))
		expect(response.statusCode).toEqual(unprocessableEntityError().statusCode)
	})

	test('Should return UnprocessableEntityError if no email is provided', async () => {
		const {controller} = makeSut()

		const response = await controller.register({
			name: 'name',
			username: 'username',
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			email: '',
			phoneNumber: '+55909128734',
			password: 'password',
			passwordConfirmation: 'password',
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(unprocessableEntityError().body))
		expect(response.statusCode).toEqual(unprocessableEntityError().statusCode)
	})

	test('Should return UnprocessableEntityError if no phoneNumber is provided', async () => {
		const {controller} = makeSut()

		const response = await controller.register({
			name: 'name',
			username: 'username',
			email: 'email@email.com',
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			phoneNumber: '',
			password: 'password',
			passwordConfirmation: 'password',
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(unprocessableEntityError().body))
		expect(response.statusCode).toEqual(unprocessableEntityError().statusCode)
	})

	test('Should return UnprocessableEntityError if no phoneNumber is provided', async () => {
		const {controller} = makeSut()

		const response = await controller.register({
			name: 'name',
			username: 'username',
			email: 'email@email.com',
			phoneNumber: '+55909128734',
			password: '',
			passwordConfirmation: 'password',
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(unprocessableEntityError().body))
		expect(response.statusCode).toEqual(unprocessableEntityError().statusCode)
	})

	test('Should return BadRequestError if password and passwordConfirmation are different', async () => {
		const {controller} = makeSut()

		const response = await controller.register({
			name: 'name',
			username: 'username',
			email: 'email@email.com',
			phoneNumber: '+55909128734',
			password: 'password',
			passwordConfirmation: 'password_different',
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(badRequestError().body))
		expect(response.statusCode).toEqual(badRequestError().statusCode)
	})
})