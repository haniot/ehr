import { ValidationException } from '../exception/validation.exception'
import { ObjectIdValidator } from './object.id.validator'

export class CreateActivityHabitsRecordValidator {
    public static validate(item: any): void | ValidationException {
        const fields: Array<string> = []

        if (!item.patient_id) fields.push('patient_id')
        else ObjectIdValidator.validate(item.patient_id)

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Activity Habits Record validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
