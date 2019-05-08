import {FamilyCohesionRecordRepoModel} from '../../../src/infrastructure/database/schema/family.cohesion.record.schema'
import {FamilyCohesionRecordRepository} from '../../../src/infrastructure/repository/family.cohesion.record.repository'
import {EntityMapperMock} from '../../mocks/models/entity.mapper.mock'
import {CustomLoggerMock} from '../../mocks/custom.logger.mock'
import {FamilyCohesionRecord} from '../../../src/application/domain/model/family.cohesion.record'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
require('sinon-mongoose')
import sinon from 'sinon'
import {assert} from 'chai'

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

})
