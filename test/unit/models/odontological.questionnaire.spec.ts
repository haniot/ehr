import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {OdontologicalQuestionnaire} from '../../../src/application/domain/model/odontological.questionnaire'

describe('Models: OdontologicalQuestionnaire', () => {

    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)
                assert.equal(result.patient_id, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                console.log(result)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(undefined)
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new OdontologicalQuestionnaire().fromJSON({})
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new OdontologicalQuestionnaire().fromJSON(
                    JSON.stringify(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE))
                assert.equal(result.patient_id, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new OdontologicalQuestionnaire().fromJSON('')
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })

        context('when pass the parameters', () => {
            it('should return the object with set patient_id', () => {
                const result = new OdontologicalQuestionnaire().fromJSON({
                    patient_id: DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id
                })
                assert.equal(result.patient_id, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })

            it('should return the object with set created_at', () => {
                const result = new OdontologicalQuestionnaire().fromJSON({
                    patient_id: DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id,
                    created_at: DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.created_at
                })
                assert.equal(result.patient_id, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                assert.equal(result.type, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })

            it('should return the object with set created_at', () => {
                const result = new OdontologicalQuestionnaire().fromJSON({
                    patient_id: DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id,
                    created_at: DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.created_at,
                    chronic_diseases: DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.chronic_diseases
                })
                assert.equal(result.patient_id, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                assert.equal(result.type, DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })
    })

    })
