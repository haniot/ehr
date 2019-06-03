import { IService } from './service.interface'
import { FamilyCohesionRecord } from '../domain/model/family.cohesion.record'

export interface IFamilyCohesionRecordService extends IService<FamilyCohesionRecord> {
    removeFamilyCohesionRecord(patientId, familyCohesionId: string): Promise<boolean>
}
