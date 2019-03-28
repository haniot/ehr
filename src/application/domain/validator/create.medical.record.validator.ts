import { MedicalRecord } from '../model/medical.record'
import { CreateActivityHabitsRecordValidator } from './create.activity.habits.record.validator'
import { ValidationException } from '../exception/validation.exception'
import { ChronicDiseaseValidator } from './chronic.disease.validator'

export class CreateMedicalRecordValidator {
    public static validate(item: MedicalRecord): void | ValidationException {
        let fields: Array<string> = []
        CreateActivityHabitsRecordValidator.validate(item)
        if (!item.chronic_diseases) fields.push('chronic_diseases')
        else item.chronic_diseases.forEach((value: any) => {
            if (!value.type) fields.push('chronic_disease.type')
            if (!value.disease_history) fields.push('chronic_disease.disease_history')
            ChronicDiseaseValidator.validate(value)
        })

        fields = [...new Set(fields)]
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                ' validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
