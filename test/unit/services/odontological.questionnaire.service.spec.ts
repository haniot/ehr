import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { OdontologicalQuestionnaire } from '../../../src/application/domain/model/odontological.questionnaire'
import { IOdontologicalQuestionnaireService } from '../../../src/application/port/odontological.questionnaire.service.interface'
import { OdontologicalQuestionnaireService } from '../../../src/application/service/odontological.questionnaire.service'
import { OdontologicalQuestionnaireRepositoryMock } from '../../mocks/repositories/odontological.questionnaire.repository.mock'
import { assert } from 'chai'
import { Query } from '../../../src/infrastructure/repository/query/query'

describe('Services: OdontologicalQuestionnaire', () => {
    const activity: OdontologicalQuestionnaire =
        new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)
    activity.id = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id
    const service: IOdontologicalQuestionnaireService =
        new OdontologicalQuestionnaireService(new OdontologicalQuestionnaireRepositoryMock())

    describe('add()', () => {
        context('when save a new odontological questionnaire', () => {
            it('should return the saved odontological questionnaire', () => {
                return service
                    .add(activity)
                    .then(result => {
                        assert.propertyVal(result, 'id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id)
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sociodemographic_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record)
                        assert.propertyVal(result, 'oral_health_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                        assert.propertyVal(result, 'family_cohesion_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .add(new OdontologicalQuestionnaire().fromJSON({ patient_id: activity.patient_id }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Odontological Questionnaire validation: ' +
                            'sociodemographic_record, family_cohesion_record, oral_health_record is required!')
                    })
            })
        })
    })

    describe('getAll()', () => {
        context('when get all odontological questionnaires', () => {
            it('should return a list of odontological questionnaires', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getAll(query)
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 1)
                        assert.propertyVal(result[0], 'id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id)
                        assert.propertyVal(result[0], 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result[0], 'sociodemographic_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record)
                        assert.propertyVal(result[0], 'oral_health_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                        assert.propertyVal(result[0], 'family_cohesion_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                        assert.propertyVal(result[0], 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
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
        context('when get a unique odontological questionnaire', () => {
            it('should return a odontological questionnaire', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getById(activity.id!, query)
                    .then(result => {
                        assert.propertyVal(result, 'id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id)
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sociodemographic_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record)
                        assert.propertyVal(result, 'oral_health_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                        assert.propertyVal(result, 'family_cohesion_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
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

    describe('removeOdontologicalQuestionnaire()', () => {
        context('when delete a odontological questionnaire', () => {
            it('should return true', () => {
                return service
                    .removeOdontologicalQuestionnaire(activity.patient_id!, activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .removeOdontologicalQuestionnaire('123', '321')
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
        context('when update a odontological questionnaire', () => {
            it('should return the updated odontological questionnaire', () => {
                activity.created_at = undefined
                return service
                    .update(activity)
                    .then(result => {
                        assert.propertyVal(result, 'id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id)
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sociodemographic_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record)
                        assert.propertyVal(result, 'oral_health_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                        assert.propertyVal(result, 'family_cohesion_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
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
        context('when want count odontological questionnaires', () => {
            it('should return a number of odontological questionnaires', () => {
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
