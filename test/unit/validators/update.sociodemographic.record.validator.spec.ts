import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {SociodemographicRecord} from '../../../src/application/domain/model/sociodemographic.record'
import {assert} from 'chai'
import {UpdateSociodemographicRecordValidator} from '../../../src/application/domain/validator/update.sociodemographic.record.validator'

describe('Validators: UpdateSociographicRecord', () => {
    const activity: SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = UpdateSociodemographicRecordValidator.validate(activity)
        assert.isUndefined(result)
    })
    context('when there are validation errors', () => {
        it('should throw an error for does pass color_race', () => {
            activity.color_race = 'red'
            try {
                UpdateSociodemographicRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for color_race: red')
                assert.propertyVal(err, 'description', 'The mapped values are: white, black, parda, yellow.')
            }
        })
    })
})
