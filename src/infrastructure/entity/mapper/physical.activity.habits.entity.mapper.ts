import { ActivityHabitsRecordEntityMapper } from './activity.habits.record.entity.mapper'
import { IEntityMapper } from '../../port/entity.mapper.interface'
import { PhysicalActivityHabits } from '../../../application/domain/model/physical.activity.habits'
import { PhysicalActivityHabitsEntity } from '../physical.activity.habits.entity'
import { injectable } from 'inversify'

@injectable()
export class PhysicalActivityHabitsEntityMapper extends ActivityHabitsRecordEntityMapper
    implements IEntityMapper<PhysicalActivityHabits, PhysicalActivityHabitsEntity> {
    public jsonToModel(json: any): PhysicalActivityHabits {
        const result: PhysicalActivityHabits = new PhysicalActivityHabits()
        if (!json) return result

        super.jsonToModel(json)
        if (json.school_activity_freq !== undefined) result.school_activity_freq = json.school_activity_freq
        if (json.weekly_activities !== undefined && json.weekly_activities.length) {
            result.weekly_activities = json.weekly_activities.map(value => value instanceof String)
        }

        return result
    }

    public modelEntityToModel(item: PhysicalActivityHabitsEntity): PhysicalActivityHabits {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: PhysicalActivityHabits): PhysicalActivityHabitsEntity {
        const result: PhysicalActivityHabitsEntity = new PhysicalActivityHabitsEntity()

        super.modelToModelEntity(item)
        if (item.school_activity_freq !== undefined) result.school_activity_freq = item.school_activity_freq
        if (item.weekly_activities !== undefined && item.weekly_activities.length) {
            result.weekly_activities = item.weekly_activities
        }
        return result
    }

    public transform(item: any): any {
        if (item instanceof PhysicalActivityHabits) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }
}
