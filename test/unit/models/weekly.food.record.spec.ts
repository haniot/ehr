import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { WeeklyFoodRecord } from '../../../src/application/domain/model/weekly.food.record'

describe('Models: WeeklyFoodRecord', () => {
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)
                assert.equal(result.food, DefaultEntityMock.WEEKLY_FOOD_RECORD.food)
                assert.equal(result.seven_days_freq, DefaultEntityMock.WEEKLY_FOOD_RECORD.seven_days_freq)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new WeeklyFoodRecord().fromJSON(undefined)
                assert.equal(result.food, undefined)
                assert.equal(result.seven_days_freq, undefined)

            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new WeeklyFoodRecord().fromJSON({})
                assert.equal(result.food, undefined)
                assert.equal(result.seven_days_freq, undefined)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new WeeklyFoodRecord().fromJSON(JSON.stringify(DefaultEntityMock.WEEKLY_FOOD_RECORD))
                assert.equal(result.food, DefaultEntityMock.WEEKLY_FOOD_RECORD.food)
                assert.equal(result.seven_days_freq, DefaultEntityMock.WEEKLY_FOOD_RECORD.seven_days_freq)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new WeeklyFoodRecord().fromJSON('')
                assert.equal(result.food, undefined)
                assert.equal(result.seven_days_freq, undefined)
            })
        })

        context('when pass the parameters', () => {
            it('should return the object with set food', () => {
                const result = new WeeklyFoodRecord().fromJSON({
                    food: DefaultEntityMock.WEEKLY_FOOD_RECORD.food
                })
                assert.equal(result.food, DefaultEntityMock.WEEKLY_FOOD_RECORD.food)
                assert.equal(result.seven_days_freq, undefined)
            })

            it('should return the object with set seven_days_freq', () => {
                const result = new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)
                assert.equal(result.food, DefaultEntityMock.WEEKLY_FOOD_RECORD.food)
                assert.equal(result.seven_days_freq, DefaultEntityMock.WEEKLY_FOOD_RECORD.seven_days_freq)
            })
        })
    })
})
