import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { INutritionalQuestionnaireService } from '../../../src/application/port/nutritional.questionnaire.service'
import { NutritionalQuestionnaireService } from '../../../src/application/service/nutritional.questionnaire.service'
import { NutritionalQuestionnaireRepositoryMock } from '../../mocks/repositories/nutritional.questionnaire.repository.mock'
import { Query } from '../../../src/infrastructure/repository/query/query'
import { assert } from 'chai'

describe('Services: NutritionalQuestionnaire', () => {
    const activity: NutritionalQuestionnaire =
        new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
    activity.id = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id
    const service: INutritionalQuestionnaireService =
        new NutritionalQuestionnaireService(new NutritionalQuestionnaireRepositoryMock())

    describe('add()', () => {
        context('when save a new nutritional questionnaire', () => {
            it('should return the saved nutritional questionnaire', () => {
                return service
                    .add(activity)
                    .then(result => {
                        assert.propertyVal(result, 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sleep_habit',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                        assert.propertyVal(result, 'feeding_habits_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                        assert.propertyVal(result, 'physical_activity_habits',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                        assert.propertyVal(result, 'medical_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .add(new NutritionalQuestionnaire().fromJSON({ patient_id: activity.patient_id }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Nutritional Questionnaire validation: created_at,' +
                            ' sleep_habit, physical_activity_habits, feeding_habits_record, medical_record is required!')
                    })
            })
        })
    })
    describe('getAll()', () => {
        context('when get all nutritional questionnaires', () => {
            it('should return a list of nutritional questionnaires', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getAll(query)
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 1)
                        assert.propertyVal(result[0], 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
                        assert.propertyVal(result[0], 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result[0], 'sleep_habit',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                        assert.propertyVal(result[0], 'feeding_habits_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                        assert.propertyVal(result[0], 'physical_activity_habits',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                        assert.propertyVal(result[0], 'medical_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
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
        context('when get a unique nutritional questionnaire', () => {
            it('should return a nutritional questionnaire', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getById(activity.id!, query)
                    .then(result => {
                        assert.propertyVal(result, 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sleep_habit',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                        assert.propertyVal(result, 'feeding_habits_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                        assert.propertyVal(result, 'physical_activity_habits',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                        assert.propertyVal(result, 'medical_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
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
    describe('removeNutritionalQuestionnaire()', () => {
        context('when delete a nutritional questionnaire', () => {
            it('should return true', () => {
                return service.removeNutritionalQuestionnaire(activity.patient_id!, activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service.removeNutritionalQuestionnaire('123', '321')
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
        context('when update a nutritional questionnaire', () => {
            it('should return the updated nutritional questionnaire', () => {
                activity.created_at = undefined
                return service
                    .update(activity)
                    .then(result => {
                        assert.propertyVal(result, 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sleep_habit',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                        assert.propertyVal(result, 'feeding_habits_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                        assert.propertyVal(result, 'physical_activity_habits',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                        assert.propertyVal(result, 'medical_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
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

    describe('count()', () => {
        context('when want count nutritional questionnaires', () => {
            it('should return a number of nutritional questionnaires', () => {
                return service.count(new Query())
                    .then(res => {
                        assert.isNumber(res)
                        assert.equal(res, 1)
                    })
            })
        })
    })

    describe('remove()', () => {
        it('should throw an error for does not implemented', () => {
            return service
                .remove(activity.id!)
                .catch(err => {
                    assert.propertyVal(err, 'message', 'Not implemented yet!')
                })
        })
    })

})
