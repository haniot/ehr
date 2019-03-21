import { IEntityMapper } from '../../port/entity.mapper.interface'
import { SleepHabit } from '../../../application/domain/model/sleep.habit'
import { SleepHabitEntity } from '../sleep.habit.entity'
import { injectable } from 'inversify'

@injectable()
export class SleepHabitEntityMapper implements IEntityMapper<SleepHabit, SleepHabitEntity> {
    public jsonToModel(json: any): SleepHabit {
        const result: SleepHabit = new SleepHabit()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.week_day_sleep) result.week_day_sleep = json.week_day_sleep
        if (json.week_day_wake_up) result.week_day_wake_up = json.week_day_wake_up

        return result
    }

    public modelEntityToModel(item: SleepHabitEntity): SleepHabit {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: SleepHabit): SleepHabitEntity {
        const result: SleepHabitEntity = new SleepHabitEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
        if (item.week_day_sleep) result.week_day_sleep = item.week_day_sleep
        if (item.week_day_wake_up) result.week_day_wake_up = item.week_day_wake_up

        return result
    }

    public transform(item: any): any {
        if (item instanceof SleepHabit) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }
}
