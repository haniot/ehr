import { SleepHabitEntityMapper } from '../../../src/infrastructure/entity/mapper/sleep.habit.entity.mapper'
import { SleepHabitEntity } from '../../../src/infrastructure/entity/sleep.habit.entity'
import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'

describe('Mappers: SleepHabitEntityMapper', () => {
    const mapper = new SleepHabitEntityMapper()
    const model: SleepHabit = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.SLEEP_HABIT)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', DefaultEntityMock.SLEEP_HABIT.id)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', DefaultEntityMock.SLEEP_HABIT.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.SLEEP_HABIT.patient_id)
                assert.property(result, 'created_at')
                assert.property(result, 'week_day_sleep')
                assert.propertyVal(result, 'week_day_sleep', DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
                assert.property(result, 'week_day_wake_up')
                assert.propertyVal(result, 'week_day_wake_up', DefaultEntityMock.SLEEP_HABIT.week_day_wake_up)
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'sleep_habit')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'week_day_sleep')
                assert.propertyVal(result, 'week_day_sleep', undefined)
                assert.property(result, 'week_day_wake_up')
                assert.propertyVal(result, 'week_day_wake_up', undefined)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'sleep_habit')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'week_day_sleep')
                assert.propertyVal(result, 'week_day_sleep', undefined)
                assert.property(result, 'week_day_wake_up')
                assert.propertyVal(result, 'week_day_wake_up', undefined)
            })

        })

        context('when the parameter is a model', () => {
            it('should call the modelToModelEntity() method', () => {
                const result = mapper.transform(model)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.SLEEP_HABIT.patient_id)
                assert.property(result, 'created_at')
                assert.property(result, 'week_day_sleep')
                assert.propertyVal(result, 'week_day_sleep', DefaultEntityMock.SLEEP_HABIT.week_day_sleep)
                assert.property(result, 'week_day_wake_up')
                assert.propertyVal(result, 'week_day_wake_up', DefaultEntityMock.SLEEP_HABIT.week_day_wake_up)
            })

            it('should return a model entity without parameters for empty model', () => {
                const anotherModel: SleepHabit = new SleepHabit()
                anotherModel.type = undefined
                const result = mapper.transform(anotherModel)
                assert.isEmpty(result)
            })
        })
    })

    describe('modelEntityToModel()', () => {
        context('when try to use modelEntityToModel() function', () => {
            it('should throw an error', () => {
                try {
                    mapper.modelEntityToModel(new SleepHabitEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.property(err, 'message', 'Not implemented!')
                }
            })
        })
    })
})
