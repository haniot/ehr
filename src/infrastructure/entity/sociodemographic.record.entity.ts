import { QuestionnaireRecordEntity } from './questionnaire.record.entity'

export class SociodemographicRecordEntity extends QuestionnaireRecordEntity{
    public color_race?: string
    public mother_schoolarity?: string
    public people_in_home?: number
}
