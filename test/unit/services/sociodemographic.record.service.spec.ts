import { SociodemographicRecord } from '../../../src/application/domain/model/sociodemographic.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { ISociodemographicRecordService } from '../../../src/application/port/sociodemographic.record.service.interface'
import { SociodemographicRecordService } from '../../../src/application/service/sociodemographic.record.service'
import { SociodemographicRecordRepositoryMock } from '../../mocks/repositories/sociodemographic.record.repository.mock'
import { assert } from 'chai'
import { Query } from '../../../src/infrastructure/repository/query/query'

describe('Services: SociodemographicRecord', () => {
    const activity: SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
    activity.id = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.id
    const service: ISociodemographicRecordService = new SociodemographicRecordService(new SociodemographicRecordRepositoryMock())

    describe('add()', () => {
        context('when save a new sociodemographic record', () => {
            it('should return the saved sociodemographic record', () => {
                return service
                    .add(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'patient_id')
                        assert.propertyVal(result, 'patient_id', activity.patient_id)
                        assert.property(result, 'created_at')
                        assert.property(result, 'color_race')
                        assert.propertyVal(result, 'color_race', activity.color_race)
                        assert.property(result, 'mother_schoolarity')
                        assert.propertyVal(result, 'mother_schoolarity', activity.mother_schoolarity)
                        assert.property(result, 'people_in_home')
                        assert.propertyVal(result, 'people_in_home', activity.people_in_home)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .add(new SociodemographicRecord().fromJSON({ patient_id: activity.patient_id }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Sociodemographic Record validation: color_race, ' +
                            'mother_schoolarity, people_in_home is required!')
                    })
            })
        })
    })

    describe('getAll()', () => {
        context('when get all sociodemographic record', () => {
            it('should return a list of sociodemographic record', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getAll(query)
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 1)
                        assert.property(result[0], 'id')
                        assert.propertyVal(result[0], 'id', activity.id)
                        assert.property(result[0], 'type')
                        assert.propertyVal(result[0], 'type', activity.type)
                        assert.property(result[0], 'patient_id')
                        assert.propertyVal(result[0], 'patient_id', activity.patient_id)
                        assert.property(result[0], 'created_at')
                        assert.property(result[0], 'color_race')
                        assert.propertyVal(result[0], 'color_race', activity.color_race)
                        assert.property(result[0], 'mother_schoolarity')
                        assert.propertyVal(result[0], 'mother_schoolarity', activity.mother_schoolarity)
                        assert.property(result[0], 'people_in_home')
                        assert.propertyVal(result[0], 'people_in_home', activity.people_in_home)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: '123' })
                return service
                    .getAll(query)
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('getById()', () => {
        context('when get a unique sociodemographic record', () => {
            it('should return a sociodemographic record', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getById(activity.id!, query)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'patient_id')
                        assert.propertyVal(result, 'patient_id', activity.patient_id)
                        assert.property(result, 'created_at')
                        assert.property(result, 'color_race')
                        assert.propertyVal(result, 'color_race', activity.color_race)
                        assert.property(result, 'mother_schoolarity')
                        assert.propertyVal(result, 'mother_schoolarity', activity.mother_schoolarity)
                        assert.property(result, 'people_in_home')
                        assert.propertyVal(result, 'people_in_home', activity.people_in_home)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: '123' })
                return service
                    .getById(activity.id!, query)
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('removeSociodemographicRecord()', () => {
        context('when delete a sociodemographic record', () => {
            it('should return true', () => {
                return service
                    .removeSociodemographicRecord(activity.patient_id!, activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .removeSociodemographicRecord('123', '321')
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('update()', () => {
        context('when update a sociodemographic record', () => {
            it('should return the updated sociodemographic record', () => {
                activity.created_at = undefined
                return service
                    .update(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'patient_id')
                        assert.property(result, 'created_at')
                        assert.property(result, 'color_race')
                        assert.propertyVal(result, 'color_race', activity.color_race)
                        assert.property(result, 'mother_schoolarity')
                        assert.propertyVal(result, 'mother_schoolarity', activity.mother_schoolarity)
                        assert.property(result, 'people_in_home')
                        assert.propertyVal(result, 'people_in_home', activity.people_in_home)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                activity.patient_id = '123'
                return service
                    .update(activity)
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('remove()', () => {
        it('should throw an error for does not implemented', () => {
            return service
                .remove(activity.id!)
                .catch(err => {
                    assert.property(err, 'message')
                    assert.propertyVal(err, 'message', 'Not implemented yet!')
                })
        })
    })

})
