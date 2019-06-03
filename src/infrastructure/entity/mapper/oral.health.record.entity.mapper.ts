import { IEntityMapper } from '../../port/entity.mapper.interface'
import { OralHealthRecord } from '../../../application/domain/model/oral.health.record'
import { OralHealthRecordEntity } from '../oral.health.record.entity'
import { ToothLesion } from '../../../application/domain/model/tooth.lesion'
import { injectable } from 'inversify'

@injectable()
export class OralHealthRecordEntityMapper implements IEntityMapper<OralHealthRecord, OralHealthRecordEntity> {
    public jsonToModel(json: any): OralHealthRecord {
        const result: OralHealthRecord = new OralHealthRecord()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.teeth_brushing_freq !== undefined) result.teeth_brushing_freq = json.teeth_brushing_freq
        if (json.teeth_lesions !== undefined && json.teeth_lesions.length) {
            result.teeth_lesions = json.teeth_lesions.map(value => new ToothLesion().fromJSON(value))
        }

        return result
    }

    public modelEntityToModel(item: OralHealthRecordEntity): OralHealthRecord {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: OralHealthRecord): OralHealthRecordEntity {
        const result: OralHealthRecordEntity = new OralHealthRecordEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
        if (item.teeth_brushing_freq !== undefined) result.teeth_brushing_freq = item.teeth_brushing_freq
        if (item.teeth_lesions !== undefined && item.teeth_lesions.length) {
            result.teeth_lesions = item.teeth_lesions.map(value => value.toJSON())
        }

        return result
    }

    public transform(item: any): any {
        if (item instanceof OralHealthRecord) return this.modelToModelEntity(item)
        return this.jsonToModel(item)
    }

}
