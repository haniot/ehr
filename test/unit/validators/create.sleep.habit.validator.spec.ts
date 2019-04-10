import { assert } from 'chai'
import { CreateSleepHabitValidator } from '../../../src/application/domain/validator/create.sleep.habit.validator'
import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { Strings } from '../../../src/utils/strings'

describe('Validators: CreateSleepHabitValidator', () => {
    const activity: SleepHabit = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)

    it('should return undefined when the validation is successful', () => {
        const result = CreateSleepHabitValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does not pass patient_id', () => {
            activity.patient_id = undefined
            try {
                CreateSleepHabitValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Activity Habits Record validation: patient_id is required!')
            }
        })

        it('should throw an error for does pass invalid patient_id', () => {
            activity.patient_id = '123'
            try {
                CreateSleepHabitValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.patient_id = DefaultEntityMock.SLEEP_HABIT.patient_id
            }
        })

        it('should throw an error for does not pass week_day_sleep', () => {
            activity.week_day_sleep = undefined
            try {
                CreateSleepHabitValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Sleep Habit validation: week_day_sleep is required!')
            } finally {
                activity.week_day_sleep = DefaultEntityMock.SLEEP_HABIT.week_day_sleep
            }
        })

        it('should throw an error for does not pass week_day_wake_up', () => {
            activity.week_day_wake_up = undefined
            try {
                CreateSleepHabitValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Sleep Habit validation: week_day_wake_up is required!')
            }
        })
    })
})
