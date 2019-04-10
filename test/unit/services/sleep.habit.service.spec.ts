import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { PatientRepositoryMock } from '../../mocks/repositories/patient.repository.mock'
import { assert } from 'chai'
import { ObjectID } from 'bson'
import { Strings } from '../../../src/utils/strings'
import { Query } from '../../../src/infrastructure/repository/query/query'
import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'
import { ISleepHabitService } from '../../../src/application/port/sleep.habit.service.interface'
import { SleepHabitService } from '../../../src/application/service/sleep.habit.service'
import { SleepHabitRepositoryMock } from '../../mocks/repositories/sleep.habit.repository.mock'

describe('Services: SleepHabitService', () => {
    const activity: SleepHabit = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)
    activity.id = DefaultEntityMock.SLEEP_HABIT.id
    const service: ISleepHabitService = new SleepHabitService(
        new SleepHabitRepositoryMock(), new PatientRepositoryMock()
    )

    describe('add()', () => {
        context('when save a new sleep habit', () => {
            it('should return the saved sleep habit', () => {
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
                        assert.property(result, 'week_day_sleep')
                        assert.propertyVal(result, 'week_day_sleep', activity.week_day_sleep)
                        assert.property(result, 'week_day_wake_up')
                        assert.propertyVal(result, 'week_day_wake_up', activity.week_day_wake_up)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .add(new SleepHabit().fromJSON({ patient_id: activity.patient_id }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Sleep Habit validation: week_day_sleep, week_day_wake_up is' +
                            ' required!')
                    })
            })
        })

        context('when the patient_id is not founded', () => {
            it('should reject a validation error', () => {
                activity.patient_id = `${new ObjectID()}`
                return service
                    .add(activity)
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', Strings.PATIENT.NOT_FOUND)
                        assert.propertyVal(err, 'description', Strings.PATIENT.NOT_FOUND_DESCRIPTION)
                        activity.patient_id = DefaultEntityMock.MEDICAL_RECORD.patient_id
                    })
            })
        })
    })

    describe('getAll()', () => {
        context('when get all sleep habits', () => {
            it('should return a list of sleep habits', () => {
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
                        assert.property(result[0], 'week_day_sleep')
                        assert.propertyVal(result[0], 'week_day_sleep', activity.week_day_sleep)
                        assert.property(result[0], 'week_day_wake_up')
                        assert.propertyVal(result[0], 'week_day_wake_up', activity.week_day_wake_up)
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
        context('when get a unique sleep habit', () => {
            it('should return a sleep habit', () => {
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
                        assert.property(result, 'week_day_sleep')
                        assert.propertyVal(result, 'week_day_sleep', activity.week_day_sleep)
                        assert.property(result, 'week_day_wake_up')
                        assert.propertyVal(result, 'week_day_wake_up', activity.week_day_wake_up)
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

    describe('removeMedicalRecord()', () => {
        context('when delete a sleep habit', () => {
            it('should return true', () => {
                return service
                    .removeSleepHabit(activity.patient_id!, activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .removeSleepHabit('123', '321')
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
        context('when update a sleep habit', () => {
            it('should return the updated sleep habit', () => {
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
                        assert.property(result, 'week_day_sleep')
                        assert.propertyVal(result, 'week_day_sleep', activity.week_day_sleep)
                        assert.property(result, 'week_day_wake_up')
                        assert.propertyVal(result, 'week_day_wake_up', activity.week_day_wake_up)
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
