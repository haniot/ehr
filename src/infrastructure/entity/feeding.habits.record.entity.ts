import { QuestionnaireRecordEntity } from './questionnaire.record.entity'

export class FeedingHabitsRecordEntity extends QuestionnaireRecordEntity {
    public weekly_feeding_habits?: Array<any>
    public daily_water_glasses?: string
    public six_month_breast_feeding?: string
    public food_allergy_intolerance?: Array<string>
    public breakfast_daily_frequency?: string
}
