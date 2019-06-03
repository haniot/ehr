import { ValidationException } from '../exception/validation.exception'
import { SleepHabit } from '../model/sleep.habit'
import { CreateQuestionnaireRecordValidator } from './create.questionnaire.record.validator'

export class CreateSleepHabitValidator {
    public static validate(item: SleepHabit): void | ValidationException {
        const fields: Array<string> = []

        CreateQuestionnaireRecordValidator.validate(item)
        if (!item.week_day_sleep) fields.push('week_day_sleep')
        if (!item.week_day_wake_up) fields.push('week_day_wake_up')

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Sleep Habit validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
