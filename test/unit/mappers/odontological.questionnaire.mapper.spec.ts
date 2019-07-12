import {OdontologicalQuestionnaireEntityMapper} from '../../../src/infrastructure/entity/mapper/odontological.questionnaire.entity.mapper'
import {OdontologicalQuestionnaire} from '../../../src/application/domain/model/odontological.questionnaire'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {OdontologicalQuestionnaireEntity} from '../../../src/infrastructure/entity/odontological.questionnaire.entity'

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
                assert.propertyVal(result, 'sociodemographic_record',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_recod)
                assert.propertyVal(result, 'family_cohesion_record',
                    DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                assert.propertyVal(result, 'oral_health_record', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)

            })

            it('should return model without parameters for empty json', () => {
                const result = mapper.transform({})
                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.sociodemographic_recod, 'no sociodemographic_record defined')
                assert.isUndefined(result.family_cohesion_record, 'no family_cohesion_record defined')
                assert.isUndefined(result.oral_health_record, 'no oral_health_record defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)

            })

            it('should return model without parameter for undefined json', () => {
                const result = mapper.transform(undefined)
                assert.isUndefined(result.id, 'no id defined')
                assert.isUndefined(result.patient_id, 'no patient_id defined')
                assert.isUndefined(result.created_at, 'no created_at defined')
                assert.isUndefined(result.sociodemographic_recod, 'no sociodemographic_record defined')
                assert.isUndefined(result.family_cohesion_record, 'no family_cohesion_record defined')
                assert.isUndefined(result.oral_health_record, 'no oral_health_record defined')
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
            assert.propertyVal(result, 'sociodemographic_record',
                DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_recod)
            assert.propertyVal(result, 'family_cohesion_record',
                DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
            assert.propertyVal(result, 'oral_health_record', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)

        })

        it('should return a model entity with basic parameters for empty model', () => {
            const result = mapper.transform(new OdontologicalQuestionnaire())
            result.type = undefined

            assert.isUndefined(result.id, 'no id defined')
            assert.isUndefined(result.patient_id, 'no patient_id defined')
            assert.isUndefined(result.created_at, 'no created_at defined')
            assert.isUndefined(result.sociodemographic_recod, 'no sociodemographic_record defined')
            assert.isUndefined(result.family_cohesion_record, 'no family_cohesion_record defined')
            assert.isUndefined(result.oral_health_record, 'no oral_health_record defined')
            assert.isUndefined(result.type, 'no type defined')


        })

        describe('modelEntityToModel()', () => {
            context('when try to use modelEntityToModel() function', () => {
                it('should throw an error', () => {
                    try {
                        mapper.modelEntityToModel(new OdontologicalQuestionnaireEntity())
                    } catch (err) {
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'Not implemented!')
                    }
                })
            })
        })
    })

})
