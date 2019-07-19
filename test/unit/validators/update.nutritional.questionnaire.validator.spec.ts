import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { UpdateNutritionalQuestionnaireValidator } from '../../../src/application/domain/validator/update.nutritional.questionnaire.validator'
import { Strings } from '../../../src/utils/strings'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'

describe('Validators: UpdateNutritionalQuestionnaire', () => {
    const activity: NutritionalQuestionnaire =
        new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
    activity.patient_id = undefined
    activity.created_at = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdateNutritionalQuestionnaireValidator.validate(activity)
        assert.isUndefined(result, 'no result defined')
    })

    context('when there are validation errors', () => {
        it('should throw an error for does pass patient_id', () => {
            activity.patient_id = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id
            try {
                UpdateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
            }
        })

        it('should throw an error for does pass created_at', () => {
            activity.created_at = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.created_at
            try {
                UpdateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
                activity.created_at = undefined
            }
        })
        it('should throw an error for does pass physical_activity_habits invalid', () => {
            const physicalActivityHabits: PhysicalActivityHabits =
                new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
            physicalActivityHabits.school_activity_freq = 'invalid'
            activity.physical_activity_habits = physicalActivityHabits
            try {
                UpdateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for school_activity_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: one_per_week, two_per_week,' +
                    ' three_per_week, four_more_per_week, none.')
            }finally {
                activity.physical_activity_habits = DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS
            }
        })
        it('should throw an error for does pass feeding_habits_record invalid', () => {
            const feedingHabitsRecord: FeedingHabitsRecord =
                new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)
            feedingHabitsRecord.daily_water_glasses = 'invalid'
            activity.feeding_habits_record = feedingHabitsRecord
            try {
                UpdateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for daily_water_glasses: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, one_two, three_four, five_more, ' +
                    'undefined.')
            } finally {
                activity.feeding_habits_record = DefaultEntityMock.FEEDING_HABITS_RECORD
            }
        })
        it('should throw an error for does pass medical_record invalid', () => {
            const medicalRecord: MedicalRecord =
                new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
            medicalRecord.chronic_diseases![0].type = 'invalid'
            activity.medical_record = medicalRecord
            try {
                UpdateNutritionalQuestionnaireValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for type: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: hypertension, blood_fat, diabetes.')
            } finally {
                activity.medical_record = DefaultEntityMock.MEDICAL_RECORD
            }
        })
    })
})
