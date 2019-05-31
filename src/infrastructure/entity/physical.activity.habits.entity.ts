import { QuestionnaireRecordEntity } from './questionnaire.record.entity'

export class PhysicalActivityHabitsEntity extends QuestionnaireRecordEntity {
    public school_activity_freq?: string
    public weekly_activities?: Array<string>
}
