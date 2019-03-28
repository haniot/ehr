import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { OneDayFeedingAmount } from '../utils/one.day.feeding.amount'

export class OneDayFeedingAmountValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(OneDayFeedingAmount).includes(value)) {
            throw new ValidationException(
                'OneDayFeeding: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(OneDayFeedingAmount).join(', ').concat('.')))
        }
    }
}
