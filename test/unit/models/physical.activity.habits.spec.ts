import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'

describe('Models: PhysicalActivityHabits', () => {
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
                assert.equal(result.patient_id, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new PhysicalActivityHabits().fromJSON(undefined)
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new PhysicalActivityHabits().fromJSON({})
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new PhysicalActivityHabits().fromJSON(JSON.stringify(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS))
                assert.equal(result.patient_id, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new PhysicalActivityHabits().fromJSON('')
                assert.equal(result.id, undefined)
                assert.equal(result.patient_id, undefined)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })

        context('when pass the parameters', () => {
            it('should return the object with set patient_id', () => {
                const result = new PhysicalActivityHabits().fromJSON({
                    patient_id: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id
                })
                assert.equal(result.patient_id, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id)
                assert.equal(result.created_at, undefined)
                assert.equal(result.type, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })

            it('should return the object with set created_at', () => {
                const result = new PhysicalActivityHabits().fromJSON({
                    patient_id: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id,
                    created_at: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at
                })
                assert.equal(result.patient_id, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at)
                assert.equal(result.type, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })

            it('should return the object with set school_activity_freq', () => {
                const result = new PhysicalActivityHabits().fromJSON({
                    patient_id: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id,
                    created_at: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at,
                    school_activity_freq: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq
                })
                assert.equal(result.patient_id, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at)
                assert.equal(result.type, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
                assert.equal(result.school_activity_freq, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
            })

            it('should return the object with set weekly_activities', () => {
                const result = new PhysicalActivityHabits().fromJSON({
                    patient_id: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id,
                    created_at: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at,
                    school_activity_freq: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq,
                    weekly_activities: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities
                })
                assert.equal(result.patient_id, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id)
                assert.equal(result.created_at, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at)
                assert.equal(result.type, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
                assert.equal(result.school_activity_freq, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.deepEqual(result.weekly_activities, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
            })
        })
    })

    describe('toJSON()', () => {
        context('when the object contains all parameters set', () => {
            it('should return the object as JSON', () => {
                const activity = new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
                const result = activity.toJSON()
                assert.equal(result.created_at, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at)
                assert.equal(result.school_activity_freq, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.deepEqual(result.weekly_activities, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
            })
        })

        context('when some parameter is missing', () => {
            it('should return json without created_at', () => {
                const activity = new PhysicalActivityHabits().fromJSON({
                    patient_id: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id,
                    school_activity_freq: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq,
                    weekly_activities: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities
                })
                const result = activity.toJSON()
                assert.equal(result.created_at, undefined)
                assert.equal(result.school_activity_freq, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.deepEqual(result.weekly_activities, DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
            })
        })
    })
})
