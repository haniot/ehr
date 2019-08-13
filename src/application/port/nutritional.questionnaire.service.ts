import { IService } from './service.interface'
import { NutritionalQuestionnaire } from '../domain/model/nutritional.questionnaire'

export interface INutritionalQuestionnaireService extends IService<NutritionalQuestionnaire> {
    removeQuestionnaire(patientId: string, questionnaireId: string): Promise<boolean>

    updateQuestionnaireResource(patientId: string, questionnaireId: string, name: string, resource: string)
}
