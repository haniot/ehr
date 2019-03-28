import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { SevenDaysFeedingFrequencyTypes } from '../utils/seven.days.feeding.frequency.types'

export class WeeklyFoodRecordValidator {
    public static validate(value: any): void | ValidationException {
        if (!Object.values(SevenDaysFeedingFrequencyTypes).includes(value.seven_days_freq)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`seven_days_freq: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(SevenDaysFeedingFrequencyTypes).join(', ').concat('.')))
        }
    }
}
