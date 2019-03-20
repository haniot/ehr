import { ActivityHabitsRecordEntityMapper } from './activity.habits.record.entity.mapper'
import { IEntityMapper } from '../../port/entity.mapper.interface'
import { MedicalRecord } from '../../../application/domain/model/medical.record'
import { MedicalRecordEntity } from '../medical.record.entity'
import { ChronicDisease } from '../../../application/domain/model/chronic.disease'
import { injectable } from 'inversify'

@injectable()
export class MedicalRecordEntityMapper
    extends ActivityHabitsRecordEntityMapper implements IEntityMapper<MedicalRecord, MedicalRecordEntity> {

    public jsonToModel(json: any): MedicalRecord {
        const result: MedicalRecord = new MedicalRecord()
        if (!json) return result

        super.jsonToModel(json)
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

        super.modelToModelEntity(item)
        if (item.chronic_diseases !== undefined && item.chronic_diseases.length > 0)
            result.chronic_diseases = item.chronic_diseases.map(value => new ChronicDisease().fromJSON(value))

        return result
    }

    public transform(item: any): any {
        if (item instanceof MedicalRecord) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }
}
