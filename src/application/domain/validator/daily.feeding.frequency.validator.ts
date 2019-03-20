import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { DailyFeedingFrequency } from '../utils/daily.feeding.frequency'

export class DailyFeedingFrequencyValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(DailyFeedingFrequency).includes(value)) {
            throw new ValidationException(
                'DailyFeedingFrequency: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(DailyFeedingFrequency).join(', ').concat('.')))
        }
    }
}
