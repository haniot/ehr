import { DefaultEntityMock } from '../../mocks/default.entity.mock'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { UpdateFeedingHabitsRecordValidator } from '../../../src/application/domain/validator/update.feeding.habits.record.validator'
import { CreateFeedingHabitsRecordValidator } from '../../../src/application/domain/validator/create.feeding.habits.record.validator'
import { WeeklyFoodRecord } from '../../../src/application/domain/model/weekly.food.record'

describe('Validators: UpdateFeedingHabitsRecordValidator', () => {

    const activityJSON = Object.assign(DefaultEntityMock.FEEDING_HABITS_RECORD, {})
    delete activityJSON.weekly_feeding_habits
    const activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(activityJSON)
    activity.patient_id = undefined
    activity.created_at = undefined
    activity.breakfast_daily_frequency = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdateFeedingHabitsRecordValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for pass invalid id', () => {
            activity.id = '123'
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.id = undefined
            }
        })

        it('should throw an error for does pass patient_id', () => {
            activity.patient_id = DefaultEntityMock.ACTIVITY_HABITS_RECORD.patient_id
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
            }
        })

        it('should throw an error for does pass created_at', () => {
            activity.created_at = DefaultEntityMock.ACTIVITY_HABITS_RECORD.created_at
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.created_at = undefined
            }
        })

        it('should throw an error for does pass invalid patient_id', () => {
            try {
                activity.patient_id = '123'
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.patient_id = undefined
                activity.weekly_feeding_habits = [new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)]
            }
        })

        it('should throw an error for does pass invalid weekly_feeding_habits.seven_days_freq', () => {
            activity.weekly_feeding_habits![0].seven_days_freq = 'invalid'
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'Value not mapped for seven_days_freq: invalid')
                assert.property(err, 'description')
                assert.propertyVal(err, 'description', 'The mapped values are: never, no_day, one_two_days, ' +
                    'three_four_days, five_six_days, all_days, undefined.')
            } finally {
                activity.weekly_feeding_habits![0].seven_days_freq = undefined
            }
        })

        it('should throw an error for does pass invalid daily_water_glasses', () => {
            activity.daily_water_glasses = 'invalid'
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for daily_water_glasses: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, one_two, three_four, five_more, ' +
                    'undefined.')
            } finally {
                activity.daily_water_glasses = undefined
            }
        })

        it('should throw an error for does pass invalid six_month_breast_feeding', () => {
            activity.six_month_breast_feeding = 'invalid'
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for six_month_breast_feeding: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: exclusive, complementary, ' +
                    'infant_formulas, other, undefined.')
            } finally {
                activity.six_month_breast_feeding = undefined
            }
        })

        it('should throw an error for does pass invalid food_allergy_intolerance', () => {
            activity.food_allergy_intolerance = ['invalid']
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for food_allergy_intolerance: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: gluten, apvl, lactose, dye, egg, ' +
                    'peanut, other, undefined.')
            } finally {
                activity.food_allergy_intolerance = undefined
            }
        })

        it('should throw an error for does pass invalid breakfast_daily_frequency', () => {
            activity.breakfast_daily_frequency = 'invalid'
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for breakfast_daily_frequency: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: never, sometimes, almost_everyday, ' +
                    'everyday, undefined.')
            }
        })
    })
})
