import { ValidationException } from '../exception/validation.exception'
import { PhysicalActivityHabits } from '../model/physical.activity.habits'
import { CreateActivityHabitsRecordValidator } from './create.activity.habits.record.validator'
import { SchoolActivityFrequencyValidator } from './school.activity.frequency.validator'

export class CreatePhysicalActivityHabitsValidator {
    public static validate(item: PhysicalActivityHabits): void | ValidationException {
        const fields: Array<string> = []

        CreateActivityHabitsRecordValidator.validate(item)
        if (!item.school_activity_freq) fields.push('school_activity_freq')
        else SchoolActivityFrequencyValidator.validate(item.school_activity_freq)
        if (!item.weekly_activities) fields.push('weekly_activities')
        else item.weekly_activities.forEach((value: any) => {
            if (!!value.trim()) fields.push(`${value} (cannot be null)`)
        })

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                ' validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
