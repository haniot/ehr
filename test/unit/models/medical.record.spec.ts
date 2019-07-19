import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'

describe('Models: MedicalRecord', () => {
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)
                assert.deepPropertyVal(result, 'chronic_diseases',
                    DefaultEntityMock.MEDICAL_RECORD.chronic_diseases)

            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new MedicalRecord().fromJSON(undefined)
                assert.isUndefined(result.chronic_diseases, 'no chronic_diseases defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new MedicalRecord().fromJSON({})
                assert.isUndefined(result.chronic_diseases, 'no chronic_diseases defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new MedicalRecord().fromJSON(JSON.stringify(DefaultEntityMock.MEDICAL_RECORD))
                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)
                assert.deepPropertyVal(result, 'chronic_diseases',
                    DefaultEntityMock.MEDICAL_RECORD.chronic_diseases)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new MedicalRecord().fromJSON('')
                assert.isUndefined(result.chronic_diseases, 'no chronic_diseases defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)
            })
        })

        context('when pass the parameters', () => {

            it('should return the object with set chronic_diseases', () => {
                const result = new MedicalRecord().fromJSON({
                    chronic_diseases: DefaultEntityMock.MEDICAL_RECORD.chronic_diseases
                })

                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)
                assert.deepPropertyVal(result, 'chronic_diseases',
                    DefaultEntityMock.MEDICAL_RECORD.chronic_diseases)
            })
        })
    })

    describe('toJSON()', () => {
        context('when the object contains all parameters set', () => {
            it('should return the object as JSON', () => {
                const activity = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
                const result = activity.toJSON()
                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)
                assert.deepPropertyVal(result, 'chronic_diseases',
                    DefaultEntityMock.MEDICAL_RECORD.chronic_diseases)

            })
        })

        context('when some parameter is missing', () => {
            it('should return json without created_at', () => {
                const activity = new MedicalRecord().fromJSON({})
                const result = activity.toJSON()
                assert.isUndefined(result.chronic_diseases, 'no chronic_diseases defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)

            })
        })
    })
})
