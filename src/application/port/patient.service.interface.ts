import { IService } from './service.interface'
import { Patient } from '../domain/model/patient'

export interface IPatientService extends IService<Patient> {
    removePatient(pilotId: string, patientId: string): Promise<boolean>
}
