import { MedicalRecord } from '../model/medical.record'
import { CreateActivityHabitsRecordValidator } from './create.activity.habits.record.validator'
import { ValidationException } from '../exception/validation.exception'

export class CreateMedicalRecordValidator {
    public static validate(item: MedicalRecord): void | ValidationException {
        const fields: Array<string> = []
        CreateActivityHabitsRecordValidator.validate(item)
        if (!item.chronic_diseases) fields.push('chronic_diseases')


        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                ' validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
