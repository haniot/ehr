import { CreateMedicalRecordValidator } from '../../../src/application/domain/validator/create.medical.record.validator'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { ChronicDisease } from '../../../src/application/domain/model/chronic.disease'

describe('Validators: CreateMedicalRecordValidator', () => {
    const activity: MedicalRecord = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = CreateMedicalRecordValidator.validate(activity)
        assert.isUndefined(result, 'no result defined')
    })

    context('when there are validation errors', () => {

        it('should throw an error for does not pass chronic_diseases', () => {
            activity.chronic_diseases = undefined
            try {
                CreateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Medical Record validation: chronic_diseases is required!')
            } finally {
                activity.chronic_diseases = [new ChronicDisease().fromJSON(DefaultEntityMock.CHRONIC_DISEASE)]
            }
        })
        it('should throw an error for does not pass chronic_disease.type', () => {
            activity.chronic_diseases![0].type = undefined
            try {
                CreateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Medical Record validation: chronic_disease.type is required!')
            } finally {
                activity.chronic_diseases = [new ChronicDisease().fromJSON(DefaultEntityMock.CHRONIC_DISEASE)]
            }
        })

        it('should throw an error for does pass invalid chronic_disease.type', () => {
            activity.chronic_diseases![0].type = 'invalid'
            try {
                CreateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for type: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: hypertension, blood_fat, diabetes.')
            } finally {
                activity.chronic_diseases = [new ChronicDisease().fromJSON(DefaultEntityMock.CHRONIC_DISEASE)]
            }
        })

        it('should throw an error for does not pass chronic_disease.disease_history', () => {
            activity.chronic_diseases![0].disease_history = undefined
            try {
                CreateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Medical Record validation: chronic_disease.disease_history' +
                    ' is required!')
            } finally {
                activity.chronic_diseases = [new ChronicDisease().fromJSON(DefaultEntityMock.CHRONIC_DISEASE)]
            }
        })

        it('should throw an error for does pass invalid chronic_disease.disease_history', () => {
            activity.chronic_diseases![0].disease_history = 'invalid'
            try {
                CreateMedicalRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for disease_history: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: yes, no, undefined.')
            }
        })

    })
})
