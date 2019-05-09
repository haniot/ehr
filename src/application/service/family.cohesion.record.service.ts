import { IFamilyCohesionRecordService } from '../port/family.cohesion.record.service.interface'
import { FamilyCohesionRecord } from '../domain/model/family.cohesion.record'
import { IQuery } from '../port/query.interface'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IFamilyCohesionRecordRepository } from '../port/family.cohesion.record.repository.interface'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'
import { CreateFamilyCohesionRecordValidator } from '../domain/validator/create.family.cohesion.record.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { UpdateFamilyCohesionRecordValidator } from '../domain/validator/update.family.cohesion.record.validator'

@injectable()
export class FamilyCohesionRecordService implements IFamilyCohesionRecordService {
    constructor(
        @inject(Identifier.FAMILY_COHESION_RECORD_REPOSITORY) private readonly _repo: IFamilyCohesionRecordRepository) {
    }

    public async add(item: FamilyCohesionRecord): Promise<FamilyCohesionRecord> {
        try {
            CreateFamilyCohesionRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.create(item)
    }

    public async getAll(query: IQuery): Promise<Array<FamilyCohesionRecord>> {
        try {
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: QuestionnaireTypes.FAMILY_COHESION_RECORD })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<FamilyCohesionRecord> {
        try {
            ObjectIdValidator.validate(id)
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: QuestionnaireTypes.FAMILY_COHESION_RECORD })
        return this._repo.findOne(query)
    }

    public async update(item: FamilyCohesionRecord): Promise<FamilyCohesionRecord> {
        try {
            ObjectIdValidator.validate(item.patient_id!)
            item.patient_id = undefined
            UpdateFamilyCohesionRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async removeFamilyCohesionRecord(patientId, familyCohesionId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(familyCohesionId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(familyCohesionId)
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }
}
