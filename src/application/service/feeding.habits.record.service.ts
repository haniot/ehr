import { IFeedingHabitsRecordService } from '../port/feeding.habits.record.service.interface'
import { inject, injectable } from 'inversify'
import { IFeedingHabitsRecordRepository } from '../port/feeding.habits.record.repository.interface'
import { Identifier } from '../../di/identifiers'
import { FeedingHabitsRecord } from '../domain/model/feeding.habits.record'
import { IQuery } from '../port/query.interface'
import { ActivityHabitsTypes } from '../domain/utils/activity.habits.types'

@injectable()
export class FeedingHabitsRecordService implements IFeedingHabitsRecordService {
    constructor(
        @inject(Identifier.FEEDING_HABITS_RECORD_REPOSITORY) private readonly _repo: IFeedingHabitsRecordRepository
    ) {
    }

    public add(item: FeedingHabitsRecord): Promise<FeedingHabitsRecord> {
        return this._repo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<FeedingHabitsRecord>> {
        query.addFilter({ type: ActivityHabitsTypes.FEEDING_HABITS_RECORD })

        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<FeedingHabitsRecord> {
        query.addFilter({ _id: id, type: ActivityHabitsTypes.FEEDING_HABITS_RECORD })
        return this._repo.findOne(query)
    }

    public remove(id: string): Promise<boolean> {
        return this._repo.delete(id)
    }

    public update(item: FeedingHabitsRecord): Promise<FeedingHabitsRecord> {
        return this._repo.update(item)
    }
}
