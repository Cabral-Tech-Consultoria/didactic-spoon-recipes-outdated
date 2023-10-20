export const getProperty = <T, K extends keyof T>(object: T, keyName: K): T[K] =>  {
	return object[keyName]
}

export const IsObjectEmpty = (item: object) => {
	let isEmpty = true

	Object.keys(item).forEach(key => {
		if (getProperty(item, key as keyof object)) {
			isEmpty = false
		}
	})

	return isEmpty
}