import { UpdateQuestionnaireRecordValidator } from './update.questionnaire.record.validator'
import { ValidationException } from '../exception/validation.exception'
import { SleepHabit } from '../model/sleep.habit'

export class UpdateSleepHabitValidator {
    public static validate(item: SleepHabit): void | ValidationException {
        UpdateQuestionnaireRecordValidator.validate(item)
    }
}
