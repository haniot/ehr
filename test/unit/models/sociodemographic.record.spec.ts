
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {assert} from 'chai'
import {SociodemographicRecord} from '../../../src/application/domain/model/sociodemographic.record'

describe('Models: SociodemographicRecord', () => {
    describe('fromJSON()', () => {
        context('When the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
                assert.equal(result.patient_id, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at)

            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new SociodemographicRecord().fromJSON(undefined)
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new SociodemographicRecord().fromJSON({})
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)

            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new SociodemographicRecord().fromJSON(JSON.stringify(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD))
                assert.equal(result.patient_id, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new SociodemographicRecord().fromJSON('')
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })

            it('should return the class without parameters for invalid string', () => {
                const result = new SociodemographicRecord().fromJSON('invalid')
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })

        })

        context('when pass the parameters', () => {
            it('should return the object with set patient_id', () => {
                const result = new SociodemographicRecord().fromJSON({
                    patient_id: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id
                })
                assert.equal(result.patient_id, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })

            it('should return the object with set created_at', () => {
                const result = new SociodemographicRecord().fromJSON({
                    patient_id: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id,
                    created_at: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at
                })
                assert.equal(result.patient_id, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
            })

            it('should return the object with set color race', () => {
                const result = new SociodemographicRecord().fromJSON({
                    patient_id: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id,
                    created_at: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at,
                    color_race: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race
                })
                assert.equal(result.patient_id, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.equal(result.color_race, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
            })

            it('should return the object with set mother schoolarity', () => {
                const result = new SociodemographicRecord().fromJSON({
                    patient_id: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id,
                    created_at: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at,
                    color_race: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race,
                    mother_schoolarity: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_schoolarity
                })
                assert.equal(result.patient_id, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.equal(result.color_race, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.equal(result.mother_schoolarity, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_schoolarity)
            })

            it('should return the object with set people in home', () => {
                const result = new SociodemographicRecord().fromJSON({
                    patient_id: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id,
                    created_at: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at,
                    color_race: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race,
                    mother_schoolarity: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_schoolarity,
                    people_in_home: DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home
                })
                assert.equal(result.patient_id, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at)
                assert.equal(result.type, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.type)
                assert.equal(result.color_race, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.color_race)
                assert.equal(result.mother_schoolarity, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.mother_schoolarity)
                assert.equal(result.people_in_home, DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.people_in_home)
            })
        })
    })
})
