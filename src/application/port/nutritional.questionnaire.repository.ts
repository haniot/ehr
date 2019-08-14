import { IRepository } from './repository.interface'
import { NutritionalQuestionnaire } from '../domain/model/nutritional.questionnaire'

export interface INutritionalQuestionnaireRepository extends IRepository<NutritionalQuestionnaire> {
    removeQuestionnairesFromPatient(id: string): Promise<boolean>

    updateQuestionnaireResource(patientId: string, questionnaireId: string, name: string, resource: any): Promise<any>
}
