import { FeedingHabitsRecordEntityMapper } from '../../../src/infrastructure/entity/mapper/feeding.habits.record.entity.mapper'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { FeedingHabitsRecordEntity } from '../../../src/infrastructure/entity/feeding.habits.record.entity'
import { assert } from 'chai'

describe('Mappers: FeedingHabitsRecordEntityMapper', () => {
    const mapper = new FeedingHabitsRecordEntityMapper()
    const model: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)
    model.id = DefaultEntityMock.FEEDING_HABITS_RECORD.id

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.FEEDING_HABITS_RECORD)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', result.id)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', result.patient_id)
                assert.property(result, 'created_at')
                assert.property(result, 'daily_water_glasses')
                assert.propertyVal(result, 'daily_water_glasses', result.daily_water_glasses)
                assert.property(result, 'six_month_breast_feeding')
                assert.propertyVal(result, 'six_month_breast_feeding', result.six_month_breast_feeding)
                assert.property(result, 'food_allergy_intolerance')
                assert.deepPropertyVal(result, 'food_allergy_intolerance', result.food_allergy_intolerance)
                assert.property(result, 'breakfast_daily_frequency')
                assert.propertyVal(result, 'breakfast_daily_frequency', result.breakfast_daily_frequency)
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'daily_water_glasses')
                assert.propertyVal(result, 'daily_water_glasses', undefined)
                assert.property(result, 'six_month_breast_feeding')
                assert.propertyVal(result, 'six_month_breast_feeding', undefined)
                assert.property(result, 'food_allergy_intolerance')
                assert.deepPropertyVal(result, 'food_allergy_intolerance', undefined)
                assert.property(result, 'breakfast_daily_frequency')
                assert.propertyVal(result, 'breakfast_daily_frequency', undefined)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'daily_water_glasses')
                assert.propertyVal(result, 'daily_water_glasses', undefined)
                assert.property(result, 'six_month_breast_feeding')
                assert.propertyVal(result, 'six_month_breast_feeding', undefined)
                assert.property(result, 'food_allergy_intolerance')
                assert.deepPropertyVal(result, 'food_allergy_intolerance', undefined)
                assert.property(result, 'breakfast_daily_frequency')
                assert.propertyVal(result, 'breakfast_daily_frequency', undefined)
            })

            it('should return a empty food_allergy_intolerance for does not pass string array as parameter', () => {
                const result = mapper.transform({
                    food_allergy_intolerance: [123]
                })
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'daily_water_glasses')
                assert.propertyVal(result, 'daily_water_glasses', undefined)
                assert.property(result, 'six_month_breast_feeding')
                assert.propertyVal(result, 'six_month_breast_feeding', undefined)
                assert.property(result, 'food_allergy_intolerance')
                assert.deepPropertyVal(result, 'food_allergy_intolerance', [])
                assert.property(result, 'breakfast_daily_frequency')
                assert.propertyVal(result, 'breakfast_daily_frequency', undefined)
            })
        })

        context('when the parameter is a model', () => {
            it('should return a model entity', () => {
                const result =
                    mapper.transform(model)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', result.patient_id)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', result.created_at)
                assert.property(result, 'daily_water_glasses')
                assert.propertyVal(result, 'daily_water_glasses', result.daily_water_glasses)
                assert.property(result, 'six_month_breast_feeding')
                assert.propertyVal(result, 'six_month_breast_feeding', result.six_month_breast_feeding)
                assert.property(result, 'food_allergy_intolerance')
                assert.deepPropertyVal(result, 'food_allergy_intolerance', result.food_allergy_intolerance)
                assert.property(result, 'breakfast_daily_frequency')
                assert.propertyVal(result, 'breakfast_daily_frequency', result.breakfast_daily_frequency)
            })

            it('should return a model entity without parameters for empty model', () => {
                const anotherModel: FeedingHabitsRecord = new FeedingHabitsRecord()
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
                    mapper.modelEntityToModel(new FeedingHabitsRecordEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.property(err, 'message', 'Not implemented!')
                }
            })
        })
    })
})
