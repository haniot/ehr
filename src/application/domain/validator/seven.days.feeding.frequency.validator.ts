import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { SevenDaysFeedingFrequency } from '../utils/seven.days.feeding.frequency'

export class SevenDaysFeedingFrequencyValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(SevenDaysFeedingFrequency).includes(value)) {
            throw new ValidationException(
                'SevenDaysFeedingFrequency: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(SevenDaysFeedingFrequency).join(', ').concat('.')))
        }
    }
}
