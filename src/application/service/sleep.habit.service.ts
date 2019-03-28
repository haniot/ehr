import { inject, injectable } from 'inversify'
import { ISleepHabitService } from '../port/sleep.habit.service.interface'
import { SleepHabit } from '../domain/model/sleep.habit'
import { IQuery } from '../port/query.interface'
import { Identifier } from '../../di/identifiers'
import { ISleepHabitRepository } from '../port/sleep.habit.repository.interface'
import { ActivityHabitsTypes } from '../domain/utils/activity.habits.types'
import { CreateSleepHabitValidator } from '../domain/validator/create.sleep.habit.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { UpdateSleepHabitValidator } from '../domain/validator/update.sleep.habit.validator'
import { IPatientRepository } from '../port/patient.repository.interface'
import { ValidationException } from '../domain/exception/validation.exception'
import { Strings } from '../../utils/strings'

@injectable()
export class SleepHabitService implements ISleepHabitService {
    constructor(
        @inject(Identifier.SLEEP_HABIT_REPOSITORY) private readonly _repo: ISleepHabitRepository,
        @inject(Identifier.PATIENT_REPOSITORY) private readonly _patientRepo: IPatientRepository
    ) {
    }

    public async add(item: SleepHabit): Promise<SleepHabit> {
        try {
            CreateSleepHabitValidator.validate(item)
            if (item.patient_id) {
                const patientExists = await this._patientRepo.checkExists(item.patient_id)
                console.log(item.patient_id, patientExists)
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

    public async getAll(query: IQuery): Promise<Array<SleepHabit>> {
        query.addFilter({ type: ActivityHabitsTypes.SLEEP_HABIT })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<SleepHabit> {
        try {
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: ActivityHabitsTypes.SLEEP_HABIT })
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

    public async update(item: SleepHabit): Promise<SleepHabit> {
        try {
            UpdateSleepHabitValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }
}
