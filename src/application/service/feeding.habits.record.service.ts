import { IFeedingHabitsRecordService } from '../port/feeding.habits.record.service.interface'
import { inject, injectable } from 'inversify'
import { IFeedingHabitsRecordRepository } from '../port/feeding.habits.record.repository.interface'
import { Identifier } from '../../di/identifiers'
import { FeedingHabitsRecord } from '../domain/model/feeding.habits.record'
import { IQuery } from '../port/query.interface'
import { ActivityHabitsTypes } from '../domain/utils/activity.habits.types'
import { CreateFeedingHabitsRecordValidator } from '../domain/validator/create.feeding.habits.record.validator'
import { UpdateFeedingHabitsRecordValidator } from '../domain/validator/update.feeding.habits.record.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'

@injectable()
export class FeedingHabitsRecordService implements IFeedingHabitsRecordService {
    constructor(
        @inject(Identifier.FEEDING_HABITS_RECORD_REPOSITORY) private readonly _repo: IFeedingHabitsRecordRepository
    ) {
    }

    public add(item: FeedingHabitsRecord): Promise<FeedingHabitsRecord> {
        try {
            CreateFeedingHabitsRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
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
        try {
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(id)
    }

    public update(item: FeedingHabitsRecord): Promise<FeedingHabitsRecord> {
        try {
            UpdateFeedingHabitsRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }
}
