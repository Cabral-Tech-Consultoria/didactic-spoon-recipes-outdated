import 'reflect-metadata'
import {describe, expect, jest, test} from '@jest/globals'
import {makeSut} from '../../../test-domains/auth'
import {badRequestError, unprocessableEntityError} from '../../../../src/infra/error/http/error'
import {promiseResolver} from '../../../index'
import {noContent} from '../../../../src/infra/http'
import {SignUpCommandOutput} from '@aws-sdk/client-cognito-identity-provider'

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

	test('Should return UnprocessableEntityError if no password is provided', async () => {
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

	test('Should return NoContent status 204 if the user\'s registration succeeds', async () => {
		const {controller, service} = makeSut()

		const voidReturn = async () => {
			return {} as SignUpCommandOutput
		}

		const mock = promiseResolver(voidReturn())()

		jest
			.spyOn(service, 'register')
			.mockReturnValueOnce(mock)

		const response = await controller.register({
			name: 'name',
			username: 'username',
			email: 'email@email.com',
			phoneNumber: '+55909128734',
			password: 'password',
			passwordConfirmation: 'password',
		})

		expect(JSON.parse(response.body)).toEqual(JSON.parse(noContent().body))
		expect(response.statusCode).toEqual(noContent().statusCode)
	})
})