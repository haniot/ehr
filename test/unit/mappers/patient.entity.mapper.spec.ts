import { PatientEntityMapper } from '../../../src/infrastructure/entity/mapper/patient.entity.mapper'
import { PatientEntity } from '../../../src/infrastructure/entity/patient.entity'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { Patient } from '../../../src/application/domain/model/patient'
import { assert } from 'chai'

describe('Mappers: PatientEntityMapper', () => {
    const mapper = new PatientEntityMapper()
    const model: Patient = new Patient().fromJSON(DefaultEntityMock.PATIENT)

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.PATIENT)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', DefaultEntityMock.PATIENT.id)
                assert.property(result, 'pilotstudy_id')
                assert.propertyVal(result, 'pilotstudy_id', DefaultEntityMock.PATIENT.pilotstudy_id)
                assert.property(result, 'first_name')
                assert.propertyVal(result, 'first_name', DefaultEntityMock.PATIENT.first_name)
                assert.property(result, 'last_name')
                assert.propertyVal(result, 'last_name', DefaultEntityMock.PATIENT.last_name)
                assert.property(result, 'gender')
                assert.propertyVal(result, 'gender', DefaultEntityMock.PATIENT.gender)
                assert.property(result, 'birth_date')
                assert.propertyVal(result, 'birth_date', DefaultEntityMock.PATIENT.birth_date)
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'pilotstudy_id')
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.property(result, 'first_name')
                assert.propertyVal(result, 'first_name', undefined)
                assert.property(result, 'last_name')
                assert.propertyVal(result, 'last_name', undefined)
                assert.property(result, 'gender')
                assert.propertyVal(result, 'gender', undefined)
                assert.property(result, 'birth_date')
                assert.propertyVal(result, 'birth_date', undefined)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'pilotstudy_id')
                assert.propertyVal(result, 'pilotstudy_id', undefined)
                assert.property(result, 'first_name')
                assert.propertyVal(result, 'first_name', undefined)
                assert.property(result, 'last_name')
                assert.propertyVal(result, 'last_name', undefined)
                assert.property(result, 'gender')
                assert.propertyVal(result, 'gender', undefined)
                assert.property(result, 'birth_date')
                assert.propertyVal(result, 'birth_date', undefined)
            })

        })

        context('when the parameter is a model', () => {
            it('should call the modelToModelEntity() method', () => {
                const result = mapper.transform(model)
                assert.property(result, 'id')
                assert.property(result, 'pilotstudy_id')
                assert.property(result, 'first_name')
                assert.property(result, 'last_name')
                assert.property(result, 'gender')
                assert.property(result, 'birth_date')
            })

            it('should return a model entity without parameters for empty model', () => {
                const result = mapper.transform(new Patient())
                assert.isEmpty(result)
            })
        })
    })

    describe('modelEntityToModel()', () => {
        context('when try to use modelEntityToModel() function', () => {
            it('should throw an error', () => {
                try {
                    mapper.modelEntityToModel(new PatientEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.property(err, 'message', 'Not implemented!')
                }
            })
        })
    })
})
