import { IService } from './service.interface'
import {OdontologicalQuestionnaire} from '../domain/model/odontological.questionnaire'

export interface IOdontologicalQuestionnaireService extends IService<OdontologicalQuestionnaire> {
   removeOdontologicalQuestionnaire(patientId: string, odontologicalQuestionnaireId: string): Promise<boolean>
}
