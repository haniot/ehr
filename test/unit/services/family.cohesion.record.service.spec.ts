import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {FamilyCohesionRecord} from '../../../src/application/domain/model/family.cohesion.record'
import {IFamilyCohesionRecordService} from '../../../src/application/port/family.cohesion.record.service.interface'
import {FamilyCohesionRecordService} from '../../../src/application/service/family.cohesion.record.service'
import {FamilyCohesionRecordRepositoryMock} from '../../mocks/repositories/family.cohesion.record.repository.mock'
import {assert} from 'chai'
import {Query} from '../../../src/infrastructure/repository/query/query'

describe('Services: FamilyCohesionRecord', () => {
    const activity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)
    activity.id = DefaultEntityMock.FAMILY_COHESION_RECORD.id
    const service: IFamilyCohesionRecordService = new FamilyCohesionRecordService(
        new FamilyCohesionRecordRepositoryMock() )

    describe('add()', () => {
        context('when save a new family cohesion record', () => {
            it('should return the saved family cohesion record', () => {
                return service
                    .add(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'patient_id')
                        assert.propertyVal(result, 'patient_id', activity.patient_id)
                        assert.property(result, 'created_at')
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

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .add(new FamilyCohesionRecord().fromJSON({ patient_id: activity.patient_id }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Family Cohesion Record validation: family_mutual_aid_freq,' +
                            ' friendship_approval_freq, family_only_task_freq, family_only_preference_freq, ' +
                            'free_time_together_freq, family_proximity_perception_freq, all_family_tasks_freq, ' +
                            'family_tasks_opportunity_freq, family_decision_support_freq, family_union_relevance_freq,' +
                            ' family_cohesion_result is required!')
                    })
            })
        })

    })

    describe('getAll()', () => {
        context('when get all family cohesion record', () => {
            it('should return a list of family cohesion record', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getAll(query)
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 1)
                        assert.property(result[0], 'id')
                        assert.propertyVal(result[0], 'id', activity.id)
                        assert.property(result[0], 'type')
                        assert.propertyVal(result[0], 'type', activity.type)
                        assert.property(result[0], 'patient_id')
                        assert.propertyVal(result[0], 'patient_id', activity.patient_id)
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

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: '123' })
                return service
                    .getAll(query)
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('getById()', () => {
        context('when get a unique family cohesion record', () => {
            it('should return a family cohesion record', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getById(activity.id!, query)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'patient_id')
                        assert.propertyVal(result, 'patient_id', activity.patient_id)
                        assert.property(result, 'created_at')
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

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: '123' })
                return service
                    .getById(activity.id!, query)
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })
    describe('removeFamilyCohesionRecord()', () => {
        context('when delete a family cohesion record', () => {
            it('should return true', () => {
                return service
                    .removeFamilyCohesionRecord(activity.patient_id!, activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .removeFamilyCohesionRecord('123', '321')
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('update()', () => {
        context('when update a family cohesion record', () => {
            it('should return the updated family cohesion record', () => {
                activity.created_at = undefined
                return service
                    .update(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'patient_id')
                        assert.property(result, 'created_at')
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

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                activity.patient_id = '123'
                return service
                    .update(activity)
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('remove()', () => {
        it('should throw an error for does not implemented', () => {
            return service
                .remove(activity.id!)
                .catch(err => {
                    assert.property(err, 'message')
                    assert.propertyVal(err, 'message', 'Not implemented yet!')
                })
        })
    })


})
