import { IRepository } from './repository.interface'
import { FeedingHabitsRecord } from '../domain/model/feeding.habits.record'

export interface IFeedingHabitsRecordRepository extends IRepository<FeedingHabitsRecord> {
    count(): Promise<number>
}
