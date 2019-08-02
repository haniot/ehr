import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { OdontologicalQuestionnaire } from '../../../src/application/domain/model/odontological.questionnaire'
import { assert } from 'chai'
import { CreateOdontologicalQuestionnaireValidator } from '../../../src/application/domain/validator/create.odontological.questionnaire.validator'
import { Strings } from '../../../src/utils/strings'

describe('Validators: CreateNutritionalQuestionnaire', () => {
    const activity: OdontologicalQuestionnaire =
        new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)

    it('should return undefined when the validation is successful', () => {
        const result = CreateOdontologicalQuestionnaireValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {

        it('should throw an error for does not pass patient_id', () => {
            try {
                activity.patient_id = undefined
                CreateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Activity Habits Record validation: patient_id is required!')
            }
        })

        it('should throw an error for does pass invalid patient_id', () => {
            try {
                activity.patient_id = '123'
                CreateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.patient_id = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id
            }
        })
        it('should throw an error for does not pass sociodemographic_record', () => {
            activity.sociodemographic_record = undefined
            try {
                CreateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Odontological Questionnaire validation:' +
                    ' sociodemographic_record is required!')
            } finally {
                activity.sociodemographic_record = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record
            }
        })
        it('should throw an error for does not pass oral_health_record', () => {
            activity.oral_health_record = undefined
            try {
                CreateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Odontological Questionnaire validation:' +
                    ' oral_health_record is required!')
            } finally {
                activity.oral_health_record = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record
            }
        })

        it('should throw an error for does not pass family_cohesion_record', () => {
            activity.family_cohesion_record = undefined
            try {
                CreateOdontologicalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Odontological Questionnaire validation:' +
                    ' family_cohesion_record is required!')
            } finally {
                activity.family_cohesion_record = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record
            }
        })
    })
})
