import {AxiosInstance} from 'axios'
import {TranslationHttpFactory} from '../../infra/http/http.client'
import {ITranslationService} from './protocols/i-translation.service'
import {TranslationDTO, TranslationTextDTO} from '../../infra/protocols/dtos/translation.dto'
import {injectable} from 'inversify'
import {Translation} from '../protocols/interfaces/translation.interface'

@injectable()
export class TranslationService implements ITranslationService {
	private http: AxiosInstance

	constructor() {
		this.http = TranslationHttpFactory('translator')
	}

	async translateJSON<T>(translation: TranslationDTO<T>): Promise<Translation<T>> {
		const { data } = await this
			.http
			.post<Translation<T>>('/json', translation)

		return data
	}

	async translateText(translation: TranslationTextDTO<string>): Promise<Translation<string>> {
		const { data } = await this
			.http
			.post<Translation<string>>('/text', translation)

		return data
	}
	
	async translateListTexts(translations: TranslationTextDTO<string[]>) {
		const { data } = await this
			.http
			.post<Translation<string>>('/text', {
				...translations,
				text: translations.text.join('|')
			})

		return {
			trans: data.trans.split('|')
		}
	}
}