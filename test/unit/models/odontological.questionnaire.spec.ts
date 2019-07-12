import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {OdontologicalQuestionnaire} from '../../../src/application/domain/model/odontological.questionnaire'

describe('Models: OdontologicalQuestionnaire', () => {

    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)

                assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                assert.propertyVal(result, 'sociodemographic_recod',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_recod)
                assert.propertyVal(result, 'oral_health_record', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                assert.propertyVal(result, 'family_cohesion_record',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)

            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(undefined)

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sociodemographic_recod, 'no sociodemographic_recod defined')
                assert.isUndefined(result.family_cohesion_record, 'no family_cohesion_record defined')
                assert.isUndefined(result.oral_health_record, 'no oral_health_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new OdontologicalQuestionnaire().fromJSON('invalid')

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sociodemographic_recod, 'no sociodemographic_recod defined')
                assert.isUndefined(result.family_cohesion_record, 'no family_cohesion_record defined')
                assert.isUndefined(result.oral_health_record, 'no oral_health_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass a invalid string json', () => {
            it('should return a model with undefined parameters', () => {
                const result = new OdontologicalQuestionnaire().fromJSON({})

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sociodemographic_recod, 'no sociodemographic_recod defined')
                assert.isUndefined(result.family_cohesion_record, 'no family_cohesion_record defined')
                assert.isUndefined(result.oral_health_record, 'no oral_health_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(
                    JSON.stringify(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE))

                assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                assert.deepPropertyVal(result, 'sociodemographic_recod',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_recod)
                assert.deepPropertyVal(result, 'oral_health_record',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                assert.deepPropertyVal(result, 'family_cohesion_record',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)

            })

            it('should return the class without parameters for empty string', () => {
                const result = new OdontologicalQuestionnaire().fromJSON('')

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sociodemographic_recod, 'no sociodemographic_recod defined')
                assert.isUndefined(result.family_cohesion_record, 'no family_cohesion_record defined')
                assert.isUndefined(result.oral_health_record, 'no oral_health_record defined')
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

                console.log(result)

                assert.propertyVal(result, 'sociodemographic_recod',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_recod)
                assert.propertyVal(result, 'oral_health_record', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                assert.propertyVal(result, 'family_cohesion_record',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)

            })
        })

        context('when the model does not have defined parameters', () => {
            it('should return json with undefined parameters', () => {
                const result: OdontologicalQuestionnaire =
                    new OdontologicalQuestionnaire().toJSON()

                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.sociodemographic_recod, 'no sociodemographic_recod defined')
                assert.isUndefined(result.family_cohesion_record, 'no family_cohesion_record defined')
                assert.isUndefined(result.oral_health_record, 'no oral_health_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)

            })
        })
    })

})
