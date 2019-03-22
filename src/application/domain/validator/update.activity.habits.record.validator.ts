import { ObjectIdValidator } from './object.id.validator'
import { ISODateTimeFormatValidator } from './iso.datetime.format.validator'
import { ValidationException } from '../exception/validation.exception'

export class UpdateActivityHabitsRecordValidator {
    public static validate(item: any): void | ValidationException {
        if (item.patient_id) ObjectIdValidator.validate(item.patient_id)
        if (item.created_at) ISODateTimeFormatValidator.validate(item.created_at)
    }
}
