import { IMedicalRecordRepository } from '../../../src/application/port/medical.record.repository.interface'
import { IQuery } from '../../../src/application/port/query.interface'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'
import { DefaultEntityMock } from '../models/default.entity.mock'

const activity: MedicalRecord = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
activity.id = DefaultEntityMock.MEDICAL_RECORD.id

export class MedicalRecordRepositoryMock implements IMedicalRecordRepository {
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: MedicalRecord): Promise<MedicalRecord> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(id === activity.id)
    }

    public find(query: IQuery): Promise<Array<MedicalRecord>> {
        return Promise.resolve([activity])
    }

    public findOne(query: IQuery): Promise<MedicalRecord> {
        return Promise.resolve(activity)
    }

    public update(item: MedicalRecord): Promise<MedicalRecord> {
        return Promise.resolve(activity)
    }

}
