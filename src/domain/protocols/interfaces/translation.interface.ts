export interface ITranslation {
  translations: TranslatedTo[],
  from: string,
  protectedKeys: string[],
  translatedCharacters: number
}

export interface TranslationRaw {
  translations: TranslatedTo[],
  from: string,
  protected_keys: string[],
  translated_characters: number
}

interface TranslatedTo {
  to: string
  translated: string[]
}

export const Translation = {
	format: (raw: TranslationRaw): ITranslation => {
		return {
			translations: raw.translations,
			from: raw.from,
			protectedKeys: raw.protected_keys,
			translatedCharacters: raw.translated_characters,
		}
	}
}