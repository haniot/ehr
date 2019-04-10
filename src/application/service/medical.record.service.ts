import { inject, injectable } from 'inversify'
import { IMedicalRecordService } from '../port/medical.record.service.interface'
import { IQuery } from '../port/query.interface'
import { MedicalRecord } from '../domain/model/medical.record'
import { Identifier } from '../../di/identifiers'
import { IMedicalRecordRepository } from '../port/medical.record.repository.interface'
import { ActivityHabitsTypes } from '../domain/utils/activity.habits.types'
import { CreateMedicalRecordValidator } from '../domain/validator/create.medical.record.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { UpdateMedicalRecordValidator } from '../domain/validator/update.medical.record.validator'
import { ValidationException } from '../domain/exception/validation.exception'
import { Strings } from '../../utils/strings'
import { IPatientRepository } from '../port/patient.repository.interface'

@injectable()
export class MedicalRecordService implements IMedicalRecordService {
    constructor(
        @inject(Identifier.MEDICAL_RECORD_REPOSITORY) private readonly _repo: IMedicalRecordRepository,
        @inject(Identifier.PATIENT_REPOSITORY) private readonly _patientRepo: IPatientRepository
    ) {
    }

    public async add(item: MedicalRecord): Promise<MedicalRecord> {
        try {
            CreateMedicalRecordValidator.validate(item)
            if (item.patient_id) {
                const patientExists = await this._patientRepo.checkExists(item.patient_id)
                if (!patientExists) {
                    throw new ValidationException(
                        Strings.PATIENT.NOT_FOUND,
                        Strings.PATIENT.NOT_FOUND_DESCRIPTION
                    )
                }
            }
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.create(item)
    }

    public async getAll(query: IQuery): Promise<Array<MedicalRecord>> {
        try {
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: ActivityHabitsTypes.MEDICAL_RECORD })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<MedicalRecord> {
        try {
            ObjectIdValidator.validate(id)
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: ActivityHabitsTypes.MEDICAL_RECORD })
        return this._repo.findOne(query)
    }

    public async removeMedicalRecord(patientId: string, medicalId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(medicalId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(medicalId)
    }

    public async update(item: MedicalRecord): Promise<MedicalRecord> {
        try {
            ObjectIdValidator.validate(item.patient_id!)
            item.patient_id = undefined
            UpdateMedicalRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }
}
