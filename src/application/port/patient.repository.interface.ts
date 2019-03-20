import { IRepository } from './repository.interface'
import { Patient } from '../domain/model/patient'

export interface IPatientRepository extends IRepository<Patient> {
}
