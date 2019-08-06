import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'

describe('Models: NutritionalQuestionnaire', () => {

    const data: NutritionalQuestionnaire =
        new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)

    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result: NutritionalQuestionnaire =
                    new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)

                assert.propertyVal(result, 'patient_id', data.patient_id)
                assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
                assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
                assert.deepPropertyVal(result, 'medical_record', data.medical_record)
                assert.propertyVal(result, 'type', data.type)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new NutritionalQuestionnaire().fromJSON(undefined)

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sleep_habit)
                assert.isUndefined(result.feeding_habits_record)
                assert.isUndefined(result.physical_activity_habits)
                assert.isUndefined(result.medical_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new NutritionalQuestionnaire().fromJSON('invalid')

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sleep_habit)
                assert.isUndefined(result.feeding_habits_record)
                assert.isUndefined(result.physical_activity_habits)
                assert.isUndefined(result.medical_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass a invalid string json', () => {
            it('should return a model with undefined parameters', () => {
                const result = new NutritionalQuestionnaire().fromJSON({})

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sleep_habit)
                assert.isUndefined(result.feeding_habits_record)
                assert.isUndefined(result.physical_activity_habits)
                assert.isUndefined(result.medical_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new NutritionalQuestionnaire().fromJSON(
                    JSON.stringify(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE))

                assert.propertyVal(result, 'patient_id', data.patient_id)
                assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
                assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
                assert.deepPropertyVal(result, 'medical_record', data.medical_record)
                assert.propertyVal(result, 'type', data.type)

            })

            it('should return the class without parameters for empty string', () => {
                const result = new NutritionalQuestionnaire().fromJSON('')

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sleep_habit)
                assert.isUndefined(result.feeding_habits_record)
                assert.isUndefined(result.physical_activity_habits)
                assert.isUndefined(result.medical_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

    })

    describe('toJSON()', () => {
        context('when covert model to json', () => {
            it('should return a json with model parameters', () => {

                const nutritionalQuestionnaire: NutritionalQuestionnaire =
                    new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
                const result = nutritionalQuestionnaire.toJSON()

                assert.propertyVal(result, 'patient_id', data.patient_id)
                assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit!.toJSON())
                assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record!.toJSON())
                assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits!.toJSON())
                assert.deepPropertyVal(result, 'medical_record', data.medical_record!.toJSON())
                assert.propertyVal(result, 'type', data.type)
            })
        })

        context('when the model does not have defined parameters', () => {
            it('should return json with undefined parameters', () => {
                const result: NutritionalQuestionnaire =
                    new NutritionalQuestionnaire().toJSON()

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sleep_habit)
                assert.isUndefined(result.feeding_habits_record)
                assert.isUndefined(result.physical_activity_habits)
                assert.isUndefined(result.medical_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)

            })
        })
    })
})
