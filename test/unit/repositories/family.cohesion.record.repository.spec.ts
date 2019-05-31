import {FamilyCohesionRecordRepoModel} from '../../../src/infrastructure/database/schema/family.cohesion.record.schema'
import {FamilyCohesionRecordRepository} from '../../../src/infrastructure/repository/family.cohesion.record.repository'
import {EntityMapperMock} from '../../mocks/models/entity.mapper.mock'
import {CustomLoggerMock} from '../../mocks/custom.logger.mock'
import {FamilyCohesionRecord} from '../../../src/application/domain/model/family.cohesion.record'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
require('sinon-mongoose')
import sinon from 'sinon'
import {assert} from 'chai'
import {Query} from '../../../src/infrastructure/repository/query/query'

describe('Repositories: FamilyCohesionRecordRepository', () => {

    const modelFake: any = FamilyCohesionRecordRepoModel
    const repo = new FamilyCohesionRecordRepository(modelFake, new EntityMapperMock(), new CustomLoggerMock())
    const activity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)

    afterEach(() => {
        sinon.restore()
    })

    describe('create()', () => {
        context('when save a new family cohesion record record', () => {
            it('should return the saved family cohesion record', () => {
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
                        assert.property(result, 'family_mutual_aid_freq')
                        assert.propertyVal(result, 'family_mutual_aid_freq', activity.family_mutual_aid_freq)
                        assert.property(result, 'friendship_approval_freq')
                        assert.propertyVal(result, 'friendship_approval_freq', activity.friendship_approval_freq)
                        assert.property(result, 'family_only_task_freq')
                        assert.propertyVal(result, 'family_only_task_freq', activity.family_only_task_freq)
                        assert.property(result, 'family_only_preference_freq')
                        assert.propertyVal(result, 'family_only_preference_freq', activity.family_only_preference_freq)
                        assert.property(result, 'free_time_together_freq')
                        assert.propertyVal(result, 'free_time_together_freq', activity.free_time_together_freq)
                        assert.property(result, 'family_proximity_perception_freq')
                        assert.propertyVal(result, 'family_proximity_perception_freq', activity.family_proximity_perception_freq)
                        assert.property(result, 'all_family_tasks_freq')
                        assert.propertyVal(result, 'all_family_tasks_freq', activity.all_family_tasks_freq)
                        assert.property(result, 'family_tasks_opportunity_freq')
                        assert.propertyVal(result, 'family_tasks_opportunity_freq', activity.family_tasks_opportunity_freq)
                        assert.property(result, 'family_decision_support_freq')
                        assert.propertyVal(result, 'family_decision_support_freq', activity.family_decision_support_freq)
                        assert.property(result, 'family_union_relevance_freq')
                        assert.propertyVal(result, 'family_union_relevance_freq', activity.family_union_relevance_freq)
                        assert.property(result, 'family_cohesion_result')
                        assert.propertyVal(result, 'family_cohesion_result', activity.family_cohesion_result)
                    })
            })
        })

        context('when the family cohesion record is not saved', () => {
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
        context('when get all family cohesion records', () => {
            it('should return a list of family cohesion records', () => {
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
                        assert.property(result[0], 'family_mutual_aid_freq')
                        assert.propertyVal(result[0], 'family_mutual_aid_freq', activity.family_mutual_aid_freq)
                        assert.property(result[0], 'friendship_approval_freq')
                        assert.propertyVal(result[0], 'friendship_approval_freq', activity.friendship_approval_freq)
                        assert.property(result[0], 'family_only_task_freq')
                        assert.propertyVal(result[0], 'family_only_task_freq', activity.family_only_task_freq)
                        assert.property(result[0], 'family_only_preference_freq')
                        assert.propertyVal(result[0], 'family_only_preference_freq', activity.family_only_preference_freq)
                        assert.property(result[0], 'free_time_together_freq')
                        assert.propertyVal(result[0], 'free_time_together_freq', activity.free_time_together_freq)
                        assert.property(result[0], 'family_proximity_perception_freq')
                        assert.propertyVal(result[0], 'family_proximity_perception_freq',
                            activity.family_proximity_perception_freq)
                        assert.property(result[0], 'all_family_tasks_freq')
                        assert.propertyVal(result[0], 'all_family_tasks_freq', activity.all_family_tasks_freq)
                        assert.property(result[0], 'family_tasks_opportunity_freq')
                        assert.propertyVal(result[0], 'family_tasks_opportunity_freq', activity.family_tasks_opportunity_freq)
                        assert.property(result[0], 'family_decision_support_freq')
                        assert.propertyVal(result[0], 'family_decision_support_freq', activity.family_decision_support_freq)
                        assert.property(result[0], 'family_union_relevance_freq')
                        assert.propertyVal(result[0], 'family_union_relevance_freq', activity.family_union_relevance_freq)
                        assert.property(result[0], 'family_cohesion_result')
                        assert.propertyVal(result[0], 'family_cohesion_result', activity.family_cohesion_result)
                    })
            })
        })

        context('when there are no family cohesion record', () => {
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
        context('when get a unique family cohesion record', () => {
            it('should return a unique family cohesion record', () => {

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
                        assert.property(result, 'family_mutual_aid_freq')
                        assert.propertyVal(result, 'family_mutual_aid_freq', activity.family_mutual_aid_freq)
                        assert.property(result, 'friendship_approval_freq')
                        assert.propertyVal(result, 'friendship_approval_freq', activity.friendship_approval_freq)
                        assert.property(result, 'family_only_task_freq')
                        assert.propertyVal(result, 'family_only_task_freq', activity.family_only_task_freq)
                        assert.property(result, 'family_only_preference_freq')
                        assert.propertyVal(result, 'family_only_preference_freq', activity.family_only_preference_freq)
                        assert.property(result, 'free_time_together_freq')
                        assert.propertyVal(result, 'free_time_together_freq', activity.free_time_together_freq)
                        assert.property(result, 'family_proximity_perception_freq')
                        assert.propertyVal(result, 'family_proximity_perception_freq', activity.family_proximity_perception_freq)
                        assert.property(result, 'all_family_tasks_freq')
                        assert.propertyVal(result, 'all_family_tasks_freq', activity.all_family_tasks_freq)
                        assert.property(result, 'family_tasks_opportunity_freq')
                        assert.propertyVal(result, 'family_tasks_opportunity_freq', activity.family_tasks_opportunity_freq)
                        assert.property(result, 'family_decision_support_freq')
                        assert.propertyVal(result, 'family_decision_support_freq', activity.family_decision_support_freq)
                        assert.property(result, 'family_union_relevance_freq')
                        assert.propertyVal(result, 'family_union_relevance_freq', activity.family_union_relevance_freq)
                        assert.property(result, 'family_cohesion_result')
                        assert.propertyVal(result, 'family_cohesion_result', activity.family_cohesion_result)

                    })
            })
        })

        context('when the family cohesion record is not found', () => {
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
        context('when update a family cohesion record', () => {
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
                        assert.property(result, 'family_mutual_aid_freq')
                        assert.propertyVal(result, 'family_mutual_aid_freq', activity.family_mutual_aid_freq)
                        assert.property(result, 'friendship_approval_freq')
                        assert.propertyVal(result, 'friendship_approval_freq', activity.friendship_approval_freq)
                        assert.property(result, 'family_only_task_freq')
                        assert.propertyVal(result, 'family_only_task_freq', activity.family_only_task_freq)
                        assert.property(result, 'family_only_preference_freq')
                        assert.propertyVal(result, 'family_only_preference_freq', activity.family_only_preference_freq)
                        assert.property(result, 'free_time_together_freq')
                        assert.propertyVal(result, 'free_time_together_freq', activity.free_time_together_freq)
                        assert.property(result, 'family_proximity_perception_freq')
                        assert.propertyVal(result, 'family_proximity_perception_freq', activity.family_proximity_perception_freq)
                        assert.property(result, 'all_family_tasks_freq')
                        assert.propertyVal(result, 'all_family_tasks_freq', activity.all_family_tasks_freq)
                        assert.property(result, 'family_tasks_opportunity_freq')
                        assert.propertyVal(result, 'family_tasks_opportunity_freq', activity.family_tasks_opportunity_freq)
                        assert.property(result, 'family_decision_support_freq')
                        assert.propertyVal(result, 'family_decision_support_freq', activity.family_decision_support_freq)
                        assert.property(result, 'family_union_relevance_freq')
                        assert.propertyVal(result, 'family_union_relevance_freq', activity.family_union_relevance_freq)
                        assert.property(result, 'family_cohesion_result')
                        assert.propertyVal(result, 'family_cohesion_result', activity.family_cohesion_result)
                    })
            })
        })
        context('when the family cohesion record is not found', () => {
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
        context('when want delete family cohesion record', () => {
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

        context('when the family cohesion record is not found', () => {
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

})
