import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { SevenDaysFeedingFrequency } from '../utils/seven.days.feeding.frequency'

export class WeeklyFoodRecordValidator {
    public static validate(value: any): void | ValidationException {
        if (!Object.values(SevenDaysFeedingFrequency).includes(value.disease_history)) {
            throw new ValidationException(
                'SevenDaysFreq: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(SevenDaysFeedingFrequency).join(', ').concat('.')))
        }
    }
}
