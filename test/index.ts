import {jest} from '@jest/globals'

export const promiseResolver = <T>(data: T) => {
	return jest.fn(() => Promise.resolve(data))
}