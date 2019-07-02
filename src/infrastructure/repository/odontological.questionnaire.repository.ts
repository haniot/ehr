import {IOdontologicalQuestionnaireRepository} from '../../application/port/odontological.questionnaire.repository.interface'
import {BaseRepository} from './base/base.repository'
import {OdontologicalQuestionnaire} from '../../application/domain/model/odontological.questionnaire'
import {OdontologicalQuestionnaireEntity} from '../entity/odontological.questionnaire.entity'
import {injectable} from "inversify";

@injectable()
export class OdontologicalQuestionnaireRepository
    extends BaseRepository<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity> implements IOdontologicalQuestionnaireRepository {


}
