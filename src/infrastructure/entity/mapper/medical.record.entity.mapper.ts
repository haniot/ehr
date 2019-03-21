import { IEntityMapper } from '../../port/entity.mapper.interface'
import { MedicalRecord } from '../../../application/domain/model/medical.record'
import { MedicalRecordEntity } from '../medical.record.entity'
import { ChronicDisease } from '../../../application/domain/model/chronic.disease'
import { injectable } from 'inversify'

@injectable()
export class MedicalRecordEntityMapper implements IEntityMapper<MedicalRecord, MedicalRecordEntity> {

    public jsonToModel(json: any): MedicalRecord {
        const result: MedicalRecord = new MedicalRecord()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.chronic_diseases !== undefined && json.chronic_diseases.length > 0) {
            result.chronic_diseases = json.chronic_diseases.map(value => new ChronicDisease().fromJSON(value))
        }

        return result
    }

    public modelEntityToModel(item: MedicalRecordEntity): MedicalRecord {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: MedicalRecord): MedicalRecordEntity {
        const result: MedicalRecordEntity = new MedicalRecordEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
        if (item.chronic_diseases !== undefined && item.chronic_diseases.length > 0)
            result.chronic_diseases = item.chronic_diseases.map(value => new ChronicDisease().fromJSON(value))

        return result
    }

    public transform(item: any): any {
        if (item instanceof MedicalRecord) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }
}
