import { FamilyCohesionRecord } from '../model/family.cohesion.record'
import { ValidationException } from '../exception/validation.exception'
import { FamilyCohesionFrequencyTypesValidator } from './family.cohesion.frequency.types.validator'
import { UpdateQuestionnaireRecordValidator } from './update.questionnaire.record.validator'

export class UpdateFamilyCohesionRecordValidator {
    public static validate(item: FamilyCohesionRecord): void | ValidationException {

        UpdateQuestionnaireRecordValidator.validate(item)
        if (item.family_mutual_aid_freq)
            FamilyCohesionFrequencyTypesValidator.validate(item.family_mutual_aid_freq, 'family_mutual_aid_freq')
        if (item.friendship_approval_freq)
            FamilyCohesionFrequencyTypesValidator.validate(item.friendship_approval_freq, 'friendship_approval_freq')
        if (item.family_only_task_freq)
            FamilyCohesionFrequencyTypesValidator.validate(item.family_only_task_freq, 'family_only_task_freq')
        if (item.family_only_preference_freq)
            FamilyCohesionFrequencyTypesValidator
                .validate(item.family_only_preference_freq, 'family_only_preference_freq')
        if (item.free_time_together_freq)
            FamilyCohesionFrequencyTypesValidator
                .validate(item.free_time_together_freq, 'free_time_together_freq')
        if (item.family_proximity_perception_freq)
            FamilyCohesionFrequencyTypesValidator
                .validate(item.family_proximity_perception_freq, 'family_proximity_perception_freq')
        if (item.all_family_tasks_freq)
            FamilyCohesionFrequencyTypesValidator.validate(item.all_family_tasks_freq, 'all_family_tasks_freq')
        if (item.family_tasks_opportunity_freq)
            FamilyCohesionFrequencyTypesValidator
                .validate(item.family_tasks_opportunity_freq, 'family_tasks_opportunity_freq')
        if (item.family_decision_support_freq)
            FamilyCohesionFrequencyTypesValidator
                .validate(item.family_decision_support_freq, 'family_decision_support_freq')
        if (item.family_union_relevance_freq) FamilyCohesionFrequencyTypesValidator
            .validate(item.family_union_relevance_freq, 'family_union_relevance_freq')

    }
}
