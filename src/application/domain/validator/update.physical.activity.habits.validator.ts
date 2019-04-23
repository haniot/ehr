import { PhysicalActivityHabits } from '../model/physical.activity.habits'
import { ValidationException } from '../exception/validation.exception'
import { SchoolActivityFrequencyTypesValidator } from './school.activity.frequency.types.validator'
import { UpdateQuestionnaireRecordValidator } from './update.questionnaire.record.validator'
import { ObjectIdValidator } from './object.id.validator'

export class UpdatePhysicalActivityHabitsValidator {
    public static validate(item: PhysicalActivityHabits): void | ValidationException {
        UpdateQuestionnaireRecordValidator.validate(item)
        if (item.id) ObjectIdValidator.validate(item.id)
        if (item.school_activity_freq) SchoolActivityFrequencyTypesValidator.validate(item.school_activity_freq)
    }
}
