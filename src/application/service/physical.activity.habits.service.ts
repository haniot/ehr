import { inject, injectable } from 'inversify'
import { IPhysicalActivityHabitsService } from '../port/physical.activity.habits.service.interface'
import { IQuery } from '../port/query.interface'
import { PhysicalActivityHabits } from '../domain/model/physical.activity.habits'
import { Identifier } from '../../di/identifiers'
import { IPhysicalActivityHabitsRepository } from '../port/physical.activity.habits.repository.interface'
import { ActivityHabitsTypes } from '../domain/utils/activity.habits.types'

@injectable()
export class PhysicalActivityHabitsService implements IPhysicalActivityHabitsService {
    constructor(
        @inject(Identifier.PHYSICAL_ACTIVITY_HABITS_REPOSITORY) private readonly _repo: IPhysicalActivityHabitsRepository
    ) {
    }

    public add(item: PhysicalActivityHabits): Promise<PhysicalActivityHabits> {
        return this._repo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<PhysicalActivityHabits>> {
        query.addFilter({ type: ActivityHabitsTypes.PHYSICAL_ACTIVITY_HABITS })
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<PhysicalActivityHabits> {
        query.addFilter({ _id: id, type: ActivityHabitsTypes.PHYSICAL_ACTIVITY_HABITS })
        return this._repo.findOne(query)
    }

    public remove(id: string): Promise<boolean> {
        return this._repo.delete(id)
    }

    public update(item: PhysicalActivityHabits): Promise<PhysicalActivityHabits> {
        return this._repo.update(item)
    }
}
