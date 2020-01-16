import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { FamilyCohesionRecord } from '../../../src/application/domain/model/family.cohesion.record'
import { CreateFamilyCohesionRecordValidator } from '../../../src/application/domain/validator/create.family.cohesion.record.validator'

describe('Validators: CreateFamilyCohesionRecord', () => {

    const activity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = CreateFamilyCohesionRecordValidator.validate(activity)
        assert.isUndefined(result)
    })
    context('when there are validation errors', () => {

        it('should throw an error for does not pass family_mutual_aid_freq', () => {
            activity.family_mutual_aid_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: family_mutual_aid_freq is required!')
            } finally {
                activity.family_mutual_aid_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq
            }
        })

        it('should throw an error for does not pass friendship_approval_freq', () => {
            activity.friendship_approval_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: friendship_approval_freq is required!')
            } finally {
                activity.friendship_approval_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq
            }
        })
        it('should throw an error for does not pass family_only_task_freq', () => {
            activity.family_only_task_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: family_only_task_freq is required!')
            } finally {
                activity.family_only_task_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq
            }
        })
        it('should throw an error for does not pass family_only_preference_freq', () => {
            activity.family_only_preference_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: family_only_preference_freq is required!')
            } finally {
                activity.family_only_preference_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq
            }
        })
        it('should throw an error for does not pass free_time_together_freq', () => {
            activity.free_time_together_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: free_time_together_freq is required!')
            } finally {
                activity.free_time_together_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq
            }
        })
        it('should throw an error for does not pass family_proximity_perception_freq', () => {
            activity.family_proximity_perception_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: family_proximity_perception_freq is required!')
            } finally {
                activity.family_proximity_perception_freq =
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq
            }
        })
        it('should throw an error for does not pass all_family_tasks_freq', () => {
            activity.all_family_tasks_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: all_family_tasks_freq is required!')
            } finally {
                activity.all_family_tasks_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq
            }
        })
        it('should throw an error for does not pass family_tasks_opportunity_freq', () => {
            activity.family_tasks_opportunity_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: family_tasks_opportunity_freq is required!')
            } finally {
                activity.family_tasks_opportunity_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq
            }
        })
        it('should throw an error for does not pass family_decision_support_freq', () => {
            activity.family_decision_support_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: family_decision_support_freq is required!')
            } finally {
                activity.family_decision_support_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq
            }
        })
        it('should throw an error for does not pass family_union_relevance_freq', () => {
            activity.family_union_relevance_freq = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: family_union_relevance_freq is required!')
            } finally {
                activity.family_union_relevance_freq = DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq
            }
        })
        it('should throw an error for does not pass family_cohesion_result', () => {
            activity.family_cohesion_result = undefined
            try {
                CreateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Family Cohesion Record validation: family_cohesion_result is required!')
            } finally {
                activity.family_cohesion_result = DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result
            }
        })

        it('should throw an error for does not pass correct family_mutual_aid_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_mutual_aid_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct friendship_approval_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for friendship_approval_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct family_only_task_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_only_task_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct family_only_preference_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_only_preference_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct free_time_together_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for free_time_together_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct family_proximity_perception_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_proximity_perception_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct all_family_tasks_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for all_family_tasks_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct family_tasks_opportunity_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_tasks_opportunity_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct family_decision_support_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_decision_support_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })

        it('should throw an error for does not pass correct family_union_relevance_freq', () => {
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
                CreateFamilyCohesionRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_union_relevance_freq: invalid')
                assert.propertyVal(err, 'description',
                    'The mapped values are: almost_never, rarely, sometimes, often, almost_always.')
            }
        })
    })
})
