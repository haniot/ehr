import { QuestionnaireRecordEntity } from './questionnaire.record.entity'

export class MedicalRecordEntity extends QuestionnaireRecordEntity {
    public chronic_diseases ?: Array<any>
}
