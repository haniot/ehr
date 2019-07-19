import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {SociodemographicRecord} from '../../../src/application/domain/model/sociodemographic.record'

describe('Models: SociodemographicRecord', () => {
    describe('fromJSON()', () => {
        context('When the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.propertyVal(result, 'mother_scholarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity)
                assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)

            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new SociodemographicRecord().fromJSON(undefined)
                assert.isUndefined(result.color_race, 'no color_race defined')
                assert.isUndefined(result.mother_scholarity, 'no mother_scholarity defined')
                assert.isUndefined(result.people_in_home, 'no people_in_home defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new SociodemographicRecord().fromJSON({})
                assert.isUndefined(result.color_race, 'no color_race defined')
                assert.isUndefined(result.mother_scholarity, 'no mother_scholarity defined')
                assert.isUndefined(result.people_in_home, 'no people_in_home defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new SociodemographicRecord().fromJSON(JSON.stringify(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD))
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.propertyVal(result, 'mother_scholarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity)
                assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new SociodemographicRecord().fromJSON('')
                assert.isUndefined(result.color_race, 'no color_race defined')
                assert.isUndefined(result.mother_scholarity, 'no mother_scholarity defined')
                assert.isUndefined(result.people_in_home, 'no people_in_home defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })

            it('should return the class without parameters for invalid string', () => {
                const result = new SociodemographicRecord().fromJSON('invalid')
                assert.isUndefined(result.color_race, 'no color_race defined')
                assert.isUndefined(result.mother_scholarity, 'no mother_scholarity defined')
                assert.isUndefined(result.people_in_home, 'no people_in_home defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })

        })

        context('when pass the parameters', () => {
            it('should return the object with set color race', () => {
                const result = new SociodemographicRecord().fromJSON({
                    color_race: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race
                })
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.isUndefined(result.mother_scholarity, 'no mother_scholarity defined')
                assert.isUndefined(result.people_in_home, 'no people_in_home defined')
            })

            it('should return the object with set mother scholarity', () => {
                const result = new SociodemographicRecord().fromJSON({
                    color_race: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race,
                    mother_scholarity: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity
                })
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.propertyVal(result, 'mother_scholarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity)
                assert.isUndefined(result.people_in_home, 'no people_in_home defined')
            })

            it('should return the object with set people in home', () => {
                const result = new SociodemographicRecord().fromJSON({
                    color_race: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race,
                    mother_scholarity: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity,
                    people_in_home: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home
                })
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.propertyVal(result, 'mother_scholarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity)
                assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
            })
        })
    })

    describe('toJSON()', () => {
        context('when the object contains all parameters set', () => {
            it('should return the object as JSON', () => {
                const activity = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
                const result = activity.toJSON()
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.propertyVal(result, 'mother_scholarity', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_scholarity)
                assert.propertyVal(result, 'people_in_home', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
            })
        })

        context('when some parameter is missing', () => {
            it('should return json without created_at', () => {
                const activity = new SociodemographicRecord().fromJSON({
                    color_race: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race
                })
                const result = activity.toJSON()
                assert.propertyVal(result, 'type', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.isUndefined(result.mother_scholarity, 'no mother_scholarity defined')
                assert.isUndefined(result.people_in_home, 'no people_in_home defined')
                assert.propertyVal(result, 'color_race', DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
            })
        })
    })
})
