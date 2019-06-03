import { MedicalRecord } from '../../../src/application/domain/model/medical.record'
import { MedicalRecordEntityMapper } from '../../../src/infrastructure/entity/mapper/medical.record.entity.mapper'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { MedicalRecordEntity } from '../../../src/infrastructure/entity/medical.record.entity'
import { assert } from 'chai'

describe('Mappers: MedicalRecordEntityMapper', () => {
    const mapper = new MedicalRecordEntityMapper()
    const model: MedicalRecord = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.MEDICAL_RECORD)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', DefaultEntityMock.MEDICAL_RECORD.id)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', DefaultEntityMock.MEDICAL_RECORD.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.MEDICAL_RECORD.patient_id)
                assert.property(result, 'created_at')
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'medical_record')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'medical_record')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
            })

        })

        context('when the parameter is a model', () => {
            it('should return a model entity', () => {
                const result = mapper.transform(model)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', model.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', model.patient_id)
                assert.property(result, 'created_at')
                assert.property(result, 'chronic_diseases')
                assert.deepPropertyVal(result, 'chronic_diseases', model.chronic_diseases)
            })

            it('should return a model entity without parameters for empty model', () => {
                const anotherModel: MedicalRecord = new MedicalRecord()
                anotherModel.type = undefined
                const result = mapper.transform(anotherModel)
                assert.isEmpty(result)
            })
        })
    })

    describe('modelEntityToModel()', () => {
        context('when try to use modelEntityToModel() function', () => {
            it('should throw an error', () => {
                try {
                    mapper.modelEntityToModel(new MedicalRecordEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.property(err, 'message', 'Not implemented!')
                }
            })
        })
    })
})
