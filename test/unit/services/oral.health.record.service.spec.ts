import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {OralHealthRecord} from '../../../src/application/domain/model/oral.health.record'
import {IOralHealthRecordService} from '../../../src/application/port/oral.health.record.service.interface'
import {OralHealthRecordService} from '../../../src/application/service/oral.health.record.service'
import {OralHealthRecordRepositoryMock} from '../../mocks/repositories/oral.health.record.repository.mock'
import {assert} from 'chai'
import {Query} from '../../../src/infrastructure/repository/query/query'

describe('Services: OralHealthRecordService', () => {
    const activity: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
    activity.id = DefaultEntityMock.ORAL_HEALTH_RECORD.id
    const service: IOralHealthRecordService = new OralHealthRecordService(new OralHealthRecordRepositoryMock())

    describe('add()', () => {
        context('when add a new oral health record', () => {
            it('should return the saved oral health record', () => {
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
                        assert.property(result, 'teeth_brushing_freq')
                        assert.propertyVal(result, 'teeth_brushing_freq', result.teeth_brushing_freq)
                        assert.property(result, 'teeth_lesions')
                        assert.propertyVal(result, 'teeth_lesions', result.teeth_lesions)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .add(new OralHealthRecord().fromJSON({ patient_id: activity.patient_id }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Oral Health Record validation: teeth_brushing_freq is required!')
                    })
            })
        })

    })

    describe('getAll()', () => {
        context('when get all oral health records', () => {
            it('should return a list of oral health records', () => {
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
                        assert.property(result[0], 'teeth_brushing_freq')
                        assert.propertyVal(result[0], 'teeth_brushing_freq', activity.teeth_brushing_freq)
                        assert.property(result[0], 'teeth_lesions')
                        assert.deepPropertyVal(result[0], 'teeth_lesions', activity.teeth_lesions)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                const query: Query = new Query().fromJSON({ patient_id: '123' })
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
        context('when get a unique oral health record', () => {
            it('should return a oral health record', () => {
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
                        assert.property(result, 'teeth_brushing_freq')
                        assert.propertyVal(result, 'teeth_brushing_freq', activity.teeth_brushing_freq)
                        assert.property(result, 'teeth_lesions')
                        assert.deepPropertyVal(result, 'teeth_lesions', activity.teeth_lesions)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                const query: Query = new Query().fromJSON({ patient_id: '123' })
                return service
                    .getById('123', query)
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

    describe('removeFeedingHabitsRecord()', () => {
        context('when remove a oral health record', () => {
            it('should return true', () => {
                return service
                    .removeOralHealthRecord(activity.patient_id!, activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .removeOralHealthRecord('123', '321')
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
        context('when update a oral health record', () => {
            it('should return the updated oral health record', () => {
                activity.created_at = undefined
                return service
                    .update(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'created_at')
                        assert.property(result, 'teeth_brushing_freq')
                        assert.propertyVal(result, 'teeth_brushing_freq', activity.teeth_brushing_freq)
                        assert.property(result, 'teeth_lesions')
                        assert.deepPropertyVal(result, 'teeth_lesions', activity.teeth_lesions)
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
