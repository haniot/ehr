import { IRepository } from './repository.interface'
import { NutritionalQuestionnaire } from '../domain/model/nutritional.questionnaire'

export interface INutritionalQuestionnaireRepository extends IRepository<NutritionalQuestionnaire> {
    removeNutritionalQuestionnaireFromUser(id: string): Promise<boolean>
}
