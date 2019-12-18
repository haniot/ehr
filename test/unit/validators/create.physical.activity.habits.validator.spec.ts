import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { CreatePhysicalActivityHabitsValidator } from '../../../src/application/domain/validator/create.physical.activity.habits.validator'
import { assert } from 'chai'
import { SchoolActivityFrequencyTypes } from '../../../src/application/domain/utils/school.activity.frequency.types'

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
            const wrongActivity: PhysicalActivityHabits =
                new PhysicalActivityHabits().fromJSON({
                    school_activity_freq: 'invalid',
                    weekly_activities: ['run', 'swin']
                })
            try {
                CreatePhysicalActivityHabitsValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for school_activity_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: one_per_week, two_per_week,' +
                    ' three_per_week, four_more_per_week, none.')
            }
        })

        it('should throw an error for does not pass weekly_activities ', () => {
            try {
                activity.school_activity_freq = SchoolActivityFrequencyTypes.FOUR_MORE_PER_WEEK
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
