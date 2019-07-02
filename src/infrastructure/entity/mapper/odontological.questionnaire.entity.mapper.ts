import {IEntityMapper} from '../../port/entity.mapper.interface'
import {OdontologicalQuestionnaire} from '../../../application/domain/model/odontological.questionnaire'
import {OdontologicalQuestionnaireEntity} from '../odontological.questionnaire.entity'
import {injectable} from 'inversify'

@injectable()
export class OdontologicalQuestionnaireEntityMapper implements
            IEntityMapper<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity> {

    public jsonToModel(json: any): OdontologicalQuestionnaire {

        const result: OdontologicalQuestionnaire = new OdontologicalQuestionnaire()

        if (!json)
            return result

        if (json.id !== undefined)
            result.id = json.id
        if (json.patient_id !== undefined)
            result.patient_id = json.patient_id
        if (json.created_at !== undefined)
            result.created_at = json.created_at
        if (json.sociodemographic_recod !== undefined)
            result.sociodemographic_recod = json.sociodemographic_recod
        if (json.family_cohesion_record !== undefined)
            result.family_cohesion_record = json.family_cohesion_record
        if (json.oral_health_record !== undefined)
            result.oral_health_record = json.oral_health_record

        return result
    }

    public modelEntityToModel(item: OdontologicalQuestionnaireEntity): OdontologicalQuestionnaire {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: OdontologicalQuestionnaire):
        OdontologicalQuestionnaireEntity {
        const result: OdontologicalQuestionnaire = new OdontologicalQuestionnaire()

        if (item.id !== undefined)
            result.id = item.id
        if (item.patient_id !== undefined)
            result.patient_id = item.patient_id
        if (item.created_at !== undefined)
            result.created_at = item.created_at
        if (item.sociodemographic_recod !== undefined)
            result.sociodemographic_recod = item.sociodemographic_recod
        if (item.family_cohesion_record !== undefined)
            result.family_cohesion_record = item.family_cohesion_record
        if (item.oral_health_record !== undefined)
            result.oral_health_record = item.oral_health_record

        return result
    }

    public transform(item: any): any {
        if (item instanceof OdontologicalQuestionnaire)
            return this.modelToModelEntity(item)

        return this.jsonToModel(item)
    }
}
