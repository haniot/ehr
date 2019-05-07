import {SociodemographicRecord} from '../../../src/application/domain/model/sociodemographic.record'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {SociodemographicRecordEntityMapper} from '../../../src/infrastructure/entity/mapper/sociodemographic.record.entity.mapper'
import {assert} from 'chai'
import {SociodemographicRecordEntity} from '../../../src/infrastructure/entity/sociodemographic.record.entity'

describe('Mappers: SociodemographicRecord', () => {
    const mapper = new SociodemographicRecordEntityMapper()
    const model: SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)

    describe('transform()', () => {

        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.id)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at)
                assert.property(result, 'color_race')
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.property(result, 'mother_schoolarity')
                assert.propertyVal(result, 'mother_schoolarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_schoolarity)
                assert.property(result, 'people_in_home')
                assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'sociodemographic_record')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'color_race')
                assert.propertyVal(result, 'color_race', undefined)
                assert.property(result, 'mother_schoolarity')
                assert.propertyVal(result, 'mother_schoolarity', undefined)
                assert.property(result, 'people_in_home')
                assert.propertyVal(result, 'people_in_home', undefined)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.property(result, 'id')
                assert.propertyVal(result, 'id', undefined)
                assert.property(result, 'type')
                assert.propertyVal(result, 'type', 'sociodemographic_record')
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', undefined)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', undefined)
                assert.property(result, 'color_race')
                assert.propertyVal(result, 'color_race', undefined)
                assert.property(result, 'mother_schoolarity')
                assert.propertyVal(result, 'mother_schoolarity', undefined)
                assert.property(result, 'people_in_home')
                assert.propertyVal(result, 'people_in_home', undefined)
            })
        })

        context('when the parameter is a model', () => {
            it('should call the modelToModelEntity() method', () => {
                const result = mapper.transform(model)
                assert.property(result, 'patient_id')
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.property(result, 'created_at')
                assert.propertyVal(result, 'created_at', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at)
                assert.property(result, 'color_race')
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.property(result, 'mother_schoolarity')
                assert.propertyVal(result, 'mother_schoolarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_schoolarity)
                assert.property(result, 'people_in_home')
                assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
            })

            it('should return a model entity without parameters for empty model', () => {
                const anotherModel: SociodemographicRecord = new SociodemographicRecord()
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
                    mapper.modelEntityToModel(new SociodemographicRecordEntity())
                } catch (err) {
                    assert.property(err, 'message')
                    assert.property(err, 'message', 'Not implemented!')
                }
            })
        })
    })

})
