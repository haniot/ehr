import { ActivityHabitsRecordEntity } from './activity.habits.record.entity'

export class SleepHabitEntity extends ActivityHabitsRecordEntity {
    public week_day_sleep?: number
    public week_day_wake_up?: number
}
