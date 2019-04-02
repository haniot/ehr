import { PhysicalActivityHabitsEntityMapper } from '../../../src/infrastructure/entity/mapper/physical.activity.habits.entity.mapper'
import { PhysicalActivityHabitsEntity } from '../../../src/infrastructure/entity/physical.activity.habits.entity'
import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'

describe('Mappers: PhysicalActivityHabitsEntityMapper', () => {
    const mapper = new PhysicalActivityHabitsEntityMapper()
    const model: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.id)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at)
                assert.property(result, 'school_activity_freq')
                assert.propertyVal(result, 'school_activity_freq',
                    DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.property(result, 'weekly_activities')
                assert.deepPropertyVal(result, 'weekly_activities', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'physical_activity_habits')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'school_activity_freq')
                assert.propertyVal(result, 'school_activity_freq', undefined)
                assert.property(result, 'weekly_activities')
                assert.deepPropertyVal(result, 'weekly_activities', undefined)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'physical_activity_habits')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'school_activity_freq')
                assert.propertyVal(result, 'school_activity_freq', undefined)
                assert.property(result, 'weekly_activities')
                assert.deepPropertyVal(result, 'weekly_activities', undefined)
            })

            it('should return a empty food_allergy_intolerance for does not pass string array as parameter', () => {
                const result = mapper.transform({
                    weekly_activities: [123]
                })

                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'physical_activity_habits')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'school_activity_freq')
                assert.propertyVal(result, 'school_activity_freq', undefined)
                assert.property(result, 'weekly_activities')
                assert.deepPropertyVal(result, 'weekly_activities', [])
            })
        })

        context('when the parameter is a model', () => {
            it('should call the modelToModelEntity() method', () => {
                const result = mapper.transform(model)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at)
                assert.property(result, 'school_activity_freq')
                assert.propertyVal(result, 'school_activity_freq',
                    DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.property(result, 'weekly_activities')
                assert.deepPropertyVal(result, 'weekly_activities', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
            })

            it('should return a model entity without parameters for empty model', () => {
                const anotherModel: PhysicalActivityHabits = new PhysicalActivityHabits()
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
                    mapper.modelEntityToModel(new PhysicalActivityHabitsEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.property(err, 'message', 'Not implemented!')
                }
            })
        })
    })
})
