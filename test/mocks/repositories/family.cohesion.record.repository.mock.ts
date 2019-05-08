
import {DefaultEntityMock} from '../models/default.entity.mock'
import {FamilyCohesionRecord} from '../../../src/application/domain/model/family.cohesion.record'
import {IFamilyCohesionRecordRepository} from '../../../src/application/port/family.cohesion.record.repository.interface'
import {IQuery} from '../../../src/application/port/query.interface'

const activity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)
activity.id = DefaultEntityMock.FAMILY_COHESION_RECORD.id

export class FamilyCohesionRecordRepositoryMock implements IFamilyCohesionRecordRepository {
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

   public  create(item: FamilyCohesionRecord): Promise<FamilyCohesionRecord> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(activity.id === id)
    }

    public find(query: IQuery): Promise<Array<FamilyCohesionRecord>> {
        return Promise.resolve([activity])
    }

    public findOne(query: IQuery): Promise<FamilyCohesionRecord> {
        return Promise.resolve(activity)
    }

    public update(item: FamilyCohesionRecord): Promise<FamilyCohesionRecord> {
        return Promise.resolve(activity)
    }



}
