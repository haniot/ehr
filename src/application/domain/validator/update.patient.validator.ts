import { Patient } from '../model/patient'
import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ISODateFormatValidator } from './iso.date.format.validator'
import { GenderValidator } from './gender.validator'

export class UpdatePatientValidator {
    public static validate(item: Patient): void | ValidationException {
        if (item.pilotstudy_id) {
            throw new ValidationException('pilotstudy_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
        }
        if (item.gender) GenderValidator.validate(item.gender)
        if (item.birth_date) ISODateFormatValidator.validate(item.birth_date)
    }
}
