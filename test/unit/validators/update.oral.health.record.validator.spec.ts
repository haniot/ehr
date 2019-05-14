
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {OralHealthRecord} from '../../../src/application/domain/model/oral.health.record'
import {UpdateOralHealthRecordValidator} from '../../../src/application/domain/validator/update.oral.health.record.validator'
import {Strings} from '../../../src/utils/strings'

describe('Validators: UpdateOralHealthRecord', () => {
    const activity: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
    activity.patient_id = undefined
    activity.created_at = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdateOralHealthRecordValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for pass invalid id', () => {
            activity.id = '123'
            try {
                UpdateOralHealthRecordValidator.validate(activity)
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
            activity.patient_id = DefaultEntityMock.ORAL_HEALTH_RECORD.patient_id
            try {
                UpdateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
            }
        })

        it('should throw an error for does pass created_at', () => {
            activity.created_at = DefaultEntityMock.ORAL_HEALTH_RECORD.created_at
            try {
                UpdateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            }
            finally {
                activity.created_at = undefined
            }
        })

        it('should throw an error for does pass color_race', () => {
            activity.teeth_brushing_freq = 'invalid'
            try {
                UpdateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for teeth_brushing_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, once, twice, three_more.')
            } finally {
                activity.teeth_brushing_freq = undefined
            }
        })
        it('should throw an error for does pass invalid teeth_lesions.tooth_type', () => {
            activity.teeth_lesions![0].tooth_type = 'invalid'
            try {
                UpdateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'Value not mapped for tooth_type: invalid')
                assert.property(err, 'description')
                assert.propertyVal(err, 'description', 'The mapped values are: deciduous_tooth, permanent_tooth.')
            } finally {
                activity.teeth_lesions![0].tooth_type = undefined
            }
        })

        it('should throw an error for does pass invalid teeth_lesions.tooth_type', () => {
            activity.teeth_lesions![0].lesion_type = 'invalid'
            try {
                UpdateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'Value not mapped for lesion_type: invalid')
                assert.property(err, 'description')
                assert.propertyVal(err, 'description', 'The mapped values are: white_spot_lesion, cavitated_lesion.')
            }
        })
    })

})
