import { IService } from './service.interface'
import { Patient } from '../domain/model/patient'

export interface IPatientService extends IService<Patient> {
    removePatient(pilotstudy_id: string, patient_id: string): Promise<boolean>
}
