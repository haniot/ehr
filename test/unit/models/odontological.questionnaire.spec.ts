import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {OdontologicalQuestionnaire} from '../../../src/application/domain/model/odontological.questionnaire'

describe('Models: OdontologicalQuestionnaire', () => {

    const data: OdontologicalQuestionnaire =
        new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)

                assert.propertyVal(result, 'patient_id', data.patient_id)
                assert.deepPropertyVal(result, 'sociodemographic_record', data.sociodemographic_record)
                assert.deepPropertyVal(result, 'oral_health_record', data.oral_health_record)
                assert.deepPropertyVal(result, 'family_cohesion_record', data.family_cohesion_record)
                assert.propertyVal(result, 'type', data.type)

            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(undefined)

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sociodemographic_record)
                assert.isUndefined(result.family_cohesion_record)
                assert.isUndefined(result.oral_health_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new OdontologicalQuestionnaire().fromJSON('invalid')

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sociodemographic_record)
                assert.isUndefined(result.family_cohesion_record)
                assert.isUndefined(result.oral_health_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass a invalid string json', () => {
            it('should return a model with undefined parameters', () => {
                const result = new OdontologicalQuestionnaire().fromJSON({})

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sociodemographic_record)
                assert.isUndefined(result.family_cohesion_record)
                assert.isUndefined(result.oral_health_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(
                    JSON.stringify(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE))

                assert.propertyVal(result, 'patient_id', data.patient_id)
                assert.deepPropertyVal(result, 'sociodemographic_record', data.sociodemographic_record)
                assert.deepPropertyVal(result, 'oral_health_record', data.oral_health_record)
                assert.deepPropertyVal(result, 'family_cohesion_record', data.family_cohesion_record)

            })

            it('should return the class without parameters for empty string', () => {
                const result = new OdontologicalQuestionnaire().fromJSON('')

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sociodemographic_record)
                assert.isUndefined(result.family_cohesion_record)
                assert.isUndefined(result.oral_health_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

    })

    describe('toJSON()', () => {
        context('when covert model to json', () => {
            it('should return a json with model parameters', () => {

                const ondotologicalQuestionnaire: OdontologicalQuestionnaire =
                    new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)
                const result = ondotologicalQuestionnaire.toJSON()

                assert.propertyVal(result, 'patient_id', data.patient_id)
                assert.deepPropertyVal(result, 'sociodemographic_record', data.sociodemographic_record)
                assert.deepPropertyVal(result, 'oral_health_record', data.oral_health_record)
                assert.deepPropertyVal(result, 'family_cohesion_record', data.family_cohesion_record)
                assert.propertyVal(result, 'type', data.type)
            })
        })

        context('when the model does not have defined parameters', () => {
            it('should return json with undefined parameters', () => {
                const result: OdontologicalQuestionnaire =
                    new OdontologicalQuestionnaire().toJSON()

                assert.isUndefined(result.id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.sociodemographic_record)
                assert.isUndefined(result.family_cohesion_record)
                assert.isUndefined(result.oral_health_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })
    })
})
