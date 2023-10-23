import {TranslationDTO} from '../../../infra/protocols/dtos/translation.dto'
import {ITranslation} from '../../protocols/interfaces/translation.interface'

export interface ITranslationService {
  translateJSON(translation: TranslationDTO): Promise<ITranslation>
}