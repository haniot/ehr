import { QuestionnaireRecordEntity } from './questionnaire.record.entity'

export class OralHealthRecordEntity extends QuestionnaireRecordEntity {
    public teeth_brushing_freq?: string
    public teeth_lesions?: Array<any>
}
