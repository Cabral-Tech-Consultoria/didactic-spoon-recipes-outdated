import {LanguagesEnum} from '../enums/languages.enum'

export class TranslationDTO {
	constructor(public to: string[], public from: LanguagesEnum, public protected_keys: string[], public json: string) {}
}
