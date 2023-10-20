import {
	QueryComputeIngredientNutrientAmount
} from '../../../infra/protocols/interfaces/query-compute-ingredient-nutrient-amount.interface'
import {getProperty} from '../../../utils/objects/check-null-properties'

export const validateComputeIngredientNutrientAmount = (params: QueryComputeIngredientNutrientAmount): string[] => {
	const requiredProperties= ['nutrient', 'target']
	const propertiesMissing: string[] = []

	Object
		.keys(params)
		.forEach((key) => {
			if (requiredProperties.includes(key)) {
				const propertyValue = getProperty(
					params,
          key as keyof QueryComputeIngredientNutrientAmount
				)

				if (!propertyValue) {
					propertiesMissing.push(key)
				}
			}
		})

	return propertiesMissing
}