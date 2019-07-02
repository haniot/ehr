import { IRepository } from './repository.interface'
import { MedicalRecord } from '../domain/model/medical.record'

export interface IMedicalRecordRepository extends IRepository<MedicalRecord> {
    count(): Promise<number>
}
