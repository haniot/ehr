import { IService } from './service.interface'
import { SociodemographicRecord } from '../domain/model/sociodemographic.record'

export interface ISociodemographicRecordService extends IService<SociodemographicRecord> {
    removeSociodemographicRecord(patientId, socioId: string): Promise<boolean>

}
