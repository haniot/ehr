import { DefaultEntityMock } from '../../mocks/default.entity.mock'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'
import { UpdateMedicalRecordValidator } from '../../../src/application/domain/validator/update.medical.record.validator'
import { ChronicDisease } from '../../../src/application/domain/model/chronic.disease'

describe('Validators: UpdateMedicalRecordValidator', () => {

    const activityJSON = Object.assign(DefaultEntityMock.MEDICAL_RECORD, {})
    delete activityJSON.chronic_diseases
    const activity: MedicalRecord = new MedicalRecord().fromJSON(activityJSON)
    activity.patient_id = undefined
    activity.created_at = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdateMedicalRecordValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for pass invalid id', () => {
            activity.id = '123'
            try {
                UpdateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.id = undefined
            }
        })

        it('should throw an error for does pass patient_id', () => {
            activity.patient_id = DefaultEntityMock.ACTIVITY_HABITS_RECORD.patient_id
            try {
                UpdateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
            }
        })

        it('should throw an error for does pass created_at', () => {
            activity.created_at = DefaultEntityMock.ACTIVITY_HABITS_RECORD.created_at
            try {
                UpdateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.created_at = undefined
                activity.chronic_diseases = [new ChronicDisease()]
            }
        })

        it('should throw an error for does pass invalid chronic_disease.type', () => {
            activity.chronic_diseases![0].type = 'invalid'
            try {
                UpdateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'Value not mapped for type: invalid')
                assert.property(err, 'description')
                assert.propertyVal(err, 'description', 'The mapped values are: hypertension, blood_fat, diabetes.')
            } finally {
                activity.chronic_diseases![0].type = DefaultEntityMock.CHRONIC_DISEASE.type
            }
        })

        it('should throw an error for does pass invalid chronic_disease.disease_history', () => {
            activity.chronic_diseases![0].disease_history = 'invalid'
            try {
                UpdateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'Value not mapped for disease_history: invalid')
                assert.property(err, 'description')
                assert.propertyVal(err, 'description', 'The mapped values are: yes, no, undefined.')
            }
        })
    })
})
