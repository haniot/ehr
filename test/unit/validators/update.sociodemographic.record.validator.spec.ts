import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {SociodemographicRecord} from '../../../src/application/domain/model/sociodemographic.record'
import {assert} from 'chai'
import {UpdateSociodemographicRecordValidator} from '../../../src/application/domain/validator/update.sociodemographic.record.validator'
import { ScholarityLevelTypes } from '../../../src/application/domain/utils/scholarity.level.types'

describe('Validators: UpdateSociographicRecord', () => {
    const activity: SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = UpdateSociodemographicRecordValidator.validate(activity)
        assert.isUndefined(result)
    })
    context('when there are validation errors', () => {
        it('should throw an error for does pass color_race', () => {
            const wrongActivity: SociodemographicRecord = new SociodemographicRecord().fromJSON({
                color_race: 'red',
                mother_scholarity: ScholarityLevelTypes.UNLETTERED_ELEMENTARY_ONE_INCOMPLETE,
                people_in_home: 4
            })
            try {
                UpdateSociodemographicRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for color_race: red')
                assert.propertyVal(err, 'description', 'The mapped values are: white, black, parda, yellow.')
            }
        })
    })
})
