import { inject, injectable } from 'inversify'
import { IPhysicalActivityHabitsService } from '../port/physical.activity.habits.service.interface'
import { IQuery } from '../port/query.interface'
import { PhysicalActivityHabits } from '../domain/model/physical.activity.habits'
import { Identifier } from '../../di/identifiers'
import { IPhysicalActivityHabitsRepository } from '../port/physical.activity.habits.repository.interface'
import { ActivityHabitsTypes } from '../domain/utils/activity.habits.types'
import { CreatePhysicalActivityHabitsValidator } from '../domain/validator/create.physical.activity.habits.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { UpdatePhysicalActivityHabitsValidator } from '../domain/validator/update.physical.activity.habits.validator'
import { IPatientRepository } from '../port/patient.repository.interface'
import { ValidationException } from '../domain/exception/validation.exception'
import { Strings } from '../../utils/strings'

@injectable()
export class PhysicalActivityHabitsService implements IPhysicalActivityHabitsService {
    constructor(
        @inject(Identifier.PHYSICAL_ACTIVITY_HABITS_REPOSITORY)
        private readonly _repo: IPhysicalActivityHabitsRepository,
        @inject(Identifier.PATIENT_REPOSITORY) private readonly _patientRepo: IPatientRepository
    ) {
    }

    public async add(item: PhysicalActivityHabits): Promise<PhysicalActivityHabits> {
        try {
            CreatePhysicalActivityHabitsValidator.validate(item)
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

    public async getAll(query: IQuery): Promise<Array<PhysicalActivityHabits>> {
        query.addFilter({ type: ActivityHabitsTypes.PHYSICAL_ACTIVITY_HABITS })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<PhysicalActivityHabits> {
        try {
            ObjectIdValidator.validate(id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: ActivityHabitsTypes.PHYSICAL_ACTIVITY_HABITS })
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

    public async update(item: PhysicalActivityHabits): Promise<PhysicalActivityHabits> {
        try {
            UpdatePhysicalActivityHabitsValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }
}
