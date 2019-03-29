import { IService } from './service.interface'
import { FeedingHabitsRecord } from '../domain/model/feeding.habits.record'

export interface IFeedingHabitsRecordService extends IService<FeedingHabitsRecord> {
    removeFeedingHabitsRecord(patientId, feedingId: string): Promise<boolean>
}
