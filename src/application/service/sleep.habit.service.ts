import { inject, injectable } from 'inversify'
import { ISleepHabitService } from '../port/sleep.habit.service.interface'
import { SleepHabit } from '../domain/model/sleep.habit'
import { IQuery } from '../port/query.interface'
import { Identifier } from '../../di/identifiers'
import { ISleepHabitRepository } from '../port/sleep.habit.repository.interface'
import { ActivityHabitsTypes } from '../domain/utils/activity.habits.types'

@injectable()
export class SleepHabitService implements ISleepHabitService {
    constructor(
        @inject(Identifier.SLEEP_HABIT_REPOSITORY) private readonly _repo: ISleepHabitRepository
    ) {
    }

    public add(item: SleepHabit): Promise<SleepHabit> {
        return this._repo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<SleepHabit>> {
        query.addFilter({ type: ActivityHabitsTypes.SLEEP_HABIT })
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<SleepHabit> {
        query.addFilter({ _id: id, type: ActivityHabitsTypes.SLEEP_HABIT })
        return this._repo.findOne(query)
    }

    public remove(id: string): Promise<boolean> {
        return this._repo.delete(id)
    }

    public update(item: SleepHabit): Promise<SleepHabit> {
        return this._repo.update(item)
    }
}
