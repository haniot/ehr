import { FeedingHabitsRecord } from '../model/feeding.habits.record'
import { ValidationException } from '../exception/validation.exception'
import { CreateActivityHabitsRecordValidator } from './create.activity.habits.record.validator'
import { WeeklyFoodRecordValidator } from './weekly.food.record.validator'
import { BreastFeedingValidator } from './breast.feeding.validator'
import { FoodAllergyIntoleranceValidator } from './food.allergy.intolerance.validator'
import { DailyFeedingFrequencyValidator } from './daily.feeding.frequency.validator'

export class CreateFeedingHabitsRecordValidator {
    public static validate(item: FeedingHabitsRecord): void | ValidationException {
        let fields: Array<string> = []

        CreateActivityHabitsRecordValidator.validate(item)
        if (!item.weekly_feeding_habits) fields.push('weekly_feeding_habits')
        else item.weekly_feeding_habits.forEach(value => {
            const validWeeklyFoodRecord = WeeklyFoodRecordValidator.validate(item)
            fields = [...fields, ...validWeeklyFoodRecord instanceof Array ? validWeeklyFoodRecord : []]
        })
        if (!item.daily_water_glasses) fields.push('daily_water_glasses')
        if (!item.six_month_breast_feeding) fields.push('six_month_breast_feeding')
        else BreastFeedingValidator.validate(item.six_month_breast_feeding)
        if (!item.food_allergy_intolerance) fields.push('food_allergy_intolerance')
        else item.food_allergy_intolerance.forEach(value => {
            FoodAllergyIntoleranceValidator.validate(value)
        })
        if (!item.breakfast_daily_frequency) fields.push('breakfast_daily_frequency')
        else DailyFeedingFrequencyValidator.validate(item.breakfast_daily_frequency)

        fields = [...new Set(fields)]
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Feeding Habits validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
