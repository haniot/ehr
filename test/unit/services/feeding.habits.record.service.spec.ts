import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { IFeedingHabitsRecordService } from '../../../src/application/port/feeding.habits.record.service.interface'
import { FeedingHabitsRecordService } from '../../../src/application/service/feeding.habits.record.service'
import { FeedingHabitsRecordRepositoryMock } from '../../mocks/repositories/feeding.habits.record.repository.mock'
import { PatientRepositoryMock } from '../../mocks/repositories/patient.repository.mock'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'
import { Query } from '../../../src/infrastructure/repository/query/query'
import { ObjectID } from 'bson'

describe('Services: FeedingHabitsRecordService', () => {
    const activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)
    activity.id = DefaultEntityMock.FEEDING_HABITS_RECORD.id
    const service: IFeedingHabitsRecordService = new FeedingHabitsRecordService(
        new FeedingHabitsRecordRepositoryMock(), new PatientRepositoryMock()
    )

    describe('add()', () => {
        context('when add a new feeding habits record', () => {
            it('should return the saved feeding habits record', () => {
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
                        assert.property(result, 'daily_water_glasses')
                        assert.propertyVal(result, 'daily_water_glasses', activity.daily_water_glasses)
                        assert.property(result, 'six_month_breast_feeding')
                        assert.propertyVal(result, 'six_month_breast_feeding', activity.six_month_breast_feeding)
                        assert.property(result, 'food_allergy_intolerance')
                        assert.deepPropertyVal(result, 'food_allergy_intolerance', activity.food_allergy_intolerance)
                        assert.property(result, 'breakfast_daily_frequency')
                        assert.propertyVal(result, 'breakfast_daily_frequency', activity.breakfast_daily_frequency)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .add(new FeedingHabitsRecord().fromJSON({ patient_id: activity.patient_id }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Feeding Habits validation: weekly_feeding_habits, ' +
                            'daily_water_glasses, six_month_breast_feeding, food_allergy_intolerance, breakfast_daily_frequency' +
                            ' is required!')
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
                        activity.patient_id = DefaultEntityMock.FEEDING_HABITS_RECORD.patient_id
                    })
            })

        })
    })

    describe('getAll()', () => {
        context('when get all feeding habits records', () => {
            it('should return a list of feeding habits records', () => {
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
                        assert.property(result[0], 'daily_water_glasses')
                        assert.propertyVal(result[0], 'daily_water_glasses', activity.daily_water_glasses)
                        assert.property(result[0], 'six_month_breast_feeding')
                        assert.propertyVal(result[0], 'six_month_breast_feeding', activity.six_month_breast_feeding)
                        assert.property(result[0], 'food_allergy_intolerance')
                        assert.deepPropertyVal(result[0], 'food_allergy_intolerance', activity.food_allergy_intolerance)
                        assert.property(result[0], 'breakfast_daily_frequency')
                        assert.propertyVal(result[0], 'breakfast_daily_frequency', activity.breakfast_daily_frequency)
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
        context('when get a unique feeding habits record', () => {
            it('should return a feeding habits record', () => {
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
                        assert.property(result, 'daily_water_glasses')
                        assert.propertyVal(result, 'daily_water_glasses', activity.daily_water_glasses)
                        assert.property(result, 'six_month_breast_feeding')
                        assert.propertyVal(result, 'six_month_breast_feeding', activity.six_month_breast_feeding)
                        assert.property(result, 'food_allergy_intolerance')
                        assert.deepPropertyVal(result, 'food_allergy_intolerance', activity.food_allergy_intolerance)
                        assert.property(result, 'breakfast_daily_frequency')
                        assert.propertyVal(result, 'breakfast_daily_frequency', activity.breakfast_daily_frequency)
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
        context('when remove a feeding habits record', () => {
            it('should return true', () => {
                return service
                    .removeFeedingHabitsRecord(activity.patient_id!, activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .removeFeedingHabitsRecord('123', '321')
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
        context('when update a feeding habits record', () => {
            it('should return the updated feeding habits record', () => {
                activity.created_at = undefined
                return service
                    .update(activity)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', activity.id)
                        assert.property(result, 'type')
                        assert.propertyVal(result, 'type', activity.type)
                        assert.property(result, 'created_at')
                        assert.property(result, 'daily_water_glasses')
                        assert.propertyVal(result, 'daily_water_glasses', activity.daily_water_glasses)
                        assert.property(result, 'six_month_breast_feeding')
                        assert.propertyVal(result, 'six_month_breast_feeding', activity.six_month_breast_feeding)
                        assert.property(result, 'food_allergy_intolerance')
                        assert.deepPropertyVal(result, 'food_allergy_intolerance', activity.food_allergy_intolerance)
                        assert.property(result, 'breakfast_daily_frequency')
                        assert.propertyVal(result, 'breakfast_daily_frequency', activity.breakfast_daily_frequency)
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
