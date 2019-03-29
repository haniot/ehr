import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { DefaultEntityMock } from '../../mocks/default.entity.mock'
import { CreatePhysicalActivityHabitsValidator } from '../../../src/application/domain/validator/create.physical.activity.habits.validator'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'

describe('Validators: CreatePhysicalActivityHabitsValidator', () => {
    const activity: PhysicalActivityHabits =
        new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)

    it('should return undefined when the validation is successful', () => {
        const result = CreatePhysicalActivityHabitsValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does not pass patient_id', () => {
            try {
                activity.patient_id = undefined
                CreatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Activity Habits Record validation: patient_id is required!')
            }
        })

        it('should throw an error for does pass invalid patient_id', () => {
            try {
                activity.patient_id = '123'
                CreatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.patient_id = DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id
            }
        })

        it('should throw an error for does not pass school_activity_freq ', () => {
            try {
                activity.school_activity_freq = undefined
                CreatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
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
                assert.property(err, 'message')
                assert.property(err, 'description')
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
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Physical Activity Habits validation: weekly_activities is ' +
                    'required!')
            }
        })
    })

})
