import { IService } from './service.interface'
import { OralHealthRecord } from '../domain/model/oral.health.record'

export interface IOralHealthRecordService extends IService<OralHealthRecord> {
    removeOralHealthRecord(patientId, oralHealthId: string): Promise<boolean>
}
