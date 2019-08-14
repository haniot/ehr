import { NutritionalQuestionnaire } from '../model/nutritional.questionnaire'
import { CreateQuestionnaireRecordValidator } from './create.questionnaire.record.validator'
import { ValidationException } from '../exception/validation.exception'
import { CreateSleepHabitValidator } from './create.sleep.habit.validator'
import { CreatePhysicalActivityHabitsValidator } from './create.physical.activity.habits.validator'
import { CreateFeedingHabitsRecordValidator } from './create.feeding.habits.record.validator'
import { CreateMedicalRecordValidator } from './create.medical.record.validator'

export class CreateNutritionalQuestionnaireValidator {

    public static validate(item: NutritionalQuestionnaire): void | ValidationException {

        const fields: Array<string> = []
        CreateQuestionnaireRecordValidator.validate(item)

        if (!item.sleep_habit) fields.push('sleep_habit')
        else CreateSleepHabitValidator.validate(item.sleep_habit)
        if (!item.physical_activity_habits) fields.push('physical_activity_habits')
        else CreatePhysicalActivityHabitsValidator.validate(item.physical_activity_habits)
        if (!item.feeding_habits_record) fields.push('feeding_habits_record')
        else CreateFeedingHabitsRecordValidator.validate((item.feeding_habits_record))
        if (!item.medical_record) fields.push('medical_record')
        else CreateMedicalRecordValidator.validate(item.medical_record)

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Nutritional Questionnaire validation: '.concat(fields.join(', ')).concat(' is required!'))

        }
    }
}
