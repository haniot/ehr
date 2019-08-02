import { OdontologicalQuestionnaireEntityMapper } from '../../../src/infrastructure/entity/mapper/odontological.questionnaire.entity.mapper'
import { OdontologicalQuestionnaire } from '../../../src/application/domain/model/odontological.questionnaire'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { OdontologicalQuestionnaireEntity } from '../../../src/infrastructure/entity/odontological.questionnaire.entity'
import { SociodemographicRecord } from '../../../src/application/domain/model/sociodemographic.record'
import { FamilyCohesionRecord } from '../../../src/application/domain/model/family.cohesion.record'
import { OralHealthRecord } from '../../../src/application/domain/model/oral.health.record'

describe('Mappers: OdontologicalQuestionnaire', () => {
    const mapper = new OdontologicalQuestionnaireEntityMapper()
    const model: OdontologicalQuestionnaire =
        new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)
    model.id = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id

    describe('transform()', () => {
        context('when the parameter is a json', () => {
            it('should call the jsonToModel() method', () => {
                const result = mapper.transform(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)

                assert.propertyVal(result, 'id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id)
                assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                assert.propertyVal(result, 'created_at', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.created_at)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
                assert.deepPropertyVal(result, 'sociodemographic_record',
                    new SociodemographicRecord().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record))
                assert.deepPropertyVal(result, 'family_cohesion_record',
                    new FamilyCohesionRecord().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record))
                assert.deepPropertyVal(result, 'oral_health_record',
                    new OralHealthRecord().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record))
            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.isUndefined(result.id)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.sociodemographic_recod)
                assert.isUndefined(result.family_cohesion_record)
                assert.isUndefined(result.oral_health_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.isUndefined(result.id)
                assert.isUndefined(result.patient_id)
                assert.isUndefined(result.created_at)
                assert.isUndefined(result.sociodemographic_recod)
                assert.isUndefined(result.family_cohesion_record)
                assert.isUndefined(result.oral_health_record)
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            })
        })
    })

    context('when the parameter is a model', () => {
        it('should call the modelToModelEntity() method', () => {
            const result = mapper.transform(model)
            assert.propertyVal(result, 'id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id)
            assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
            assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
            assert.deepPropertyVal(result, 'sociodemographic_record', new SociodemographicRecord().fromJSON(
                DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record).toJSON())
            assert.deepPropertyVal(result, 'family_cohesion_record', new FamilyCohesionRecord().fromJSON(
                DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record).toJSON())
            assert.deepPropertyVal(result, 'oral_health_record',
                new OralHealthRecord().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record).toJSON())
        })

        it('should return a model entity with basic parameters for empty model', () => {
            const result = mapper.transform(new OdontologicalQuestionnaire())
            result.type = undefined

            assert.isUndefined(result.id)
            assert.isUndefined(result.patient_id)
            assert.isUndefined(result.created_at)
            assert.isUndefined(result.sociodemographic_recod)
            assert.isUndefined(result.family_cohesion_record)
            assert.isUndefined(result.oral_health_record)
            assert.isUndefined(result.type)
        })

        describe('modelEntityToModel()', () => {
            context('when try to use modelEntityToModel() function', () => {
                it('should throw an error', () => {
                    try {
                        mapper.modelEntityToModel(new OdontologicalQuestionnaireEntity())
                    } catch (err) {
                        assert.propertyVal(err, 'message', 'Not implemented!')
                    }
                })
            })
        })
    })

})
