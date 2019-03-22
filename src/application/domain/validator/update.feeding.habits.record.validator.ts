import { FeedingHabitsRecord } from '../model/feeding.habits.record'
import { ValidationException } from '../exception/validation.exception'
import { WeeklyFoodRecordValidator } from './weekly.food.record.validator'
import { BreastFeedingValidator } from './breast.feeding.validator'
import { FoodAllergyIntoleranceValidator } from './food.allergy.intolerance.validator'
import { DailyFeedingFrequencyValidator } from './daily.feeding.frequency.validator'
import { UpdateActivityHabitsRecordValidator } from './update.activity.habits.record.validator'

export class UpdateFeedingHabitsRecordValidator {
    public static validate(item: FeedingHabitsRecord): void | ValidationException {
        UpdateActivityHabitsRecordValidator.validate(item)
        if (item.weekly_feeding_habits) item.weekly_feeding_habits.forEach(value => {
            WeeklyFoodRecordValidator.validate(value)
        })
        if (item.six_month_breast_feeding) BreastFeedingValidator.validate(item.six_month_breast_feeding)
        if (item.food_allergy_intolerance) item.food_allergy_intolerance.forEach(value => {
            FoodAllergyIntoleranceValidator.validate(value)
        })
        if (item.breakfast_daily_frequency) DailyFeedingFrequencyValidator.validate(item.breakfast_daily_frequency)
    }
}
