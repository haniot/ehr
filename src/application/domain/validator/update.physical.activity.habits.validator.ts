import { PhysicalActivityHabits } from '../model/physical.activity.habits'
import { ValidationException } from '../exception/validation.exception'
import { SchoolActivityFrequencyValidator } from './school.activity.frequency.validator'
import { UpdateActivityHabitsRecordValidator } from './update.activity.habits.record.validator'

export class UpdatePhysicalActivityHabitsValidator {
    public static validate(item: PhysicalActivityHabits): void | ValidationException {
        UpdateActivityHabitsRecordValidator.validate(item)
        if (item.school_activity_freq) SchoolActivityFrequencyValidator.validate(item.school_activity_freq)
    }
}
