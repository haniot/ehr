import { MedicalRecord } from '../model/medical.record'
import { ValidationException } from '../exception/validation.exception'
import { ChronicDiseaseValidator } from './chronic.disease.validator'
import { UpdateQuestionnaireRecordValidator } from './update.questionnaire.record.validator'

export class UpdateMedicalRecordValidator {
    public static validate(item: MedicalRecord): void | ValidationException {
        UpdateQuestionnaireRecordValidator.validate(item)
        if (item.chronic_diseases) item.chronic_diseases.forEach(value => {
            ChronicDiseaseValidator.validate(value)
        })
    }
}
