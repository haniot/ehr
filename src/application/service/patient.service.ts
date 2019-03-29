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
        try {
            const pilotstudy_id = query.toJSON().filters.pilotstudy_id
            ObjectIdValidator.validate(pilotstudy_id)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<Patient> {
        try {
            const pilotstudy_id = query.toJSON().filters.pilotstudy_id
            ObjectIdValidator.validate(pilotstudy_id)
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id })
        return this._repo.findOne(query)
    }

    public async removePatient(pilostudy_id: string, patient_id: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(pilostudy_id)
            ObjectIdValidator.validate(patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(patient_id)
    }

    public async update(item: Patient): Promise<Patient> {
        try {
            ObjectIdValidator.validate(item.pilotstudy_id!)
            item.pilotstudy_id = undefined
            UpdatePatientValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async remove(id: string): Promise<boolean> {
        throw new Error('Not implemented yet.')
    }
}
