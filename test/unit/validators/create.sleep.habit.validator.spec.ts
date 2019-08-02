import { assert } from 'chai'
import { CreateSleepHabitValidator } from '../../../src/application/domain/validator/create.sleep.habit.validator'
import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'

describe('Validators: CreateSleepHabitValidator', () => {
    const activity: SleepHabit = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)

    it('should return undefined when the validation is successful', () => {
        const result = CreateSleepHabitValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does not pass week_day_sleep', () => {
            activity.week_day_sleep = undefined
            try {
                CreateSleepHabitValidator.validate(activity)
            } catch (err) {
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
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Sleep Habit validation: week_day_wake_up is required!')
            }
        })
    })
})
