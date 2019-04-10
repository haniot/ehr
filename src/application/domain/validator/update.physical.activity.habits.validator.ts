import { PhysicalActivityHabits } from '../model/physical.activity.habits'
import { ValidationException } from '../exception/validation.exception'
import { SchoolActivityFrequencyTypesValidator } from './school.activity.frequency.types.validator'
import { UpdateActivityHabitsRecordValidator } from './update.activity.habits.record.validator'
import { ObjectIdValidator } from './object.id.validator'

export class UpdatePhysicalActivityHabitsValidator {
    public static validate(item: PhysicalActivityHabits): void | ValidationException {
        UpdateActivityHabitsRecordValidator.validate(item)
        if (item.id) ObjectIdValidator.validate(item.id)
        if (item.school_activity_freq) SchoolActivityFrequencyTypesValidator.validate(item.school_activity_freq)
    }
}
