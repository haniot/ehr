import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'

describe('Models: MedicalRecord', () => {
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
                console.log(result)

            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new MedicalRecord().fromJSON(undefined)

                assert.equal(result.type, DefaultEntityMock.MEDICAL_RECORD.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new MedicalRecord().fromJSON({})

                assert.equal(result.type, DefaultEntityMock.MEDICAL_RECORD.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new MedicalRecord().fromJSON(JSON.stringify(DefaultEntityMock.MEDICAL_RECORD))
                console.log(result)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new MedicalRecord().fromJSON('')

                assert.equal(result.type, DefaultEntityMock.MEDICAL_RECORD.type)
            })
        })

        context('when pass the parameters', () => {
            it('should return the object with set patient_id', () => {
                const result = new MedicalRecord().fromJSON({
                    patient_id: DefaultEntityMock.MEDICAL_RECORD.patient_id
                })

                assert.equal(result.type, DefaultEntityMock.MEDICAL_RECORD.type)
            })

            it('should return the object with set created_at', () => {
                const result = new MedicalRecord().fromJSON({
                    patient_id: DefaultEntityMock.MEDICAL_RECORD.patient_id,
                    created_at: DefaultEntityMock.MEDICAL_RECORD.created_at
                })

                assert.equal(result.type, DefaultEntityMock.MEDICAL_RECORD.type)
            })

            it('should return the object with set created_at', () => {
                const result = new MedicalRecord().fromJSON({
                    patient_id: DefaultEntityMock.MEDICAL_RECORD.patient_id,
                    created_at: DefaultEntityMock.MEDICAL_RECORD.created_at,
                    chronic_diseases: DefaultEntityMock.MEDICAL_RECORD.chronic_diseases
                })

                assert.equal(result.type, DefaultEntityMock.MEDICAL_RECORD.type)
                assert.equal(result.chronic_diseases, DefaultEntityMock.MEDICAL_RECORD.chronic_diseases)
            })
        })
    })

    describe('toJSON()', () => {
        context('when the object contains all parameters set', () => {
            it('should return the object as JSON', () => {
                const activity = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
                const result = activity.toJSON()
                assert.equal(result.chronic_diseases, DefaultEntityMock.MEDICAL_RECORD.chronic_diseases)

            })
        })

        context('when some parameter is missing', () => {
            it('should return json without created_at', () => {
                const activity = new MedicalRecord().fromJSON({
                    patient_id: DefaultEntityMock.MEDICAL_RECORD.patient_id,
                    chronic_diseases: DefaultEntityMock.MEDICAL_RECORD.chronic_diseases
                })
                const result = activity.toJSON()
                assert.equal(result.created_at, undefined)
                assert.equal(result.chronic_diseases, DefaultEntityMock.MEDICAL_RECORD.chronic_diseases)

            })
        })
    })
})
