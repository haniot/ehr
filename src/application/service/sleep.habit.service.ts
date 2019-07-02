import { inject, injectable } from 'inversify'
import { ISleepHabitService } from '../port/sleep.habit.service.interface'
import { SleepHabit } from '../domain/model/sleep.habit'
import { IQuery } from '../port/query.interface'
import { Identifier } from '../../di/identifiers'
import { ISleepHabitRepository } from '../port/sleep.habit.repository.interface'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'
import { CreateSleepHabitValidator } from '../domain/validator/create.sleep.habit.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { UpdateSleepHabitValidator } from '../domain/validator/update.sleep.habit.validator'

@injectable()
export class SleepHabitService implements ISleepHabitService {
    constructor(
        @inject(Identifier.SLEEP_HABIT_REPOSITORY) private readonly _repo: ISleepHabitRepository) {
    }

    public async add(item: SleepHabit): Promise<SleepHabit> {
        try {
            CreateSleepHabitValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.create(item)
    }

    public async getAll(query: IQuery): Promise<Array<SleepHabit>> {
        try {
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: QuestionnaireTypes.SLEEP_HABIT })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<SleepHabit> {
        try {
            ObjectIdValidator.validate(id)
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: QuestionnaireTypes.SLEEP_HABIT })
        return this._repo.findOne(query)
    }

    public async removeSleepHabit(patientId: string, sleepId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(sleepId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(sleepId)
    }

    public async update(item: SleepHabit): Promise<SleepHabit> {
        try {
            ObjectIdValidator.validate(item.patient_id!)
            item.patient_id = undefined
            UpdateSleepHabitValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }

    public count(): Promise<number> {
        return this._repo.count()
    }
}
