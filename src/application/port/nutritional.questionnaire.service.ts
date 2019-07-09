import {IService} from './service.interface'
import {NutritionalQuestionnaire} from '../domain/model/nutritional.questionnaire'

export interface INutritionalQuestionnaireService extends IService<NutritionalQuestionnaire> {
    removeNutrionalQuestionnaire(patientId: string, nutritionalQuestionnaireId: string): Promise<boolean>
}
