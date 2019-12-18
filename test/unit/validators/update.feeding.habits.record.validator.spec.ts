import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { UpdateFeedingHabitsRecordValidator } from '../../../src/application/domain/validator/update.feeding.habits.record.validator'
import { SevenDaysFeedingFrequencyTypes } from '../../../src/application/domain/utils/seven.days.feeding.frequency.types'
import { OneDayFeedingAmountTypes } from '../../../src/application/domain/utils/one.day.feeding.amount.types'
import { BreakfastFeedingTypes } from '../../../src/application/domain/utils/breakfast.feeding.types'
import { FoodAllergyIntoleranceTypes } from '../../../src/application/domain/utils/food.allergy.intolerance.types'
import { DailyFeedingFrequencyTypes } from '../../../src/application/domain/utils/daily.feeding.frequency.types'
import { FoodTypes } from '../../../src/application/domain/utils/food.types'

describe('Validators: UpdateFeedingHabitsRecordValidator', () => {

    const activityJSON = Object.assign(DefaultEntityMock.FEEDING_HABITS_RECORD, {})
    const activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(activityJSON)

    it('should return undefined when the validation is successful', () => {
        const result = UpdateFeedingHabitsRecordValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does pass invalid weekly_feeding_habits.seven_days_freq', () => {
            const wrongActivity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON({
                weekly_feeding_habits: [{
                    food: FoodTypes.BURGER_SAUSAGE,
                    seven_days_freq: 'invalid'
                }],
                daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
                six_month_breast_feeding: BreakfastFeedingTypes.COMPLEMENTARY,
                food_allergy_intolerance: [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER],
                breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY
            })
            try {
                UpdateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for weekly_food_record.seven_days_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: never, no_day, one_two_days, ' +
                    'three_four_days, five_six_days, all_days, undefined.')
            }
        })

        it('should throw an error for does pass invalid daily_water_glasses', () => {
            const wrongActivity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON({
                weekly_feeding_habits: [{
                    food: FoodTypes.BURGER_SAUSAGE,
                    seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
                }],
                daily_water_glasses: 'invalid',
                six_month_breast_feeding: BreakfastFeedingTypes.COMPLEMENTARY,
                food_allergy_intolerance: [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER],
                breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY
            })
            try {
                UpdateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for daily_water_glasses: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, one_two, three_four, five_more, ' +
                    'undefined.')
            }
        })

        it('should throw an error for does pass invalid six_month_breast_feeding', () => {
            const wrongActivity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON({
                weekly_feeding_habits: [{
                    food: FoodTypes.BURGER_SAUSAGE,
                    seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
                }],
                daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
                six_month_breast_feeding: 'invalid',
                food_allergy_intolerance: [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER],
                breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY
            })
            try {
                UpdateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for six_month_breast_feeding: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: exclusive, complementary, ' +
                    'infant_formulas, other, undefined.')
            }
        })

        it('should throw an error for does pass invalid food_allergy_intolerance', () => {
            const wrongActivity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON({
                weekly_feeding_habits: [{
                    food: FoodTypes.BURGER_SAUSAGE,
                    seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
                }],
                daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
                six_month_breast_feeding: BreakfastFeedingTypes.COMPLEMENTARY,
                food_allergy_intolerance: ['invalid'],
                breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY

            })
            try {
                UpdateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for food_allergy_intolerance: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: gluten, aplv, lactose, dye, egg, ' +
                    'peanut, other, undefined.')
            }
        })

        it('should throw an error for does pass invalid breakfast_daily_frequency', () => {
            const wrongActivity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON({
                weekly_feeding_habits: [{
                    food: FoodTypes.BURGER_SAUSAGE,
                    seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
                }],
                daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
                six_month_breast_feeding: BreakfastFeedingTypes.COMPLEMENTARY,
                food_allergy_intolerance: [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER],
                breakfast_daily_frequency: 'invalid'
            })
            try {
                UpdateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for breakfast_daily_frequency: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: never, sometimes, almost_everyday, ' +
                    'everyday, undefined.')
            }
        })
    })
})
