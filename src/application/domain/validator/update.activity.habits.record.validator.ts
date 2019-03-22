import { ISODateTimeFormatValidator } from './iso.datetime.format.validator'
import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'

export class UpdateActivityHabitsRecordValidator {
    public static validate(item: any): void | ValidationException {
        if (item.patient_id) {
            throw new ValidationException('patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
        }
        if (item.created_at) ISODateTimeFormatValidator.validate(item.created_at)
    }
}
