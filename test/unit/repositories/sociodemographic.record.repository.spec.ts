import {ActivityHabitsRepoModel} from '../../../src/infrastructure/database/schema/activity.habits.schema'

require('sinon-mongoose')
import sinon from 'sinon'
import { assert } from 'chai'
import {SociodemographicRecordRepository} from '../../../src/infrastructure/repository/sociodemographic.record.repository'
import {EntityMapperMock} from '../../mocks/models/entity.mapper.mock'
import {CustomLoggerMock} from '../../mocks/custom.logger.mock'
import {SociodemographicRecord} from '../../../src/application/domain/model/sociodemographic.record'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {Query} from '../../../src/infrastructure/repository/query/query'

describe('Repositories: SociodemographicRecord', () =>{
    const modelFake: any = ActivityHabitsRepoModel
    const repo = new SociodemographicRecordRepository(modelFake, new EntityMapperMock(), new CustomLoggerMock())
    const activity: SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)

    afterEach(() => {
        sinon.restore()
    })

    describe('create()', () => {
        context('when save a new sociodemographic record', () => {
            it('should return the saved sociodemographic record', () => {
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
                        assert.property(result, 'color_race')
                        assert.propertyVal(result, 'color_race', activity.color_race)
                        assert.property(result, 'mother_scholarity')
                        assert.propertyVal(result, 'mother_scholarity', activity.mother_scholarity)
                        assert.property(result, 'people_in_home')
                        assert.propertyVal(result, 'people_in_home', activity.people_in_home)
                    })
            })
        })

        context('when the sociodemographic record is not saved', () => {
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
        context('when get all sociodemographic record', () => {
            it('should return a list of sociographic record', () => {
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
                        assert.property(result[0], 'color_race')
                        assert.propertyVal(result[0], 'color_race', activity.color_race)
                        assert.property(result[0], 'mother_scholarity')
                        assert.propertyVal(result[0], 'mother_scholarity', activity.mother_scholarity)
                        assert.property(result[0], 'people_in_home')
                        assert.propertyVal(result[0], 'people_in_home', activity.people_in_home)
                    })
            })
        })

        context('when there are no socidemographic record', () => {
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
        context('when get a unique sociodemographic record', () => {
            it('should return a unique sociodemographic record', () => {

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
                        assert.property(result, 'color_race')
                        assert.propertyVal(result, 'color_race', activity.color_race)
                        assert.property(result, 'mother_scholarity')
                        assert.propertyVal(result, 'mother_scholarity', activity.mother_scholarity)
                        assert.property(result, 'people_in_home')
                        assert.propertyVal(result, 'people_in_home', activity.people_in_home)
                    })
            })
        })

        context('when the sociodemographic record is not found', () => {
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
        context('when update a sociodemographic record', () => {
            it('should return the updated sociodemographic record', () => {
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
                        assert.property(result, 'color_race')
                        assert.propertyVal(result, 'color_race', activity.color_race)
                        assert.property(result, 'mother_scholarity')
                        assert.propertyVal(result, 'mother_scholarity', activity.mother_scholarity)
                        assert.property(result, 'people_in_home')
                        assert.propertyVal(result, 'people_in_home', activity.people_in_home)
                    })
            })
        })
        context('when the sociodemographic record is not found', () => {
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
        context('when want delete sociodemographic record', () => {
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

        context('when the sociodemographic record is not found', () => {
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
        context('when count all sociodemographic record by a filter', () => {
            it('should return the number of sociodemographic record', () => {
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
