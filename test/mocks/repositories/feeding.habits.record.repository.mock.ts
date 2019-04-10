import { IFeedingHabitsRecordRepository } from '../../../src/application/port/feeding.habits.record.repository.interface'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { IQuery } from '../../../src/application/port/query.interface'
import { DefaultEntityMock } from '../models/default.entity.mock'

const activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)
activity.id = DefaultEntityMock.FEEDING_HABITS_RECORD.id

export class FeedingHabitsRecordRepositoryMock implements IFeedingHabitsRecordRepository {
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: FeedingHabitsRecord): Promise<FeedingHabitsRecord> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(id === activity.id)
    }

    public find(query: IQuery): Promise<Array<FeedingHabitsRecord>> {
        return Promise.resolve([activity])
    }

    public findOne(query: IQuery): Promise<FeedingHabitsRecord> {
        return Promise.resolve(activity)
    }

    public update(item: FeedingHabitsRecord): Promise<FeedingHabitsRecord> {
        return Promise.resolve(activity)
    }

}
