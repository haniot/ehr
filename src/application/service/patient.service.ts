import { inject, injectable } from 'inversify'
import { IPatientService } from '../port/patient.service.interface'
import { IQuery } from '../port/query.interface'
import { Patient } from '../domain/model/patient'
import { Identifier } from '../../di/identifiers'
import { IPatientRepository } from '../port/patient.repository.interface'
import { CreatePatientValidator } from '../domain/validator/create.patient.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { UpdatePatientValidator } from '../domain/validator/update.patient.validator'

@injectable()
export class PatientService implements IPatientService {
    constructor(
        @inject(Identifier.PATIENT_REPOSITORY) private readonly _repo: IPatientRepository
    ) {
    }

    public async add(item: Patient): Promise<Patient> {
        try {
            CreatePatientValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.create(item)
    }

    public async getAll(query: IQuery): Promise<Array<Patient>> {
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<Patient> {
        try {
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id })
        return this._repo.findOne(query)
    }

    public async remove(id: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(id)
    }

    public async update(item: Patient): Promise<Patient> {
        try {
            UpdatePatientValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }
}
