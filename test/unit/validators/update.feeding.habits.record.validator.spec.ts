import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { UpdateFeedingHabitsRecordValidator } from '../../../src/application/domain/validator/update.feeding.habits.record.validator'

describe('Validators: UpdateFeedingHabitsRecordValidator', () => {

    const activityJSON = Object.assign(DefaultEntityMock.FEEDING_HABITS_RECORD, {})
    const activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(activityJSON)

    it('should return undefined when the validation is successful', () => {
        const result = UpdateFeedingHabitsRecordValidator.validate(activity)
        assert.isUndefined(result, 'no result defined')
    })

    context('when there are validation errors', () => {
        it('should throw an error for does pass invalid weekly_feeding_habits.seven_days_freq', () => {
            activity.weekly_feeding_habits![0].seven_days_freq = 'invalid'
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for weekly_food_record.seven_days_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: never, no_day, one_two_days, ' +
                    'three_four_days, five_six_days, all_days, undefined.')
            } finally {
                activity.weekly_feeding_habits![0].seven_days_freq = DefaultEntityMock.WEEKLY_FOOD_RECORD.seven_days_freq
            }
        })

        it('should throw an error for does pass invalid daily_water_glasses', () => {
            activity.daily_water_glasses = 'invalid'
            try {
                UpdateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
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
                assert.propertyVal(err, 'message', 'Value not mapped for breakfast_daily_frequency: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: never, sometimes, almost_everyday, ' +
                    'everyday, undefined.')
            }
        })
    })
})
