import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {SociodemographicRecord} from '../../../src/application/domain/model/sociodemographic.record'
import {assert} from 'chai'
import {UpdateSociodemographicRecordValidator} from '../../../src/application/domain/validator/update.sociodemographic.record.validator'
import {Strings} from '../../../src/utils/strings'

describe('Validators: UpdateSociographicRecord', () => {
    const activity: SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
    activity.patient_id = undefined
    activity.created_at = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdateSociodemographicRecordValidator.validate(activity)
        assert.equal(result, undefined)
    })
    context('when there are validation errors', () => {
        it('should throw an error for pass invalid id', () => {
            activity.id = '123'
            try {
                UpdateSociodemographicRecordValidator.validate(activity)
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
            activity.patient_id = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id
            try {
                UpdateSociodemographicRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
            }
        })

        it('should throw an error for does pass created_at', () => {
            activity.created_at = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at
            try {
                UpdateSociodemographicRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            }
            finally {
                activity.created_at = undefined
            }
        })

        it('should throw an error for does pass color_race', () => {
            activity.color_race = 'red'
            try {
                UpdateSociodemographicRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for color_race: red')
                assert.propertyVal(err, 'description', 'The mapped values are: white, black, parda, yellow.')
            }
        })
    })
})
