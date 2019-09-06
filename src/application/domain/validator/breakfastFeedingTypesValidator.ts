import { ValidationException } from '../exception/validation.exception'
import { BreakfastFeedingTypes } from '../utils/breakfast.feeding.types'
import { Strings } from '../../../utils/strings'

export class BreakfastFeedingTypesValidator {
    public static validate(value: BreakfastFeedingTypes): void | ValidationException {
        if (!Object.values(BreakfastFeedingTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`six_month_breast_feeding: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BreakfastFeedingTypes).join(', ').concat('.')))
        }
    }
}
