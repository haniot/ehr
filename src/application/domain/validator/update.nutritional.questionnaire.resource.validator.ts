import { ValidationException } from '../exception/validation.exception'
import { CreatePhysicalActivityHabitsValidator } from './create.physical.activity.habits.validator'
import { CreateSleepHabitValidator } from './create.sleep.habit.validator'
import { CreateFeedingHabitsRecordValidator } from './create.feeding.habits.record.validator'
import { CreateMedicalRecordValidator } from './create.medical.record.validator'

export class UpdateNutritionalQuestionnaireResourceValidator {
    public static validate(name: string, resource: any): void | ValidationException {
        switch (name) {
            case 'physical_activity_habits':
                CreatePhysicalActivityHabitsValidator.validate(resource)
                break
            case 'sleep_habit':
                CreateSleepHabitValidator.validate(resource)
                break
            case 'feeding_habits_record':
                CreateFeedingHabitsRecordValidator.validate(resource)
                break
            case 'medical_record':
                CreateMedicalRecordValidator.validate(resource)
                break
            default:
                throw new ValidationException(`Resource not mapped to nutritional evaluation: ${name}`,
                    'The mapped resources are: physical_activity_habits, sleep_habit, ' +
                    'feeding_habits_record, medical_record.')
        }
    }
}
