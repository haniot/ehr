import { ValidationException } from '../exception/validation.exception'
import { PhysicalActivityHabits } from '../model/physical.activity.habits'
import { CreateQuestionnaireRecordValidator } from './create.questionnaire.record.validator'
import { SchoolActivityFrequencyTypesValidator } from './school.activity.frequency.types.validator'

export class CreatePhysicalActivityHabitsValidator {
    public static validate(item: PhysicalActivityHabits): void | ValidationException {
        const fields: Array<string> = []

        CreateQuestionnaireRecordValidator.validate(item)
        if (!item.school_activity_freq) fields.push('school_activity_freq')
        else SchoolActivityFrequencyTypesValidator.validate(item.school_activity_freq)
        if (!item.weekly_activities) fields.push('weekly_activities')

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Physical Activity Habits validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
