import { FeedingHabitsRecord } from '../model/feeding.habits.record'
import { ValidationException } from '../exception/validation.exception'
import { WeeklyFoodRecordValidator } from './weekly.food.record.validator'
import { BreastFeedingTypesValidator } from './breast.feeding.types.validator'
import { FoodAllergyIntoleranceTypesValidator } from './food.allergy.intolerance.types.validator'
import { DailyFeedingFrequencyTypesValidator } from './daily.feeding.frequency.types.validator'
import { OneDayFeedingAmountTypesValidator } from './one.day.feeding.amount.types.validator'
import { WeeklyFoodRecord } from '../model/weekly.food.record'

export class UpdateFeedingHabitsRecordValidator {
    public static validate(item: FeedingHabitsRecord): void | ValidationException {
        if (item.weekly_feeding_habits)
            item.weekly_feeding_habits.forEach((value: WeeklyFoodRecord) => WeeklyFoodRecordValidator.validate(value))
        if (item.daily_water_glasses) OneDayFeedingAmountTypesValidator.validate(item.daily_water_glasses)
        if (item.six_month_breast_feeding) BreastFeedingTypesValidator.validate(item.six_month_breast_feeding)
        if (item.food_allergy_intolerance) item.food_allergy_intolerance.forEach(value => {
            FoodAllergyIntoleranceTypesValidator.validate(value)
        })
        if (item.breakfast_daily_frequency) DailyFeedingFrequencyTypesValidator.validate(item.breakfast_daily_frequency)
    }
}
