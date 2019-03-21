import { IEntityMapper } from '../../port/entity.mapper.interface'
import { FeedingHabitsRecord } from '../../../application/domain/model/feeding.habits.record'
import { FeedingHabitsRecordEntity } from '../feeding.habits.record.entity'
import { WeeklyFoodRecord } from '../../../application/domain/model/weekly.food.record'
import { injectable } from 'inversify'

@injectable()
export class FeedingHabitsRecordEntityMapper
    implements IEntityMapper<FeedingHabitsRecord, FeedingHabitsRecordEntity> {

    public jsonToModel(json: any): FeedingHabitsRecord {
        const result: FeedingHabitsRecord = new FeedingHabitsRecord()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.weekly_feeding_habits !== undefined && json.weekly_feeding_habits.length > 0) {
            result.weekly_feeding_habits =
                json.weekly_feeding_habits.map(value => new WeeklyFoodRecord().fromJSON(value))
        }
        if (json.daily_water_glasses !== undefined) result.daily_water_glasses = json.daily_water_glasses
        if (json.six_month_breast_feeding !== undefined) result.six_month_breast_feeding = json.six_month_breast_feeding
        if (json.food_allergy_intolerance !== undefined && json.food_allergy_intolerance.length > 0) {
            result.food_allergy_intolerance = json.food_allergy_intolerance.filter(value => {
                if (typeof value === 'string') return value
            })
        }
        if (json.breakfast_daily_frequency !== undefined) result.breakfast_daily_frequency = json.breakfast_daily_frequency

        return result
    }

    public modelEntityToModel(item: FeedingHabitsRecordEntity): FeedingHabitsRecord {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: FeedingHabitsRecord): FeedingHabitsRecordEntity {
        const result: FeedingHabitsRecordEntity = new FeedingHabitsRecordEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
        if (item.weekly_feeding_habits !== undefined && item.weekly_feeding_habits instanceof Array) {
            result.weekly_feeding_habits =
                item.weekly_feeding_habits.map(value => {
                    return new WeeklyFoodRecord().fromJSON(value)
                })
        }
        if (item.daily_water_glasses !== undefined) result.daily_water_glasses = item.daily_water_glasses
        if (item.six_month_breast_feeding !== undefined) result.six_month_breast_feeding = item.six_month_breast_feeding
        if (item.food_allergy_intolerance !== undefined && item.food_allergy_intolerance.length > 0) {
            result.food_allergy_intolerance = item.food_allergy_intolerance
        }
        if (item.breakfast_daily_frequency !== undefined) result.breakfast_daily_frequency = item.breakfast_daily_frequency
        return result
    }

    public transform(item: any): any {
        if (item instanceof FeedingHabitsRecord) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }
}
