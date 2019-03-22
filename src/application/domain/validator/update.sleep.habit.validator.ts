import { UpdateActivityHabitsRecordValidator } from './update.activity.habits.record.validator'
import { ValidationException } from '../exception/validation.exception'

export class UpdateSleepHabitValidator {
    public static validate(item: any): void | ValidationException {
        UpdateActivityHabitsRecordValidator.validate(item)
    }
}
