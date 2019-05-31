import { QuestionnaireRecordEntity } from './questionnaire.record.entity'

export class SleepHabitEntity extends QuestionnaireRecordEntity {
    public week_day_sleep?: number
    public week_day_wake_up?: number
}
