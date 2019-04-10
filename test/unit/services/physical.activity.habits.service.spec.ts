import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { IPhysicalActivityHabitsService } from '../../../src/application/port/physical.activity.habits.service.interface'
import { PhysicalActivityHabitsService } from '../../../src/application/service/physical.activity.habits.service'
import { PhysicalActivityHabitsRepositoryMock } from '../../mocks/repositories/physical.activity.habits.repository.mock'
import { PatientRepositoryMock } from '../../mocks/repositories/patient.repository.mock'
import { assert } from 'chai'
import { ObjectID } from 'bson'
import { Strings } from '../../../src/utils/strings'
import { Query } from '../../../src/infrastructure/repository/query/query'

describe('Services: PhysicalActivityHabitsService', () => {
    const activity: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
    activity.id = DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.id
    const service: IPhysicalActivityHabitsService = new PhysicalActivityHabitsService(
        new PhysicalActivityHabitsRepositoryMock(),
        new PatientRepositoryMock()
    )

    describe('add()', () => {
        context('when save a new physical activity habits', () => {
            it('should return the saved physical activity habits', () => {
                return service
                    .add(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'created_at')
                        assert.property(result, 'school_activity_freq')
                        assert.propertyVal(result, 'school_activity_freq', activity.school_activity_freq)
                        assert.property(result, 'weekly_activities')
                        assert.deepPropertyVal(result, 'weekly_activities', activity.weekly_activities)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .add(new PhysicalActivityHabits().fromJSON({ patient_id: activity.patient_id }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.property(err, 'description', 'Physical Activity Habits validation: school_activity_freq, ' +
                            'weekly_activities is required!')
                    })
            })
        })

        context('when the patient does not exists', () => {
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
        context('when get all physical activity habits', () => {
            it('should return a list of physical activity habits', () => {
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
                        assert.property(result[0], 'created_at')
                        assert.property(result[0], 'school_activity_freq')
                        assert.propertyVal(result[0], 'school_activity_freq', activity.school_activity_freq)
                        assert.property(result[0], 'weekly_activities')
                        assert.deepPropertyVal(result[0], 'weekly_activities', activity.weekly_activities)
                    })
            })
        })

        context('when there area validation errors', () => {
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

    describe('getById', () => {
        context('when get a unique physical activity habits', () => {
            it('should return a physical activity habits', () => {
                const query: Query = new Query()
                query.addFilter({ patient_id: activity.patient_id })
                return service
                    .getById(activity.id!, query)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'created_at')
                        assert.property(result, 'school_activity_freq')
                        assert.propertyVal(result, 'school_activity_freq', activity.school_activity_freq)
                        assert.property(result, 'weekly_activities')
                        assert.deepPropertyVal(result, 'weekly_activities', activity.weekly_activities)
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

    describe('delete()', () => {
        context('when delete a physical activity habits', () => {
            it('should return true', () => {
                return service
                    .removePhysicalActivityHabits(activity.patient_id!, activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .removePhysicalActivityHabits('123', '321')
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
        context('when update a medical record', () => {
            it('should return the updated medical record', () => {
                activity.created_at = undefined
                return service
                    .update(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'created_at')
                        assert.property(result, 'school_activity_freq')
                        assert.propertyVal(result, 'school_activity_freq', activity.school_activity_freq)
                        assert.property(result, 'weekly_activities')
                        assert.deepPropertyVal(result, 'weekly_activities', activity.weekly_activities)
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
