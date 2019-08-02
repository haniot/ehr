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
            activity.family_mutual_aid_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_mutual_aid_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: almost_never,' +
                    ' rarely, sometimes, often, almost_always.')
            } finally {
                activity.family_mutual_aid_freq = undefined
            }
        })

        it('should throw an error for does pass invalid friendship_approval_freq', () => {
            activity.friendship_approval_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for friendship_approval_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            } finally {
                activity.friendship_approval_freq = undefined
            }
        })

        it('should throw an error for does pass invalid family_only_task_freq', () => {
            activity.family_only_task_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_only_task_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            } finally {
                activity.family_only_task_freq = undefined
            }
        })

        it('should throw an error for does pass invalid family_only_preference_freq', () => {
            activity.family_only_preference_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_only_preference_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            } finally {
                activity.family_only_preference_freq = undefined
            }
        })

        it('should throw an error for does pass invalid free_time_together_freq', () => {
            activity.free_time_together_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for free_time_together_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }finally {
                activity.free_time_together_freq = undefined
            }
        })
        it('should throw an error for does pass invalid family_proximity_perception_freq', () => {
            activity.family_proximity_perception_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_proximity_perception_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }finally {
                activity.family_proximity_perception_freq = undefined
            }
        })
        it('should throw an error for does pass invalid all_family_tasks_freq', () => {
            activity.all_family_tasks_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for all_family_tasks_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }finally {
                activity.all_family_tasks_freq = undefined
            }
        })
        it('should throw an error for does pass invalid family_tasks_opportunity_freq', () => {
            activity.family_tasks_opportunity_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_tasks_opportunity_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }finally {
                activity.family_tasks_opportunity_freq = undefined
            }
        })
        it('should throw an error for does pass invalid family_decision_support_freq', () => {
            activity.family_decision_support_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_decision_support_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }finally {
                activity.family_decision_support_freq = undefined
            }
        })
        it('should throw an error for does pass invalid family_union_relevance_freq', () => {
            activity.family_union_relevance_freq = 'invalid'
            try {
                UpdateFamilyCohesionRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_union_relevance_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: ' +
                    'almost_never, rarely, sometimes, often, almost_always.')
            }finally {
                activity.family_union_relevance_freq = undefined
            }
        })
    })
})
