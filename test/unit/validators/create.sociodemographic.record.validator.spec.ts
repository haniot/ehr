import { SociodemographicRecord } from '../../../src/application/domain/model/sociodemographic.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { CreateSociodemographicRecordValidator } from '../../../src/application/domain/validator/create.sociodemographic.record.validator'
import { Strings } from '../../../src/utils/strings'
import { ScholarityLevelTypes } from '../../../src/application/domain/utils/scholarity.level.types'

describe('Validators: CreateSociodemographicRecordValidator', () => {
    const activity: SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = CreateSociodemographicRecordValidator.validate(activity)
        assert.isUndefined(result)
    })
    context('when there are validation errors', () => {

        it('should throw an error for does not pass color_race', () => {
            activity.color_race = undefined
            try {
                CreateSociodemographicRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Sociodemographic Record validation: color_race is required!')
            } finally {
                activity.color_race = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race
            }
        })
        it('should throw an error for does not pass correct color_race', () => {
            const wrongActivity: SociodemographicRecord = new SociodemographicRecord().fromJSON({
                color_race: 'red',
                mother_scholarity: ScholarityLevelTypes.UNLETTERED_ELEMENTARY_ONE_INCOMPLETE,
                people_in_home: 4
            })
            try {
                CreateSociodemographicRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for color_race: red')
                assert.propertyVal(err, 'description', 'The mapped values are: white, black, parda, yellow.')
            }
        })

        it('should throw an error for does not pass mother_scholarity', () => {
            activity.mother_scholarity = undefined
            try {
                CreateSociodemographicRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Sociodemographic Record validation: mother_scholarity is required!')
            } finally {
                activity.mother_scholarity = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity
            }
        })

        it('should throw an error for does not pass correct mother_scholarity', () => {
            const wrongActivity: SociodemographicRecord = new SociodemographicRecord().fromJSON({
                color_race: 'white',
                mother_scholarity: 'invalid',
                people_in_home: 4
            })
            try {
                CreateSociodemographicRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for mother_scholarity: invalid')
                assert.propertyVal(err, 'description', Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ScholarityLevelTypes).join(', ').concat('.')))
            }
        })
        it('should throw an error for does not pass people_in_home', () => {
            activity.people_in_home = undefined
            try {
                CreateSociodemographicRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Sociodemographic Record validation: people_in_home is required!')
            }
        })
    })

})
