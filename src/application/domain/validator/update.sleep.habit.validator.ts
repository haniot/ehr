import { UpdateActivityHabitsRecordValidator } from './update.activity.habits.record.validator'
import { ValidationException } from '../exception/validation.exception'
import { ObjectIdValidator } from './object.id.validator'
import { SleepHabit } from '../model/sleep.habit'

export class UpdateSleepHabitValidator {
    public static validate(item: SleepHabit): void | ValidationException {
        UpdateActivityHabitsRecordValidator.validate(item)
        if (item.id) ObjectIdValidator.validate(item.id)
    }
}
