import {SociodemographicRecord} from '../../application/domain/model/sociodemographic.record'
import {FamilyCohesionRecord} from '../../application/domain/model/family.cohesion.record'
import {OralHealthRecord} from '../../application/domain/model/oral.health.record'

export class OdontologicalQuestionnaireEntity {
    public id?: string
    public patient_id?: string
    public created_at?: Date
    public sociodemographic_recod?: SociodemographicRecord
    public family_cohesion_record?: FamilyCohesionRecord
    public oral_health_record?: OralHealthRecord
}
