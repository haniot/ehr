import { ActivityHabitsRecordEntity } from './activity.habits.record.entity'

export class PhysicalActivityHabitsEntity extends ActivityHabitsRecordEntity {
    public school_activity_freq?: string
    public weekly_activities?: Array<string>
}
