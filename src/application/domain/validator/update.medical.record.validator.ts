import { MedicalRecord } from '../model/medical.record'
import { ValidationException } from '../exception/validation.exception'
import { ChronicDiseaseValidator } from './chronic.disease.validator'
import { UpdateActivityHabitsRecordValidator } from './update.activity.habits.record.validator'
import { ObjectIdValidator } from './object.id.validator'

export class UpdateMedicalRecordValidator {
    public static validate(item: MedicalRecord): void | ValidationException {
        UpdateActivityHabitsRecordValidator.validate(item)
        if (item.id) ObjectIdValidator.validate(item.id)
        if (item.chronic_diseases) item.chronic_diseases.forEach(value => {
            ChronicDiseaseValidator.validate(value)
        })
    }
}
