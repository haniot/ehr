import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { CreatePhysicalActivityHabitsValidator } from '../../../src/application/domain/validator/create.physical.activity.habits.validator'
import { assert } from 'chai'

describe('Validators: CreatePhysicalActivityHabitsValidator', () => {
    const activity: PhysicalActivityHabits =
        new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)

    it('should return undefined when the validation is successful', () => {
        const result = CreatePhysicalActivityHabitsValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {

        it('should throw an error for does not pass school_activity_freq ', () => {
            try {
                activity.school_activity_freq = undefined
                CreatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Physical Activity Habits validation: school_activity_freq is ' +
                    'required!')
            }
        })

        it('should throw an error for does pass invalid school_activity_freq ', () => {
            try {
                activity.school_activity_freq = 'invalid'
                CreatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for school_activity_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: one_per_week, two_per_week,' +
                    ' three_per_week, four_more_per_week, none.')
            } finally {
                activity.school_activity_freq = DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq
            }
        })

        it('should throw an error for does not pass weekly_activities ', () => {
            try {
                activity.weekly_activities = undefined
                CreatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Physical Activity Habits validation: weekly_activities is ' +
                    'required!')
            }
        })
    })

})
