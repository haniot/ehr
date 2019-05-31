
import {DefaultEntityMock} from '../models/default.entity.mock'
import {IQuery} from '../../../src/application/port/query.interface'
import {OralHealthRecord} from '../../../src/application/domain/model/oral.health.record'
import {IOralHealthRecordRepository} from '../../../src/application/port/oral.health.record.repository.interface'

const activity: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
activity.id = DefaultEntityMock.ORAL_HEALTH_RECORD.id

export class OralHealthRecordRepositoryMock implements IOralHealthRecordRepository {
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: OralHealthRecord): Promise<OralHealthRecord> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(id === activity.id)
    }

    public find(query: IQuery): Promise<Array<OralHealthRecord>> {
        return Promise.resolve([activity])
    }

    public findOne(query: IQuery): Promise<OralHealthRecord> {
        return Promise.resolve(activity)
    }

    public update(item: OralHealthRecord): Promise<OralHealthRecord> {
        return Promise.resolve(activity)
    }

}
