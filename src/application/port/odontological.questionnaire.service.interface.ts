import { IService } from './service.interface'
import { OdontologicalQuestionnaire } from '../domain/model/odontological.questionnaire'

export interface IOdontologicalQuestionnaireService extends IService<OdontologicalQuestionnaire> {
    removeQuestionnaire(patientId: string, questionnaireId: string): Promise<boolean>

    updateQuestionnaireResource(patientId: string, questionnaireId: string, name: string, resource: any):
        Promise<any>
}
