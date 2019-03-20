import { IEntityMapper } from '../../port/entity.mapper.interface'
import { ActivityHabitsRecord } from '../../../application/domain/model/activity.habits.record'
import { ActivityHabitsRecordEntity } from '../activity.habits.record.entity'
import { injectable } from 'inversify'

@injectable()
export class ActivityHabitsRecordEntityMapper implements IEntityMapper<ActivityHabitsRecord, ActivityHabitsRecordEntity> {
    public jsonToModel(json: any): ActivityHabitsRecord {
        const result: ActivityHabitsRecord = new ActivityHabitsRecord()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at

        return result
    }

    public modelEntityToModel(item: ActivityHabitsRecordEntity): ActivityHabitsRecord {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: ActivityHabitsRecord): ActivityHabitsRecordEntity {
        const result: ActivityHabitsRecordEntity = new ActivityHabitsRecordEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at

        return result
    }

    public transform(item: any): any {
        if (item instanceof ActivityHabitsRecord) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }
}
