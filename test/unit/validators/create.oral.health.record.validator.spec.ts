import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {OralHealthRecord} from '../../../src/application/domain/model/oral.health.record'
import {Strings} from '../../../src/utils/strings'
import {CreateOralHealthRecordValidator} from '../../../src/application/domain/validator/create.oral.health.record.validator'
import {ToothLesion} from '../../../src/application/domain/model/tooth.lesion'

describe('Validators: CreateOralHealthValidator', () => {
    const activity: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = CreateOralHealthRecordValidator.validate(activity)
        assert.equal(result, undefined)
    })
    context('when there are validation errors', () => {
        it('should throw an error for does not pass patient_id', () => {
            activity.patient_id = undefined
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Activity Habits Record validation: patient_id is required!')
            }
        })

        it('should throw an error for does pass invalid patient_id', () => {
            activity.patient_id = '123'
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.patient_id = DefaultEntityMock.ORAL_HEALTH_RECORD.patient_id
            }
        })

        it('should throw an error for does not pass teeth_brushing_freq', () => {
            activity.teeth_brushing_freq = undefined
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Oral Health Record validation: teeth_brushing_freq is required!')
            } finally {
                activity.teeth_brushing_freq = DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq
            }
        })

        it('should throw an error for does not pass correct teeth_brushing_freq', () => {
            activity.teeth_brushing_freq = 'invalid'
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for teeth_brushing_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, once, twice, three_more.')
            }finally {
                activity.teeth_brushing_freq = DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq
            }
        })

        it('should throw an error for does not pass teeth_lesions', () => {
            activity.teeth_lesions = undefined
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Oral Health Record validation: teeth_lesions is required!')
            }finally {
                activity.teeth_lesions = DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions
            }
        })

        it('should throw an error for does not pass correct tooth_type', () => {
            activity.teeth_lesions = [new ToothLesion().fromJSON(
                {  tooth_type: 'invalid',
                        lesion_type: 'white_spot_lesion'
                })
                ]
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for tooth_type: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: deciduous_tooth, permanent_tooth.')
            }finally {
                activity.teeth_lesions = DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions
            }
        })

        it('should throw an error for does not pass correct lesion_type', () => {
            activity.teeth_lesions = [new ToothLesion().fromJSON(
                {  tooth_type: 'deciduous_tooth',
                    lesion_type: 'invalid'
                })
            ]
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for lesion_type: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: white_spot_lesion, cavitated_lesion.')
            }finally {
                activity.teeth_lesions = DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions
            }
        })

    })

})
