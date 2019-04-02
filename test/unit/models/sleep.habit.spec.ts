import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'

describe('Models: SleepHabit', () => {
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)
                assert.equal(result.patient_id, DefaultEntityMock.SLEEP_HABIT.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SLEEP_HABIT.created_at)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new SleepHabit().fromJSON(undefined)
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SLEEP_HABIT.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new SleepHabit().fromJSON({})
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SLEEP_HABIT.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new SleepHabit().fromJSON(JSON.stringify(DefaultEntityMock.SLEEP_HABIT))
                assert.equal(result.patient_id, DefaultEntityMock.SLEEP_HABIT.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SLEEP_HABIT.created_at)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new SleepHabit().fromJSON('')
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SLEEP_HABIT.type)
            })
        })

        context('when pass the parameters', () => {
            it('should return the object with set patient_id', () => {
                const result = new SleepHabit().fromJSON({
                    patient_id: DefaultEntityMock.SLEEP_HABIT.patient_id
                })
                assert.equal(result.patient_id, DefaultEntityMock.SLEEP_HABIT.patient_id)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SLEEP_HABIT.type)
            })

            it('should return the object with set created_at', () => {
                const result = new SleepHabit().fromJSON({
                    patient_id: DefaultEntityMock.SLEEP_HABIT.patient_id,
                    created_at: DefaultEntityMock.SLEEP_HABIT.created_at
                })
                assert.equal(result.patient_id, DefaultEntityMock.SLEEP_HABIT.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SLEEP_HABIT.created_at)
                assert.equal(result.type, DefaultEntityMock.SLEEP_HABIT.type)
            })

            it('should return the object with set week_day_sleep', () => {
                const result = new SleepHabit().fromJSON({
                    patient_id: DefaultEntityMock.SLEEP_HABIT.patient_id,
                    created_at: DefaultEntityMock.SLEEP_HABIT.created_at,
                    week_day_sleep: DefaultEntityMock.SLEEP_HABIT.week_day_sleep
                })
                assert.equal(result.patient_id, DefaultEntityMock.SLEEP_HABIT.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SLEEP_HABIT.created_at)
                assert.equal(result.type, DefaultEntityMock.SLEEP_HABIT.type)
                assert.equal(result.week_day_sleep, DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
            })

            it('should return the object with set week_day_wake_up', () => {
                const result = new SleepHabit().fromJSON({
                    patient_id: DefaultEntityMock.SLEEP_HABIT.patient_id,
                    created_at: DefaultEntityMock.SLEEP_HABIT.created_at,
                    week_day_sleep: DefaultEntityMock.SLEEP_HABIT.week_day_sleep,
                    week_day_wake_up: DefaultEntityMock.SLEEP_HABIT.week_day_wake_up
                })
                assert.equal(result.patient_id, DefaultEntityMock.SLEEP_HABIT.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SLEEP_HABIT.created_at)
                assert.equal(result.type, DefaultEntityMock.SLEEP_HABIT.type)
                assert.equal(result.week_day_sleep, DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
                assert.equal(result.week_day_wake_up, DefaultEntityMock.SLEEP_HABIT.week_day_wake_up)
            })
        })
    })

    describe('toJSON()', () => {
        context('when the object contains all parameters set', () => {
            it('should return the object as JSON', () => {
                const activity = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)
                const result = activity.toJSON()
                assert.equal(result.created_at, DefaultEntityMock.SLEEP_HABIT.created_at)
                assert.equal(result.week_day_sleep, DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
                assert.equal(result.week_day_wake_up, DefaultEntityMock.SLEEP_HABIT.week_day_wake_up)
            })
        })

        context('when some parameter is missing', () => {
            it('should return json without created_at', () => {
                const activity = new SleepHabit().fromJSON({
                    patient_id: DefaultEntityMock.SLEEP_HABIT.patient_id,
                    week_day_sleep: DefaultEntityMock.SLEEP_HABIT.week_day_sleep,
                    week_day_wake_up: DefaultEntityMock.SLEEP_HABIT.week_day_wake_up
                })
                const result = activity.toJSON()
                assert.equal(result.created_at, undefined)
                assert.equal(result.week_day_sleep, DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
                assert.equal(result.week_day_wake_up, DefaultEntityMock.SLEEP_HABIT.week_day_wake_up)
            })
        })
    })
})
