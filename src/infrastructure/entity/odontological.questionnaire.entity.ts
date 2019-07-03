import {SociodemographicRecord} from '../../application/domain/model/sociodemographic.record'
import {FamilyCohesionRecord} from '../../application/domain/model/family.cohesion.record'
import {OralHealthRecord} from '../../application/domain/model/oral.health.record'
import {QuestionnaireRecordEntity} from './questionnaire.record.entity'

export class OdontologicalQuestionnaireEntity extends QuestionnaireRecordEntity{
    public sociodemographic_recod?: SociodemographicRecord
    public family_cohesion_record?: FamilyCohesionRecord
    public oral_health_record?: OralHealthRecord
}
