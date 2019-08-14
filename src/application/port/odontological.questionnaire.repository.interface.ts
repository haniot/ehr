import { IRepository } from './repository.interface'
import { OdontologicalQuestionnaire } from '../domain/model/odontological.questionnaire'

export interface IOdontologicalQuestionnaireRepository extends IRepository<OdontologicalQuestionnaire> {
    removeQuestionnaireFromPatient(id: string): Promise<boolean>

    updateQuestionnaireResource(patientId: string, questionnaireId: string, name: string, resource: any): Promise<any>
}
