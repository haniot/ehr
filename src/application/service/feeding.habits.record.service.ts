import { IFeedingHabitsRecordService } from '../port/feeding.habits.record.service.interface'
import { inject, injectable } from 'inversify'
import { IFeedingHabitsRecordRepository } from '../port/feeding.habits.record.repository.interface'
import { Identifier } from '../../di/identifiers'
import { FeedingHabitsRecord } from '../domain/model/feeding.habits.record'
import { IQuery } from '../port/query.interface'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'
import { CreateFeedingHabitsRecordValidator } from '../domain/validator/create.feeding.habits.record.validator'
import { UpdateFeedingHabitsRecordValidator } from '../domain/validator/update.feeding.habits.record.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { IPatientRepository } from '../port/patient.repository.interface'
import { ValidationException } from '../domain/exception/validation.exception'
import { Strings } from '../../utils/strings'

@injectable()
export class FeedingHabitsRecordService implements IFeedingHabitsRecordService {
    constructor(
        @inject(Identifier.FEEDING_HABITS_RECORD_REPOSITORY) private readonly _repo: IFeedingHabitsRecordRepository,
        @inject(Identifier.PATIENT_REPOSITORY) private readonly _patientRepo: IPatientRepository
    ) {
    }

    public async add(item: FeedingHabitsRecord): Promise<FeedingHabitsRecord> {
        try {
            CreateFeedingHabitsRecordValidator.validate(item)
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

    public async getAll(query: IQuery): Promise<Array<FeedingHabitsRecord>> {
        try {
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: QuestionnaireTypes.FEEDING_HABITS_RECORD })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<FeedingHabitsRecord> {
        try {
            ObjectIdValidator.validate(id)
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: QuestionnaireTypes.FEEDING_HABITS_RECORD })
        return this._repo.findOne(query)
    }

    public async removeFeedingHabitsRecord(patientId, feedingId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(feedingId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(feedingId)
    }

    public async update(item: FeedingHabitsRecord): Promise<FeedingHabitsRecord> {
        try {
            ObjectIdValidator.validate(item.patient_id!)
            item.patient_id = undefined
            UpdateFeedingHabitsRecordValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }
}
