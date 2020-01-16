import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {FamilyCohesionRecord} from '../../../src/application/domain/model/family.cohesion.record'
import {UpdateFamilyCohesionRecordValidator} from '../../../src/application/domain/validator/update.family.cohesion.record.validator'

describe('Validators: UpdateFeedingHabitsRecordValidator', () => {
    const activity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = UpdateFamilyCohesionRecordValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {

        it('should throw an error for does pass invalid family_mutual_aid_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'invalid',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_mutual_aid_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: almost_never,' +
                    ' rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does pass invalid friendship_approval_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'invalid',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for friendship_approval_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does pass invalid family_only_task_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'invalid',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_only_task_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does pass invalid family_only_preference_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'invalid',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_only_preference_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does pass invalid free_time_together_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'invalid',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for free_time_together_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })
        it('should throw an error for does pass invalid family_proximity_perception_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'invalid',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_proximity_perception_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })
        it('should throw an error for does pass invalid all_family_tasks_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'invalid',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for all_family_tasks_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })
        it('should throw an error for does pass invalid family_tasks_opportunity_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'invalid',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_tasks_opportunity_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })
        it('should throw an error for does pass invalid family_decision_support_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'invalid',
                family_union_relevance_freq: 'almost_never',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_decision_support_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })
        it('should throw an error for does pass invalid family_union_relevance_freq', () => {
            const wrongActivity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON({
                family_mutual_aid_freq: 'almost_never',
                friendship_approval_freq: 'almost_never',
                family_only_task_freq: 'almost_never',
                family_only_preference_freq: 'almost_never',
                free_time_together_freq: 'almost_never',
                family_proximity_perception_freq: 'almost_never',
                all_family_tasks_freq: 'almost_never',
                family_tasks_opportunity_freq: 'almost_never',
                family_decision_support_freq: 'almost_never',
                family_union_relevance_freq: 'invalid',
                family_cohesion_result: 45
            })
            try {
                UpdateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_union_relevance_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }
        })
    })
})
