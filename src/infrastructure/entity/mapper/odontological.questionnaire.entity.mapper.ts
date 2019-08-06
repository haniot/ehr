import { IEntityMapper } from '../../port/entity.mapper.interface'
import { OdontologicalQuestionnaire } from '../../../application/domain/model/odontological.questionnaire'
import { OdontologicalQuestionnaireEntity } from '../odontological.questionnaire.entity'
import { injectable } from 'inversify'
import { SociodemographicRecord } from '../../../application/domain/model/sociodemographic.record'
import { FamilyCohesionRecord } from '../../../application/domain/model/family.cohesion.record'
import { OralHealthRecord } from '../../../application/domain/model/oral.health.record'

@injectable()
export class OdontologicalQuestionnaireEntityMapper
    implements IEntityMapper<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity> {

    public jsonToModel(json: any): OdontologicalQuestionnaire {
        const result: OdontologicalQuestionnaire = new OdontologicalQuestionnaire()

        if (!json) return result
        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.sociodemographic_record !== undefined) {
            result.sociodemographic_record = new SociodemographicRecord().fromJSON(json.sociodemographic_record)
        }
        if (json.family_cohesion_record !== undefined) {
            result.family_cohesion_record = new FamilyCohesionRecord().fromJSON(json.family_cohesion_record)
        }
        if (json.oral_health_record !== undefined) {
            result.oral_health_record = new OralHealthRecord().fromJSON(json.oral_health_record)
        }

        return result
    }

    public modelEntityToModel(item: OdontologicalQuestionnaireEntity): OdontologicalQuestionnaire {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: OdontologicalQuestionnaire): OdontologicalQuestionnaireEntity {
        const result: OdontologicalQuestionnaireEntity = new OdontologicalQuestionnaireEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
        if (item.sociodemographic_record !== undefined) result.sociodemographic_record = item.sociodemographic_record.toJSON()
        if (item.family_cohesion_record !== undefined) result.family_cohesion_record = item.family_cohesion_record.toJSON()
        if (item.oral_health_record !== undefined) result.oral_health_record = item.oral_health_record.toJSON()

        return result
    }

    public transform(item: any): any {
        if (item instanceof OdontologicalQuestionnaire) return this.modelToModelEntity(item)
        return this.jsonToModel(item)
    }
}
