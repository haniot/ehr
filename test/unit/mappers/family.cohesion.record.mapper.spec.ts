import {FamilyCohesionRecord} from '../../../src/application/domain/model/family.cohesion.record'
import {FamilyCohesionRecordEntityMapper} from '../../../src/infrastructure/entity/mapper/family.cohesion.record.entity.mapper'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {FamilyCohesionRecordEntity} from '../../../src/infrastructure/entity/family.cohesion.record.entity'

describe('Mappers: FamilyCohesionRecord', () => {
    const mapper = new FamilyCohesionRecordEntityMapper()
    const model: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.FAMILY_COHESION_RECORD)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', DefaultEntityMock.FAMILY_COHESION_RECORD.id)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.FAMILY_COHESION_RECORD.patient_id)
                assert.property(result, 'created_at')
                assert.property(result, 'all_family_tasks_freq')
                assert.propertyVal(result, 'all_family_tasks_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
                assert.property(result, 'family_cohesion_result')
                assert.propertyVal(result, 'family_cohesion_result',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
                assert.property(result, 'family_decision_support_freq')
                assert.propertyVal(result, 'family_decision_support_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
                assert.property(result, 'family_mutual_aid_freq')
                assert.propertyVal(result, 'family_mutual_aid_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
                assert.property(result, 'family_only_preference_freq')
                assert.propertyVal(result, 'family_only_preference_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
                assert.property(result, 'family_only_task_freq')
                assert.propertyVal(result, 'family_only_task_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq)
                assert.property(result, 'family_proximity_perception_freq')
                assert.propertyVal(result, 'family_proximity_perception_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
                assert.property(result, 'family_tasks_opportunity_freq')
                assert.propertyVal(result, 'family_tasks_opportunity_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
                assert.property(result, 'family_union_relevance_freq')
                assert.propertyVal(result, 'family_union_relevance_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
                assert.property(result, 'free_time_together_freq')
                assert.propertyVal(result, 'free_time_together_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
                assert.property(result, 'friendship_approval_freq')
                assert.propertyVal(result, 'friendship_approval_freq',
                    DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)

            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.property(result, 'all_family_tasks_freq')
                assert.propertyVal(result, 'all_family_tasks_freq',
                    undefined)
                assert.property(result, 'family_cohesion_result')
                assert.propertyVal(result, 'family_cohesion_result',
                    undefined)
                assert.property(result, 'family_decision_support_freq')
                assert.propertyVal(result, 'family_decision_support_freq',
                    undefined)
                assert.property(result, 'family_mutual_aid_freq')
                assert.propertyVal(result, 'family_mutual_aid_freq',
                    undefined)
                assert.property(result, 'family_only_preference_freq')
                assert.propertyVal(result, 'family_only_preference_freq',
                    undefined)
                assert.property(result, 'family_only_task_freq')
                assert.propertyVal(result, 'family_only_task_freq',
                    undefined)
                assert.property(result, 'family_proximity_perception_freq')
                assert.propertyVal(result, 'family_proximity_perception_freq',
                    undefined)
                assert.property(result, 'family_tasks_opportunity_freq')
                assert.propertyVal(result, 'family_tasks_opportunity_freq',
                    undefined)
                assert.property(result, 'family_union_relevance_freq')
                assert.propertyVal(result, 'family_union_relevance_freq',
                    undefined)
                assert.property(result, 'free_time_together_freq')
                assert.propertyVal(result, 'free_time_together_freq',
                    undefined)
                assert.property(result, 'friendship_approval_freq')
                assert.propertyVal(result, 'friendship_approval_freq',
                    undefined)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'all_family_tasks_freq')
                assert.propertyVal(result, 'all_family_tasks_freq',
                    undefined)
                assert.property(result, 'family_cohesion_result')
                assert.propertyVal(result, 'family_cohesion_result',
                    undefined)
                assert.property(result, 'family_decision_support_freq')
                assert.propertyVal(result, 'family_decision_support_freq',
                    undefined)
                assert.property(result, 'family_mutual_aid_freq')
                assert.propertyVal(result, 'family_mutual_aid_freq',
                    undefined)
                assert.property(result, 'family_only_preference_freq')
                assert.propertyVal(result, 'family_only_preference_freq',
                    undefined)
                assert.property(result, 'family_only_task_freq')
                assert.propertyVal(result, 'family_only_task_freq',
                    undefined)
                assert.property(result, 'family_proximity_perception_freq')
                assert.propertyVal(result, 'family_proximity_perception_freq',
                    undefined)
                assert.property(result, 'family_tasks_opportunity_freq')
                assert.propertyVal(result, 'family_tasks_opportunity_freq',
                    undefined)
                assert.property(result, 'family_union_relevance_freq')
                assert.propertyVal(result, 'family_union_relevance_freq',
                    undefined)
                assert.property(result, 'free_time_together_freq')
                assert.propertyVal(result, 'free_time_together_freq',
                    undefined)
                assert.property(result, 'friendship_approval_freq')
                assert.propertyVal(result, 'friendship_approval_freq',
                    undefined)
            })

        })
    })

    context('when the parameter is a model', () => {
        it('should call the modelToModelEntity() method', () => {
            const result = mapper.transform(model)

            assert.property(result, 'patient_id')
            assert.propertyVal(result, 'patient_id', DefaultEntityMock.FAMILY_COHESION_RECORD.patient_id)
            assert.property(result, 'created_at')
            assert.property(result, 'all_family_tasks_freq')
            assert.propertyVal(result, 'all_family_tasks_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
            assert.property(result, 'family_cohesion_result')
            assert.propertyVal(result, 'family_cohesion_result',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
            assert.property(result, 'family_decision_support_freq')
            assert.propertyVal(result, 'family_decision_support_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
            assert.property(result, 'family_mutual_aid_freq')
            assert.propertyVal(result, 'family_mutual_aid_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
            assert.property(result, 'family_only_preference_freq')
            assert.propertyVal(result, 'family_only_preference_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
            assert.property(result, 'family_only_task_freq')
            assert.propertyVal(result, 'family_only_task_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq)
            assert.property(result, 'family_proximity_perception_freq')
            assert.propertyVal(result, 'family_proximity_perception_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
            assert.property(result, 'family_tasks_opportunity_freq')
            assert.propertyVal(result, 'family_tasks_opportunity_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
            assert.property(result, 'family_union_relevance_freq')
            assert.propertyVal(result, 'family_union_relevance_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
            assert.property(result, 'free_time_together_freq')
            assert.propertyVal(result, 'free_time_together_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
            assert.property(result, 'friendship_approval_freq')
            assert.propertyVal(result, 'friendship_approval_freq',
                DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
        })

        it('should return a model entity without parameters for empty model', () => {
            const anotherModel: FamilyCohesionRecord = new FamilyCohesionRecord()
            anotherModel.type = undefined
            const result = mapper.transform(anotherModel)
            assert.isEmpty(result)
        })

        describe('modelEntityToModel()', () => {
            context('when try to use modelEntityToModel() function', () => {
                it('should throw an error', () => {
                    try {
                        mapper.modelEntityToModel(new FamilyCohesionRecordEntity())
                    } catch (err) {
                        assert.property(err, 'message')
                        assert.property(err, 'message', 'Not implemented!')
                    }
                })
            })
        })
    })
})
