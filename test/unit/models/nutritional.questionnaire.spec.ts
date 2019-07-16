import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'

describe('Models: NutritionalQuestionnaire', () => {

    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)

                assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                assert.propertyVal(result, 'sleep_habit',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                assert.propertyVal(result, 'feeding_habits_record',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                assert.propertyVal(result, 'physical_activity_habits',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                assert.propertyVal(result, 'medical_record', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new NutritionalQuestionnaire().fromJSON(undefined)

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sleep_habit, 'no sleep_habit defined')
                assert.isUndefined(result.feeding_habits_record, 'no feeding_habits_record defined')
                assert.isUndefined(result.physical_activity_habits, 'no physical_activity_habits defined')
                assert.isUndefined(result.medical_record, 'no medical_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new NutritionalQuestionnaire().fromJSON('invalid')

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sleep_habit, 'no sleep_habit defined')
                assert.isUndefined(result.feeding_habits_record, 'no feeding_habits_record defined')
                assert.isUndefined(result.physical_activity_habits, 'no physical_activity_habits defined')
                assert.isUndefined(result.medical_record, 'no medical_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass a invalid string json', () => {
            it('should return a model with undefined parameters', () => {
                const result = new NutritionalQuestionnaire().fromJSON({})

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sleep_habit, 'no sleep_habit defined')
                assert.isUndefined(result.feeding_habits_record, 'no feeding_habits_record defined')
                assert.isUndefined(result.physical_activity_habits, 'no physical_activity_habits defined')
                assert.isUndefined(result.medical_record, 'no medical_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new NutritionalQuestionnaire().fromJSON(
                    JSON.stringify(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE))

                assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                assert.deepPropertyVal(result, 'sleep_habit',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                assert.deepPropertyVal(result, 'feeding_habits_record',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                assert.deepPropertyVal(result, 'physical_activity_habits',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                assert.deepPropertyVal(result, 'medical_record', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
                assert.deepPropertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)

            })

            it('should return the class without parameters for empty string', () => {
                const result = new NutritionalQuestionnaire().fromJSON('')

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sleep_habit, 'no sleep_habit defined')
                assert.isUndefined(result.feeding_habits_record, 'no feeding_habits_record defined')
                assert.isUndefined(result.physical_activity_habits, 'no physical_activity_habits defined')
                assert.isUndefined(result.medical_record, 'no medical_record defined')
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

                assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                assert.deepPropertyVal(result, 'sleep_habit',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                assert.deepPropertyVal(result, 'feeding_habits_record',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                assert.deepPropertyVal(result, 'physical_activity_habits',
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                assert.deepPropertyVal(result, 'medical_record', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
                assert.deepPropertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })
        })

        context('when the model does not have defined parameters', () => {
            it('should return json with undefined parameters', () => {
                const result: NutritionalQuestionnaire =
                    new NutritionalQuestionnaire().toJSON()

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sleep_habit, 'no sleep_habit defined')
                assert.isUndefined(result.feeding_habits_record, 'no feeding_habits_record defined')
                assert.isUndefined(result.physical_activity_habits, 'no physical_activity_habits defined')
                assert.isUndefined(result.medical_record, 'no medical_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)

            })
        })
    })
})
