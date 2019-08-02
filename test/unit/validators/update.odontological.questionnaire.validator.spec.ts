import { OdontologicalQuestionnaire } from '../../../src/application/domain/model/odontological.questionnaire'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'
import { UpdateOdontologicalQuestionnaireValidator } from '../../../src/application/domain/validator/update.odontological.questionnaire.validator'
import { SociodemographicRecord } from '../../../src/application/domain/model/sociodemographic.record'
import { OralHealthRecord } from '../../../src/application/domain/model/oral.health.record'
import { FamilyCohesionRecord } from '../../../src/application/domain/model/family.cohesion.record'

describe('Validators: UpdateOdontologicalQuestionnaire', () => {
    const activity: OdontologicalQuestionnaire =
        new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)
    activity.patient_id = undefined
    activity.created_at = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdateOdontologicalQuestionnaireValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does pass patient_id', () => {
            activity.patient_id = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id
            try {
                UpdateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
            }
        })

        it('should throw an error for does pass created_at', () => {
            activity.created_at = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.created_at
            try {
                UpdateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
                activity.created_at = undefined
            }
        })

        it('should throw an error for does pass created_at', () => {
            activity.created_at = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.created_at
            try {
                UpdateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
                activity.created_at = undefined
            }
        })
        it('should throw an error for does pass color_race', () => {
            const sociodemographic: SociodemographicRecord =
                new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
            sociodemographic.color_race = 'red'
            activity.sociodemographic_record = sociodemographic
            try {
                UpdateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for color_race: red')
                assert.propertyVal(err, 'description', 'The mapped values are: white, black, parda, yellow.')
            } finally {
                activity.sociodemographic_record = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD
            }
        })
        it('should throw an error for does pass color_race', () => {
            const oralHealth: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
            oralHealth.teeth_brushing_freq = 'invalid'
            activity.oral_health_record = oralHealth
            try {
                UpdateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for teeth_brushing_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, once, twice, three_more.')
            } finally {
                activity.oral_health_record = DefaultEntityMock.ORAL_HEALTH_RECORD
            }
        })
        it('should throw an error for does pass invalid family_mutual_aid_freq', () => {
            const familyCohesionRecord: FamilyCohesionRecord =
                new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)
            familyCohesionRecord.family_mutual_aid_freq = 'invalid'
            activity.family_cohesion_record = familyCohesionRecord
            try {
                UpdateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for family_mutual_aid_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: almost_never,' +
                    ' rarely, sometimes, often, almost_always.')
            } finally {
                activity.family_cohesion_record = DefaultEntityMock.FAMILY_COHESION_RECORD
            }
        })
    })
})
