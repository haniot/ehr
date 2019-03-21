import { IEntityMapper } from '../../port/entity.mapper.interface'
import { PhysicalActivityHabits } from '../../../application/domain/model/physical.activity.habits'
import { PhysicalActivityHabitsEntity } from '../physical.activity.habits.entity'
import { injectable } from 'inversify'

@injectable()
export class PhysicalActivityHabitsEntityMapper
    implements IEntityMapper<PhysicalActivityHabits, PhysicalActivityHabitsEntity> {
    public jsonToModel(json: any): PhysicalActivityHabits {
        const result: PhysicalActivityHabits = new PhysicalActivityHabits()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.school_activity_freq !== undefined) result.school_activity_freq = json.school_activity_freq
        if (json.weekly_activities !== undefined && json.weekly_activities.length) {
            result.weekly_activities = json.weekly_activities.filter(value => {
                if (typeof value === 'string') return value
            })
        }

        return result
    }

    public modelEntityToModel(item: PhysicalActivityHabitsEntity): PhysicalActivityHabits {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: PhysicalActivityHabits): PhysicalActivityHabitsEntity {
        const result: PhysicalActivityHabitsEntity = new PhysicalActivityHabitsEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
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
