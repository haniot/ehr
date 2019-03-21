import { IService } from './service.interface'
import { MedicalRecord } from '../domain/model/medical.record'

export interface IMedicalRecordService extends IService<MedicalRecord> {
}
