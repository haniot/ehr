import { IOralHealthRecordService } from '../port/oral.health.record.service.interface'
import { IQuery } from '../port/query.interface'
import { OralHealthRecord } from '../domain/model/oral.health.record'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IOralHealthRecordRepository } from '../port/oral.health.record.repository.interface'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'
import { ValidationException } from '../domain/exception/validation.exception'
import { Strings } from '../../utils/strings'
import { CreateOralHealthRecordValidator } from '../domain/validator/create.oral.health.record.validator'
import { IPatientRepository } from '../port/patient.repository.interface'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { UpdateOralHealthRecordValidator } from '../domain/validator/update.oral.health.record.validator'

@injectable()
export class OralHealthRecordService implements IOralHealthRecordService {
    constructor(
        @inject(Identifier.ORAL_HEALTH_RECORD_REPOSITORY) private readonly _repo: IOralHealthRecordRepository,
        @inject(Identifier.PATIENT_REPOSITORY) private readonly _patientRepo: IPatientRepository
    ) {
    }

    public async add(item: OralHealthRecord): Promise<OralHealthRecord> {
        try {
            CreateOralHealthRecordValidator.validate(item)
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

    public async getAll(query: IQuery): Promise<Array<OralHealthRecord>> {
        try {
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: QuestionnaireTypes.ORAL_HEALTH_RECORD })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<OralHealthRecord> {
        try {
            ObjectIdValidator.validate(id)
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: QuestionnaireTypes.ORAL_HEALTH_RECORD })
        return this._repo.findOne(query)
    }

    public async update(item: OralHealthRecord): Promise<OralHealthRecord> {
        try {
            ObjectIdValidator.validate(item.patient_id!)
            item.patient_id = undefined
            UpdateOralHealthRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async removeOralHealthRecord(patientId, oralHealthId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(oralHealthId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(oralHealthId)
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }
}
