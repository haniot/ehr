import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { DefaultEntityMock } from '../../mocks/default.entity.mock'
import { CreateFeedingHabitsRecordValidator } from '../../../src/application/domain/validator/create.feeding.habits.record.validator'
import { assert } from 'chai'
import { WeeklyFoodRecord } from '../../../src/application/domain/model/weekly.food.record'

describe('Validators: CreateFeedingHabitsRecordValidator', () => {
    let activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)

    it('should return undefined when the validation is successful', () => {
        const result = CreateFeedingHabitsRecordValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does not pass weekly_feeding_habits', () => {
            activity.weekly_feeding_habits = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
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
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: weekly_feeding_habits.food is required!')
            } finally {
                activity.weekly_feeding_habits = [new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)]
            }
        })

        it('should throw an error for does not pass weekly_feeding_habits.seven_days_freq', () => {
            activity.weekly_feeding_habits![0].seven_days_freq = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: weekly_feeding_habits.seven_days_freq is required!')
            } finally {
                activity.weekly_feeding_habits = [new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)]
            }
        })

        it('should throw an error for does pass invalid weekly_feeding_habits.seven_days_freq', () => {
            activity.weekly_feeding_habits![0].seven_days_freq = 'invalid'
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'Value not mapped for seven_days_freq: invalid')
                assert.property(err, 'description')
                assert.propertyVal(err, 'description', 'The mapped values are: never, no_day, one_two_days, ' +
                    'three_four_days, five_six_days, all_days, undefined.')
            } finally {
                activity.weekly_feeding_habits = [new WeeklyFoodRecord().fromJSON(DefaultEntityMock.WEEKLY_FOOD_RECORD)]
            }
        })

        it('should throw an error for does not pass daily_water_glasses', () => {
            activity.daily_water_glasses = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: daily_water_glasses is required!')
            }
        })

        it('should throw an error for does pass invalid daily_water_glasses', () => {
            activity.daily_water_glasses = 'invalid'
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for daily_water_glasses: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: none, one_two, three_four, five_more, ' +
                    'undefined.')
            } finally {
                activity.daily_water_glasses = DefaultEntityMock.FEEDING_HABITS_RECORD.daily_water_glasses
            }
        })

        it('should throw an error for does not pass six_month_breast_feeding', () => {
            activity.six_month_breast_feeding = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: six_month_breast_feeding is required!')
            }
        })

        it('should throw an error for does pass invalid six_month_breast_feeding', () => {
            activity.six_month_breast_feeding = 'invalid'
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for six_month_breast_feeding: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: exclusive, complementary, ' +
                    'infant_formulas, other, undefined.')
            } finally {
                activity.six_month_breast_feeding = DefaultEntityMock.FEEDING_HABITS_RECORD.six_month_breast_feeding
            }
        })

        it('should throw an error for does not pass food_allergy_intolerance', () => {
            activity.food_allergy_intolerance = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: food_allergy_intolerance is required!')
            }
        })

        it('should throw an error for does pass invalid food_allergy_intolerance', () => {
            activity.food_allergy_intolerance = ['invalid']
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for food_allergy_intolerance: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: gluten, apvl, lactose, dye, egg, ' +
                    'peanut, other, undefined.')
            } finally {
                activity.food_allergy_intolerance = DefaultEntityMock.FEEDING_HABITS_RECORD.food_allergy_intolerance
            }
        })

        it('should throw an error for does not pass breakfast_daily_frequency', () => {
            activity.breakfast_daily_frequency = undefined
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description',
                    'Feeding Habits validation: breakfast_daily_frequency is required!')
            }
        })

        it('should throw an error for does pass invalid breakfast_daily_frequency', () => {
            activity.breakfast_daily_frequency = 'invalid'
            try {
                CreateFeedingHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for breakfast_daily_frequency: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: never, sometimes, almost_everyday, ' +
                    'everyday, undefined.')
            } finally {
                activity.breakfast_daily_frequency = DefaultEntityMock.FEEDING_HABITS_RECORD.breakfast_daily_frequency
            }
        })
    })
})
