import { IRepository } from './repository.interface'
import { OralHealthRecord } from '../domain/model/oral.health.record'

export interface IOralHealthRecordRepository extends IRepository<OralHealthRecord> {
}
