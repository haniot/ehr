import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { SchoolActivityFrequency } from '../utils/school.activity.frequency'

export class SchoolActivityFrequencyValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(SchoolActivityFrequency).includes(value)) {
            throw new ValidationException(
                'SchoolActivityFrequency: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(SchoolActivityFrequency).join(', ').concat('.')))
        }
    }
}
