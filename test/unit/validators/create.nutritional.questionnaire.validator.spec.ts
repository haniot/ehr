import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { CreateNutritionalQuestionnaireValidator } from '../../../src/application/domain/validator/create.nutritional.questionnaire.validator'
import { Strings } from '../../../src/utils/strings'

describe('Validators: CreateNutritionalQuestionnaire', () => {
    const activity: NutritionalQuestionnaire =
        new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)

    it('should return undefined when the validation is successful', () => {
        const result = CreateNutritionalQuestionnaireValidator.validate(activity)
        assert.isUndefined(result, 'no result defined')
    })

    context('when there are validation errors', () => {

        it('should throw an error for does not pass patient_id', () => {
            try {
                activity.patient_id = undefined
                CreateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Activity Habits Record validation: patient_id is required!')
            }
        })

        it('should throw an error for does pass invalid patient_id', () => {
            try {
                activity.patient_id = '123'
                CreateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.patient_id = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id
            }
        })
        it('should throw an error for does not pass sleep_habit', () => {
            activity.sleep_habit = undefined
            try {
                CreateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Nutritional Questionnaire validation: sleep_habit is required!')
            } finally {
                activity.sleep_habit = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit
            }
        })
        it('should throw an error for does not pass feeding_habits_record', () => {
            activity.feeding_habits_record = undefined
            try {
                CreateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Nutritional Questionnaire validation: feeding_habits_record is required!')
            } finally {
                activity.feeding_habits_record = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record
            }
        })
        it('should throw an error for does not pass physical_activity_habits', () => {
            activity.physical_activity_habits = undefined
            try {
                CreateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Nutritional Questionnaire validation: ' +
                    'physical_activity_habits is required!')
            } finally {
                activity.physical_activity_habits = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits
            }
        })
        it('should throw an error for does not pass medical_record', () => {
            activity.medical_record = undefined
            try {
                CreateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Nutritional Questionnaire validation: medical_record is required!')
            } finally {
                activity.medical_record = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record
            }
        })
    })

})
