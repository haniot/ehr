import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { NutritionalQuestionnaireEntityMapper } from '../../../src/infrastructure/entity/mapper/nutritional.questionnaire.entity.mapper'
import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'
import { assert } from 'chai'
import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'
import { NutritionalQuestionnaireEntity } from '../../../src/infrastructure/entity/nutritional.questionnaire.entity'

describe('Mappers: NutritionalQuestionnaire', () => {

    const mapper = new NutritionalQuestionnaireEntityMapper()
    const model: NutritionalQuestionnaire =
        new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
    model.id = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)

                assert.propertyVal(result, 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                assert.propertyVal(result, 'created_at', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.created_at)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
                assert.deepPropertyVal(result, 'sleep_habit',
                    new SleepHabit().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit))
                assert.deepPropertyVal(result, 'feeding_habits_record',
                    new FeedingHabitsRecord().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record))
                assert.deepPropertyVal(result, 'physical_activity_habits',
                    new PhysicalActivityHabits().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits))
                assert.deepPropertyVal(result, 'medical_record',
                    new MedicalRecord().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record))
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.isUndefined(result.id)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.sleep_habit)
                assert.isUndefined(result.feeding_habits_record)
                assert.isUndefined(result.physical_activity_habits)
                assert.isUndefined(result.medical_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.isUndefined(result.id)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.sleep_habit)
                assert.isUndefined(result.feeding_habits_record)
                assert.isUndefined(result.physical_activity_habits)
                assert.isUndefined(result.medical_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)

            })
        })
    })

    context('when the parameter is a model', () => {
        it('should call the modelToModelEntity() method', () => {
            const result = mapper.transform(model)
            assert.propertyVal(result, 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
            assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
            assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
            assert.deepPropertyVal(result, 'sleep_habit',
                new SleepHabit().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit).toJSON())
            assert.deepPropertyVal(result, 'feeding_habits_record',
                new FeedingHabitsRecord().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record).toJSON())
            assert.deepPropertyVal(result, 'physical_activity_habits',
                new PhysicalActivityHabits().fromJSON(
                    DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits).toJSON())
            assert.deepPropertyVal(result, 'medical_record',
                new MedicalRecord().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record).toJSON())
        })

        it('should return a model entity with basic parameters for empty model', () => {
            const result = mapper.transform(new NutritionalQuestionnaire())
            result.type = undefined

            assert.isUndefined(result.id)
            assert.isUndefined(result.patient_id)
            assert.isUndefined(result.created_at)
            assert.isUndefined(result.sleep_habit)
            assert.isUndefined(result.feeding_habits_record)
            assert.isUndefined(result.physical_activity_habits)
            assert.isUndefined(result.medical_record)
            assert.isUndefined(result.type)
        })

        describe('modelEntityToModel()', () => {
            context('when try to use modelEntityToModel() function', () => {
                it('should throw an error', () => {
                    try {
                        mapper.modelEntityToModel(new NutritionalQuestionnaireEntity())
                    } catch (err) {
                        assert.propertyVal(err, 'message', 'Not implemented!')
                    }
                })
            })
        })
    })
})
