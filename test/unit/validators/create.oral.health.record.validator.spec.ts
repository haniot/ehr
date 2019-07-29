import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {OralHealthRecord} from '../../../src/application/domain/model/oral.health.record'
import {CreateOralHealthRecordValidator} from '../../../src/application/domain/validator/create.oral.health.record.validator'
import {ToothLesion} from '../../../src/application/domain/model/tooth.lesion'

describe('Validators: CreateOralHealthValidator', () => {
    const activity: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = CreateOralHealthRecordValidator.validate(activity)
        assert.isUndefined(result, 'no result defined')
    })
    context('when there are validation errors', () => {

        it('should throw an error for does not pass teeth_brushing_freq', () => {
            activity.teeth_brushing_freq = undefined
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
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
                assert.propertyVal(err, 'message', 'Value not mapped for tooth_type: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: deciduous_tooth, permanent_tooth.')
            }finally {
                activity.teeth_lesions = DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions
            }
        })

        it('should throw an error for does not pass tooth_type', () => {
            activity.teeth_lesions = [new ToothLesion().fromJSON(
                {  tooth_type: undefined,
                    lesion_type: 'white_spot_lesion'
                })
            ]
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Oral Health Record validation: teeth_lesions.tooth_type is required!')
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
                assert.propertyVal(err, 'message', 'Value not mapped for lesion_type: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: white_spot_lesion, cavitated_lesion.')
            }finally {
                activity.teeth_lesions = DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions
            }
        })

        it('should throw an error for does not pass lesion_type', () => {
            activity.teeth_lesions = [new ToothLesion().fromJSON(
                {  tooth_type: 'deciduous_tooth',
                    lesion_type: undefined
                })
            ]
            try {
                CreateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Oral Health Record validation: teeth_lesions.lesion_type is required!')
            }finally {
                activity.teeth_lesions = DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions
            }
        })

    })

})
