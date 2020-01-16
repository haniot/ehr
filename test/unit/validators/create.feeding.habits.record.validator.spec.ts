import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { CreateFeedingHabitsRecordValidator } from '../../../src/application/domain/validator/create.feeding.habits.record.validator'
import { assert } from 'chai'
import { WeeklyFoodRecord } from '../../../src/application/domain/model/weekly.food.record'
import { FoodTypes } from '../../../src/application/domain/utils/food.types'
import { SevenDaysFeedingFrequencyTypes } from '../../../src/application/domain/utils/seven.days.feeding.frequency.types'
import { OneDayFeedingAmountTypes } from '../../../src/application/domain/utils/one.day.feeding.amount.types'
import { BreakfastFeedingTypes } from '../../../src/application/domain/utils/breakfast.feeding.types'
import { FoodAllergyIntoleranceTypes } from '../../../src/application/domain/utils/food.allergy.intolerance.types'
import { DailyFeedingFrequencyTypes } from '../../../src/application/domain/utils/daily.feeding.frequency.types'

describe('Validators: CreateFeedingHabitsRecordValidator', () => {
    const activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = CreateFeedingHabitsRecordValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {

        it('should throw an error for does not pass weekly_feeding_habits', () => {
            activity.weekly_feeding_habits = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Feeding Habits validation: weekly_feeding_habits is required!')
            } finally {
                activity.weekly_feeding_habits = [new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)]
            }
        })

        it('should throw an error for does not pass weekly_feeding_habits.food', () => {
            activity.weekly_feeding_habits![0].food = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.
                propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Weekly Food Record validation: food required!')
            } finally {
                activity.weekly_feeding_habits = [new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)]
            }
        })
        it('should throw an error for does pass invalid weekly_feeding_habits.food', () => {
            const wrongActivity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON({
                weekly_feeding_habits: [{
                    food: 'invalid',
                    seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
                }],
                daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
                six_month_breast_feeding: BreakfastFeedingTypes.COMPLEMENTARY,
                food_allergy_intolerance: [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER],
                breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY
            })
            try {
                CreateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for weekly_food_record.food: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: fish_chicken_meat, soda, salad_vegetable,' +
                    ' fried_salt_food, milk, bean, fruits, candy_sugar_cookie, burger_sausage.')
            }
        })

        it('should throw an error for does not pass weekly_feeding_habits.seven_days_freq', () => {
            activity.weekly_feeding_habits![0].seven_days_freq = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Weekly Food Record validation: seven_days_freq required!')
            } finally {
                activity.weekly_feeding_habits = [new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)]
            }
        })

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
                CreateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for weekly_food_record.seven_days_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: never, no_day, one_two_days, ' +
                    'three_four_days, five_six_days, all_days, undefined.')
            }
        })

        it('should throw an error for does not pass daily_water_glasses', () => {
            activity.daily_water_glasses = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: daily_water_glasses is required!')
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
                CreateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for daily_water_glasses: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, one_two, three_four, five_more, ' +
                    'undefined.')
            }
        })

        it('should throw an error for does not pass six_month_breast_feeding', () => {
            activity.daily_water_glasses = OneDayFeedingAmountTypes.FIVE_MORE
            activity.six_month_breast_feeding = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: six_month_breast_feeding is required!')
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
                CreateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for six_month_breast_feeding: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: exclusive, complementary, ' +
                    'infant_formulas, other, undefined.')
            }
        })

        it('should throw an error for does not pass food_allergy_intolerance', () => {
            activity.six_month_breast_feeding = BreakfastFeedingTypes.COMPLEMENTARY
            activity.food_allergy_intolerance = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: food_allergy_intolerance is required!')
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
                CreateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for food_allergy_intolerance: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: gluten, aplv, lactose, dye, egg, ' +
                    'peanut, other, undefined.')
            }
        })

        it('should throw an error for does not pass breakfast_daily_frequency', () => {
            activity.food_allergy_intolerance = [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER]
            activity.breakfast_daily_frequency = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: breakfast_daily_frequency is required!')
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
                CreateFeedingHabitsRecordValidator.validate(wrongActivity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for breakfast_daily_frequency: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: never, sometimes, almost_everyday, ' +
                    'everyday, undefined.')
            }
        })
    })
})
