import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {OralHealthRecord} from '../../../src/application/domain/model/oral.health.record'
import {OralHealthRecordEntityMapper} from '../../../src/infrastructure/entity/mapper/oral.health.record.entity.mapper'
import {OralHealthRecordEntity} from '../../../src/infrastructure/entity/oral.health.record.entity';

describe('Mappers: OralHealthRecord', () => {

    const mapper = new OralHealthRecordEntityMapper()
    const model: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
    model.id = DefaultEntityMock.ORAL_HEALTH_RECORD.id

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.ORAL_HEALTH_RECORD)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', result.id)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', result.patient_id)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', result.created_at)
                assert.property(result, 'teeth_brushing_freq')
                assert.propertyVal(result, 'teeth_brushing_freq', result.teeth_brushing_freq)
                assert.property(result, 'teeth_lesions')
                assert.propertyVal(result, 'teeth_lesions', result.teeth_lesions)
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'teeth_brushing_freq')
                assert.propertyVal(result, 'teeth_brushing_freq', undefined)
                assert.property(result, 'teeth_lesions')
                assert.propertyVal(result, 'teeth_lesions', undefined)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'teeth_brushing_freq')
                assert.propertyVal(result, 'teeth_brushing_freq', undefined)
                assert.property(result, 'teeth_lesions')
                assert.propertyVal(result, 'teeth_lesions', undefined)
            })

        })

        context('when the parameter is a model', () => {
            it('should return a model entity', () => {
                const result =
                    mapper.transform(model)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', result.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', result.patient_id)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', result.created_at)
                assert.property(result, 'teeth_brushing_freq')
                assert.propertyVal(result, 'teeth_brushing_freq', result.teeth_brushing_freq)
                assert.property(result, 'teeth_lesions')
                assert.propertyVal(result, 'teeth_lesions', result.teeth_lesions)
            })

            it('should return a model entity without parameters for empty model', () => {
                const anotherModel: OralHealthRecord = new OralHealthRecord()
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
                    mapper.modelEntityToModel(new OralHealthRecordEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.property(err, 'message', 'Not implemented!')
                }
            })
        })
    })

})
