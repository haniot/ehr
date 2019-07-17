import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'

describe('Models: PhysicalActivityHabits', () => {
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
                assert.propertyVal(result, 'school_activity_freq',
                    DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.deepPropertyVal(result, 'weekly_activities', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new PhysicalActivityHabits().fromJSON(undefined)
                assert.isUndefined(result.school_activity_freq, 'no school_activity_freq defined')
                assert.isUndefined(result.weekly_activities, 'no weekly_activities defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new PhysicalActivityHabits().fromJSON({})
                assert.isUndefined(result.school_activity_freq, 'no school_activity_freq defined')
                assert.isUndefined(result.weekly_activities, 'no weekly_activities defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new PhysicalActivityHabits().fromJSON(JSON.stringify(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS))
                assert.propertyVal(result, 'school_activity_freq',
                    DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.deepPropertyVal(result, 'weekly_activities', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })

            it('should return the class without parameters for empty string', () => {
                const result = new PhysicalActivityHabits().fromJSON('')
                assert.isUndefined(result.school_activity_freq, 'no school_activity_freq defined')
                assert.isUndefined(result.weekly_activities, 'no weekly_activities defined')
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })

        context('when pass the parameters', () => {
            it('should return the object with set school_activity_freq', () => {
                const result = new PhysicalActivityHabits().fromJSON({
                    school_activity_freq: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq
                })
                assert.propertyVal(result, 'school_activity_freq',
                    DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
                assert.isUndefined(result.weekly_activities, 'no weekly_activities defined')
            })

            it('should return the object with set weekly_activities', () => {
                const result = new PhysicalActivityHabits().fromJSON({
                    school_activity_freq: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq,
                    weekly_activities: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities
                })
                assert.propertyVal(result, 'school_activity_freq',
                    DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.deepPropertyVal(result, 'weekly_activities', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })
    })

    describe('toJSON()', () => {
        context('when the object contains all parameters set', () => {
            it('should return the object as JSON', () => {
                const activity = new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
                const result = activity.toJSON()
                assert.propertyVal(result, 'school_activity_freq',
                    DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.school_activity_freq)
                assert.deepPropertyVal(result, 'weekly_activities', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })

        context('when some parameter is missing', () => {
            it('should return json without created_at', () => {
                const activity = new PhysicalActivityHabits().fromJSON({
                    weekly_activities: DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities
                })
                const result = activity.toJSON()
                assert.isUndefined(result.school_activity_freq, 'no school_activity_freq defined')
                assert.deepPropertyVal(result, 'weekly_activities', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.weekly_activities)
                assert.propertyVal(result, 'type', DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.type)
            })
        })
    })
})
