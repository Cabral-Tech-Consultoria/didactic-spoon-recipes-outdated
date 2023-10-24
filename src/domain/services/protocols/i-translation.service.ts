import {TranslationDTO} from '../../../infra/protocols/dtos/translation.dto'
import {Translation} from '../../protocols/interfaces/translation.interface'

export interface ITranslationService {
  translateJSON<T>(translation: TranslationDTO<T>): Promise<Translation<T>>
}