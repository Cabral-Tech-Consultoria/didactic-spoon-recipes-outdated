import {AxiosInstance} from 'axios'
import {TranslationHttpFactory} from '../../infra/http/http.client'
import {ITranslationService} from './protocols/i-translation.service'
import {TranslationDTO} from '../../infra/protocols/dtos/translation.dto'
import {ITranslation, Translation} from '../protocols/interfaces/translation.interface'

export class TranslationService implements ITranslationService {
	private http: AxiosInstance

	constructor() {
		this.http = TranslationHttpFactory('translate')
	}

	async translateJSON(translation: TranslationDTO): Promise<ITranslation> {
		const { data } = await this.http.post('json', translation)

		return Translation.format(data)
	}
}