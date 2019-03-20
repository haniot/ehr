import { ActivityHabitsRecordEntityMapper } from './activity.habits.record.entity.mapper'
import { IEntityMapper } from '../../port/entity.mapper.interface'
import { FeedingHabitsRecord } from '../../../application/domain/model/feeding.habits.record'
import { FeedingHabitsRecordEntity } from '../feeding.habits.record.entity'
import { WeeklyFoodRecord } from '../../../application/domain/model/weekly.food.record'
import { injectable } from 'inversify'

@injectable()
export class FeedingHabitsRecordEntityMapper
    extends ActivityHabitsRecordEntityMapper implements IEntityMapper<FeedingHabitsRecord, FeedingHabitsRecordEntity> {

    public jsonToModel(json: any): FeedingHabitsRecord {
        const result: FeedingHabitsRecord = new FeedingHabitsRecord()
        if (!json) return result

        super.jsonToModel(json)
        if (json.weekly_feeding_habits !== undefined && json.weekly_feeding_habits.length > 0) {
            result.weekly_feeding_habits =
                json.weekly_feeding_habits.map(value => new WeeklyFoodRecord().fromJSON(value))
        }
        if (json.daily_water_glasses !== undefined) result.daily_water_glasses = json.daily_water_glasses
        if (json.six_month_breast_feeding !== undefined) result.six_month_breast_feeding = json.six_month_breast_feeding
        if (json.food_allergy_intolerance !== undefined && json.food_allergy_intolerance.length > 0) {
            result.food_allergy_intolerance = json.food_allergy_intolerance.map(value => value instanceof String)
        }
        if (json.breakfast_daily_frequency !== undefined) result.breakfast_daily_frequency = json.breakfast_daily_frequency

        return result
    }

    public modelEntityToModel(item: FeedingHabitsRecordEntity): FeedingHabitsRecord {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: FeedingHabitsRecord): FeedingHabitsRecordEntity {
        const result: FeedingHabitsRecordEntity = new FeedingHabitsRecordEntity()

        super.modelToModelEntity(item)
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
