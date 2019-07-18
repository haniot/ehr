import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'
import { UpdateMedicalRecordValidator } from '../../../src/application/domain/validator/update.medical.record.validator'

describe('Validators: UpdateMedicalRecordValidator', () => {

    const activityJSON = Object.assign(DefaultEntityMock.MEDICAL_RECORD, {})
    const activity: MedicalRecord = new MedicalRecord().fromJSON(activityJSON)

    it('should return undefined when the validation is successful', () => {
        const result = UpdateMedicalRecordValidator.validate(activity)
        assert.isUndefined(result, 'no result defined')
    })

    context('when there are validation errors', () => {
        it('should throw an error for does pass invalid chronic_disease.type', () => {
            activity.chronic_diseases![0].type = 'invalid'
            try {
                UpdateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for type: invalid')
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
                assert.propertyVal(err, 'message', 'Value not mapped for disease_history: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: yes, no, undefined.')
            }
        })
    })
})
