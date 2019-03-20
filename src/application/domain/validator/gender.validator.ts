import { ValidationException } from '../exception/validation.exception'
import { GenderType } from '../utils/gender.type'
import { Strings } from '../../../utils/strings'

export class GenderValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(GenderType).includes(value)) {
            throw new ValidationException(
                'Gender: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(GenderType).join(', ').concat('.')))
        }
    }
}
