import { ValidationException } from '../exception/validation.exception'
import { ObjectIdValidator } from './object.id.validator'
import { ISODateTimeFormatValidator } from './iso.datetime.format.validator'

export class CreateActivityHabitsRecordValidator {
    public static validate(item: any): void | ValidationException {
        const fields: Array<string> = []

        if (!item.patient_id) fields.push('patient_id')
        ObjectIdValidator.validate(item.patient_id)
        if (!item.created_at) fields.push('created_at')
        else ISODateTimeFormatValidator.validate(item.created_at)

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                ' validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
