import { Patient } from '../model/patient'
import { ValidationException } from '../exception/validation.exception'
import { ObjectIdValidator } from './object.id.validator'
import { ISODateFormatValidator } from './iso.date.format.validator'
import { GenderValidator } from './gender.validator'

export class CreatePatientValidator {
    public static validate(item: Patient): void | ValidationException {
        const fields: Array<string> = []
        if (!item.pilotstudy_id) fields.push('pilotstudy_id')
        else ObjectIdValidator.validate(item.pilotstudy_id)
        if (!item.first_name) fields.push('first_name')
        else if (!!item.first_name.trim()) fields.push('first_name (cannot be null)')
        if (!item.last_name) fields.push('last_name')
        else if (!!item.last_name.trim()) fields.push('last_name (cannot be null)')
        if (!item.gender) fields.push('gender')
        else GenderValidator.validate(item.gender)
        if (!item.birth_date) fields.push('birth_date')
        else ISODateFormatValidator.validate(item.birth_date)

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Patient validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
