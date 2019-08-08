import { IRepository } from './repository.interface'
import { OdontologicalQuestionnaire } from '../domain/model/odontological.questionnaire'

export interface IOdontologicalQuestionnaireRepository extends IRepository<OdontologicalQuestionnaire> {
    removeOdontologicalQuestionnaireFromUser(id: string): Promise<boolean>
}
