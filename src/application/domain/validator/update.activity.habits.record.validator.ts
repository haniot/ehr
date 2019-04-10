import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'

export class UpdateActivityHabitsRecordValidator {
    public static validate(item: any): void | ValidationException {
        if (item.patient_id) {
            throw new ValidationException('patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
        }

        if (item.created_at) {
            throw new ValidationException('created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
        }
    }
}
