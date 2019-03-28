import { ValidationException } from '../exception/validation.exception'
import { BreastFeeding } from '../utils/breast.feeding'
import { Strings } from '../../../utils/strings'

export class BreastFeedingValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(BreastFeeding).includes(value)) {
            throw new ValidationException(
                'BreastFeeding: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BreastFeeding).join(', ').concat('.')))
        }
    }
}
