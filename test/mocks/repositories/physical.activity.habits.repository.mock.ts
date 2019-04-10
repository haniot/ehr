import { IPhysicalActivityHabitsRepository } from '../../../src/application/port/physical.activity.habits.repository.interface'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { DefaultEntityMock } from '../models/default.entity.mock'
import { IQuery } from '../../../src/application/port/query.interface'

const activity: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
activity.id = DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.id

export class PhysicalActivityHabitsRepositoryMock implements IPhysicalActivityHabitsRepository {
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: PhysicalActivityHabits): Promise<PhysicalActivityHabits> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(id === activity.id)
    }

    public find(query: IQuery): Promise<Array<PhysicalActivityHabits>> {
        return Promise.resolve([activity])
    }

    public findOne(query: IQuery): Promise<PhysicalActivityHabits> {
        return Promise.resolve(activity)
    }

    public update(item: PhysicalActivityHabits): Promise<PhysicalActivityHabits> {
        return Promise.resolve(activity)
    }

}
