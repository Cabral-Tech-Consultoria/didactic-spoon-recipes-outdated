import {TranslationTextDTO} from '../protocols/dtos/translation.dto'

export class TranslationFactory {
	static make(text: string): TranslationTextDTO<string> {
		return {
			from: 'pt',
			to: 'en',
			text,
		}
	}
}