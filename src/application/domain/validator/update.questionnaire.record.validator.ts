import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ObjectIdValidator } from './object.id.validator'

export class UpdateQuestionnaireRecordValidator {
    public static validate(item: any): void | ValidationException {
        if (item.id) ObjectIdValidator.validate(item.id)
        if (item.patient_id) {
            throw new ValidationException('patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
        }

        if (item.created_at) {
            throw new ValidationException('created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
        }
    }
}
