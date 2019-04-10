import { ActivityHabitsRecordEntity } from './activity.habits.record.entity'

export class MedicalRecordEntity extends ActivityHabitsRecordEntity {
    public chronic_diseases ?: Array<any>
}
