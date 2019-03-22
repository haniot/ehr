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

@injectable()
export class MedicalRecordService implements IMedicalRecordService {
    constructor(
        @inject(Identifier.MEDICAL_RECORD_REPOSITORY) private readonly _repo: IMedicalRecordRepository
    ) {
    }

    public add(item: MedicalRecord): Promise<MedicalRecord> {
        try {
            CreateMedicalRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<MedicalRecord>> {
        query.addFilter({ type: ActivityHabitsTypes.MEDICAL_RECORD })

        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<MedicalRecord> {
        query.addFilter({ _id: id, type: ActivityHabitsTypes.MEDICAL_RECORD })
        return this._repo.findOne(query)
    }

    public remove(id: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(id)
    }

    public update(item: MedicalRecord): Promise<MedicalRecord> {
        try {
            UpdateMedicalRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }
}
