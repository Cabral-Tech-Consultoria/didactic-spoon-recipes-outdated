import {getProperty} from '../../../utils/objects/check-null-properties'

export const validateRequiredParams = <T extends object>(params: T, requiredParams: string[]): string[] => {
	const propertiesMissing: string[] = []

	Object
		.keys(params)
		.forEach((key) => {
			if (requiredParams.includes(key)) {
				const propertyValue = getProperty(
					params,
          key as keyof T
				)

				if (!propertyValue) {
					propertiesMissing.push(key)
				}
			}
		})

	return propertiesMissing
}