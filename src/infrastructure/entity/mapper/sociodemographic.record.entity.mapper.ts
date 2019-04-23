import { IEntityMapper } from '../../port/entity.mapper.interface'
import { SociodemographicRecord } from '../../../application/domain/model/sociodemographic.record'
import { SociodemographicRecordEntity } from '../sociodemographic.record.entity'
import { injectable } from 'inversify'

@injectable()
export class SociodemographicRecordEntityMapper implements IEntityMapper<SociodemographicRecord, SociodemographicRecordEntity> {
    public jsonToModel(json: any): SociodemographicRecord {
        const result: SociodemographicRecord = new SociodemographicRecord()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.color_race !== undefined) result.color_race = json.color_race
        if (json.mother_schoolarity !== undefined) result.mother_schoolarity = json.mother_schoolarity
        if (json.people_in_home !== undefined) result.people_in_home = json.people_in_home

        return result
    }

    public modelEntityToModel(item: SociodemographicRecordEntity): SociodemographicRecord {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: SociodemographicRecord): SociodemographicRecordEntity {
        const result: SociodemographicRecordEntity = new SociodemographicRecordEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
        if (item.color_race !== undefined) result.color_race = item.color_race
        if (item.mother_schoolarity !== undefined) result.mother_schoolarity = item.mother_schoolarity
        if (item.people_in_home !== undefined) result.people_in_home = item.people_in_home

        return result
    }

    public transform(item: any): any {
        if (item instanceof SociodemographicRecord) return this.modelToModelEntity(item)
        return this.jsonToModel(item)
    }

}
