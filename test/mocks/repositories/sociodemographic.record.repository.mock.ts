import {ISociodemographicRecordRepository} from '../../../src/application/port/sociodemographic.record.repository.interface'
import {SociodemographicRecord} from '../../../src/application/domain/model/sociodemographic.record'
import {DefaultEntityMock} from '../models/default.entity.mock'
import {IQuery} from '../../../src/application/port/query.interface'

const activity : SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
activity.id = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.id
export class SociodemographicRecordRepositoryMock implements ISociodemographicRecordRepository{
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

     public create(item: SociodemographicRecord): Promise<SociodemographicRecord> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(id === activity.id)
    }

    public find(query: IQuery): Promise<Array<SociodemographicRecord>> {
        return Promise.resolve([activity])
    }

     public findOne(query: IQuery): Promise<SociodemographicRecord> {
        return Promise.resolve(activity)
    }

    public update(item: SociodemographicRecord): Promise<SociodemographicRecord> {
        return Promise.resolve(activity)
    }


}
