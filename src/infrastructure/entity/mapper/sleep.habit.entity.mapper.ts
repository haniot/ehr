import { IEntityMapper } from '../../port/entity.mapper.interface'
import { SleepHabit } from '../../../application/domain/model/sleep.habit'
import { SleepHabitEntity } from '../sleep.habit.entity'
import { ActivityHabitsRecordEntityMapper } from './activity.habits.record.entity.mapper'
import { injectable } from 'inversify'

@injectable()
export class SleepHabitEntityMapper extends ActivityHabitsRecordEntityMapper
    implements IEntityMapper<SleepHabit, SleepHabitEntity> {
    public jsonToModel(json: any): SleepHabit {
        const result: SleepHabit = new SleepHabit()
        if (!json) return result

        super.jsonToModel(json)
        if (json.week_day_sleep) result.week_day_sleep = json.week_day_sleep
        if (json.week_day_wake_up) result.week_day_wake_up = json.week_day_wake_up

        return result
    }

    public modelEntityToModel(item: SleepHabitEntity): SleepHabit {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: SleepHabit): SleepHabitEntity {
        const result: SleepHabitEntity = new SleepHabitEntity()

        super.modelToModelEntity(item)
        if (item.week_day_sleep) result.week_day_sleep = item.week_day_sleep
        if (item.week_day_wake_up) result.week_day_wake_up = item.week_day_wake_up

        return result
    }

    public transform(item: any): any {
        if (item instanceof SleepHabit) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }
}
