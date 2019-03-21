import { inject, injectable } from 'inversify'
import { IPatientService } from '../port/patient.service.interface'
import { IQuery } from '../port/query.interface'
import { Patient } from '../domain/model/patient'
import { Identifier } from '../../di/identifiers'
import { IPatientRepository } from '../port/patient.repository.interface'

@injectable()
export class PatientService implements IPatientService {
    constructor(
        @inject(Identifier.PATIENT_REPOSITORY) private readonly _repo: IPatientRepository
    ) {
    }

    public add(item: Patient): Promise<Patient> {
        return this._repo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<Patient>> {
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<Patient> {
        query.addFilter({ _id: id })
        return this._repo.findOne(query)
    }

    public remove(id: string): Promise<boolean> {
        return this._repo.delete(id)
    }

    public update(item: Patient): Promise<Patient> {
        return this._repo.update(item)
    }
}
