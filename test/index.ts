import {jest} from '@jest/globals'
import {AxiosResponse, InternalAxiosRequestConfig} from 'axios'

export const promiseResolver = <T>(data: T) => {
	return jest.fn(() => Promise.resolve(data))
}

export const buildAxiosResponse = <T>(data: T): AxiosResponse => {
	return {
		data,
		status: 200,
		statusText: 'text',
		headers: {},
		config: {} as InternalAxiosRequestConfig<unknown>,
	}
}