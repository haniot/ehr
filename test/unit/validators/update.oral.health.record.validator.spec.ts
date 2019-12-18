import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { OralHealthRecord } from '../../../src/application/domain/model/oral.health.record'
import { UpdateOralHealthRecordValidator } from '../../../src/application/domain/validator/update.oral.health.record.validator'
import { ToothLesion } from '../../../src/application/domain/model/tooth.lesion'

describe('Validators: UpdateOralHealthRecord', () => {
    const activity: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
    it('should return undefined when the validation is successful', () => {
        const result = UpdateOralHealthRecordValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does pass color_race', () => {
            const wrongActivity: OralHealthRecord = new OralHealthRecord().fromJSON({
                teeth_brushing_freq: 'invalid',
                teeth_lesions: [
                    {
                        tooth_type: 'deciduous_tooth',
                        lesion_type: 'white_spot_lesion'
                    },
                    {
                        tooth_type: 'deciduous_tooth',
                        lesion_type: 'cavitated_lesion'
                    }
                ]
            })
            try {
                UpdateOralHealthRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for teeth_brushing_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, once, twice, three_more.')
            }
        })
        it('should throw an error for does pass invalid teeth_lesions.tooth_type', () => {
            activity.teeth_lesions = [new ToothLesion().fromJSON(
                {  tooth_type: 'invalid',
                    lesion_type: 'white_spot_lesion'
                })
            ]
            try {
                UpdateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for tooth_type: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: deciduous_tooth, permanent_tooth.')
            }
        })

        it('should throw an error for does pass invalid teeth_lesions.tooth_type', () => {
            activity.teeth_lesions = [new ToothLesion().fromJSON(
                {  tooth_type: 'deciduous_tooth',
                    lesion_type: 'invalid'
                })
            ]
            try {
                UpdateOralHealthRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for lesion_type: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: white_spot_lesion, cavitated_lesion.')
            }
        })
    })

})
