import { ISleepHabitRepository } from '../../../src/application/port/sleep.habit.repository.interface'
import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'
import { IQuery } from '../../../src/application/port/query.interface'
import { DefaultEntityMock } from '../models/default.entity.mock'

const activity: SleepHabit = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)
activity.id = DefaultEntityMock.SLEEP_HABIT.id

export class SleepHabitRepositoryMock implements ISleepHabitRepository {
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: SleepHabit): Promise<SleepHabit> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(id === activity.id)
    }

    public find(query: IQuery): Promise<Array<SleepHabit>> {
        return Promise.resolve([activity])
    }

    public findOne(query: IQuery): Promise<SleepHabit> {
        return Promise.resolve(activity)
    }

    public update(item: SleepHabit): Promise<SleepHabit> {
        return Promise.resolve(activity)
    }

}
