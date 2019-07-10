import {IService} from './service.interface'
import {NutritionalQuestionnaire} from '../domain/model/nutritional.questionnaire'

export interface INutritionalQuestionnaireService extends IService<NutritionalQuestionnaire> {
    removeNutritionalQuestionnaire(patientId: string, nutritionalQuestionnaireId: string): Promise<boolean>
}
