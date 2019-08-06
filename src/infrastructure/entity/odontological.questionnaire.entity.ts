import { QuestionnaireEntity } from './questionnaire.entity'
import { SociodemographicRecord } from '../../application/domain/model/sociodemographic.record'
import { FamilyCohesionRecord } from '../../application/domain/model/family.cohesion.record'
import { OralHealthRecord } from '../../application/domain/model/oral.health.record'

export class OdontologicalQuestionnaireEntity extends QuestionnaireEntity {
    public sociodemographic_record?: SociodemographicRecord
    public family_cohesion_record?: FamilyCohesionRecord
    public oral_health_record?: OralHealthRecord
}
