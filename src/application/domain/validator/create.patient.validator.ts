import { Patient } from '../model/patient'
import { ValidationException } from '../exception/validation.exception'
import { ObjectIdValidator } from './object.id.validator'
import { DateValidator } from './date.validator'
import { GenderTypesValidator } from './gender.types.validator'

export class CreatePatientValidator {
    public static validate(item: Patient): void | ValidationException {
        const fields: Array<string> = []
        if (!item.pilotstudy_id) fields.push('pilotstudy_id')
        else ObjectIdValidator.validate(item.pilotstudy_id)
        if (!item.first_name) fields.push('first_name')
        if (!item.last_name) fields.push('last_name')
        if (!item.gender) fields.push('gender')
        else GenderTypesValidator.validate(item.gender)
        if (!item.birth_date) fields.push('birth_date')
        else DateValidator.validate(item.birth_date)

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Patient validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}