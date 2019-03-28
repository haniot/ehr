import sinon from 'sinon'
import { assert } from 'chai'
import { EntityMapperMock } from '../../mocks/entity.mapper.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import { DefaultEntityMock } from '../../mocks/default.entity.mock'
import { Query } from '../../../src/infrastructure/repository/query/query'
import { FeedingHabitsRecordRepository } from '../../../src/infrastructure/repository/feeding.habits.record.repository'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { ActivityHabitsRepoModel } from '../../../src/infrastructure/database/schema/activity.habits.schema'

require('sinon-mongoose')

describe('Repositories: FeedingHabitsRecordRepository', () => {
    const modelFake: any = ActivityHabitsRepoModel
    const repo =
        new FeedingHabitsRecordRepository(modelFake, new EntityMapperMock(), new CustomLoggerMock())
    const activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)

    afterEach(() => {
        sinon.restore()
    })

    describe('create()', () => {
        context('when save a new feeding habits record', () => {
            it('should return the saved feeding habits record', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .resolves(activity)

                return repo.create(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'created_at')
                        assert.propertyVal(result, 'created_at', activity.created_at)
                        assert.property(result, 'weekly_feeding_habits')
                        assert.propertyVal(result, 'weekly_feeding_habits', activity.weekly_feeding_habits)
                        assert.property(result, 'daily_water_glasses')
                        assert.propertyVal(result, 'daily_water_glasses', activity.daily_water_glasses)
                        assert.property(result, 'six_month_breast_feeding')
                        assert.propertyVal(result, 'six_month_breast_feeding', activity.six_month_breast_feeding)
                        assert.property(result, 'food_allergy_intolerance')
                        assert.propertyVal(result, 'food_allergy_intolerance', activity.food_allergy_intolerance)
                        assert.property(result, 'breakfast_daily_frequency')
                        assert.propertyVal(result, 'breakfast_daily_frequency', activity.breakfast_daily_frequency)
                    })
            })
        })

        context('when the feeding habits record is not saved', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .resolves(undefined)

                return repo.create(activity)
                    .then(result => {
                        assert.equal(result, undefined)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.create(activity)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('find()', () => {
        context('when get all feeding habits records', () => {
            it('should return a list of feeding habits records', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('select')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .resolves([activity])

                return repo.find(new Query())
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 1)
                        assert.property(result[0], 'id')
                        assert.propertyVal(result[0], 'id', activity.id)
                        assert.property(result[0], 'created_at')
                        assert.propertyVal(result[0], 'created_at', activity.created_at)
                        assert.property(result[0], 'weekly_feeding_habits')
                        assert.propertyVal(result[0], 'weekly_feeding_habits', activity.weekly_feeding_habits)
                        assert.property(result[0], 'daily_water_glasses')
                        assert.propertyVal(result[0], 'daily_water_glasses', activity.daily_water_glasses)
                        assert.property(result[0], 'six_month_breast_feeding')
                        assert.propertyVal(result[0], 'six_month_breast_feeding', activity.six_month_breast_feeding)
                        assert.property(result[0], 'food_allergy_intolerance')
                        assert.propertyVal(result[0], 'food_allergy_intolerance', activity.food_allergy_intolerance)
                        assert.property(result[0], 'breakfast_daily_frequency')
                        assert.propertyVal(result[0], 'breakfast_daily_frequency', activity.breakfast_daily_frequency)
                    })
            })
        })

        context('when there are no feeding habits records', () => {
            it('should return empty array', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('select')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .resolves([])

                return repo.find(new Query())
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 0)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('select')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.find(new Query())
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('findOne()', () => {
        context('when get a unique feeding habits record', () => {
            it('should return a unique feeding habits record', () => {

                const query = new Query()
                query.addFilter({ _id: activity.id })

                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('select')
                    .chain('exec')
                    .resolves(activity)

                return repo.findOne(query)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'created_at')
                        assert.propertyVal(result, 'created_at', activity.created_at)
                        assert.property(result, 'weekly_feeding_habits')
                        assert.propertyVal(result, 'weekly_feeding_habits', activity.weekly_feeding_habits)
                        assert.property(result, 'daily_water_glasses')
                        assert.propertyVal(result, 'daily_water_glasses', activity.daily_water_glasses)
                        assert.property(result, 'six_month_breast_feeding')
                        assert.propertyVal(result, 'six_month_breast_feeding', activity.six_month_breast_feeding)
                        assert.property(result, 'food_allergy_intolerance')
                        assert.propertyVal(result, 'food_allergy_intolerance', activity.food_allergy_intolerance)
                        assert.property(result, 'breakfast_daily_frequency')
                        assert.propertyVal(result, 'breakfast_daily_frequency', activity.breakfast_daily_frequency)
                    })
            })
        })

        context('when the feeding habits record is not found', () => {
            it('should return undefined', () => {
                const query = new Query()
                query.addFilter({ _id: activity.id })

                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('select')
                    .chain('exec')
                    .resolves(undefined)

                return repo.findOne(query)
                    .then(result => {
                        assert.equal(result, undefined)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                const query = new Query()
                query.addFilter({ _id: activity.id })

                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('select')
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.findOne(query)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('update()', () => {
        context('when update a feeding habits record', () => {
            it('should return the updated feeding habits record', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .resolves(activity)

                return repo.update(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'created_at')
                        assert.propertyVal(result, 'created_at', activity.created_at)
                        assert.property(result, 'weekly_feeding_habits')
                        assert.propertyVal(result, 'weekly_feeding_habits', activity.weekly_feeding_habits)
                        assert.property(result, 'daily_water_glasses')
                        assert.propertyVal(result, 'daily_water_glasses', activity.daily_water_glasses)
                        assert.property(result, 'six_month_breast_feeding')
                        assert.propertyVal(result, 'six_month_breast_feeding', activity.six_month_breast_feeding)
                        assert.property(result, 'food_allergy_intolerance')
                        assert.propertyVal(result, 'food_allergy_intolerance', activity.food_allergy_intolerance)
                        assert.property(result, 'breakfast_daily_frequency')
                        assert.propertyVal(result, 'breakfast_daily_frequency', activity.breakfast_daily_frequency)
                    })
            })
        })
        context('when the feeding habits record is not found', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .resolves(undefined)

                return repo.update(activity)
                    .then(result => {
                        assert.equal(result, undefined)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.update(activity)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('delete()', () => {
        context('when want delete feeding habits record', () => {
            it('should return true', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .resolves(true)

                return repo.delete(activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when the feeding habits record is not found', () => {
            it('should return false', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .resolves(false)

                return repo.delete(activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isFalse(result)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.delete(activity.id!)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('count()', () => {
        context('when count all feeding habits records by a filter', () => {
            it('should return the number of feeding habits records', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .resolves(1)

                return repo.count(new Query())
                    .then(result => {
                        assert.isNumber(result)
                        assert.equal(result, 1)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.count(new Query())
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })
})
