import { inject, injectable } from 'inversify'
import { IPhysicalActivityHabitsService } from '../port/physical.activity.habits.service.interface'
import { IQuery } from '../port/query.interface'
import { PhysicalActivityHabits } from '../domain/model/physical.activity.habits'
import { Identifier } from '../../di/identifiers'
import { IPhysicalActivityHabitsRepository } from '../port/physical.activity.habits.repository.interface'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'
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
        try {
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: QuestionnaireTypes.PHYSICAL_ACTIVITY_HABITS })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<PhysicalActivityHabits> {
        try {
            ObjectIdValidator.validate(id)
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: QuestionnaireTypes.PHYSICAL_ACTIVITY_HABITS })
        return this._repo.findOne(query)
    }

    public async removePhysicalActivityHabits(patientId: string, physicalId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(physicalId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(physicalId)
    }

    public async update(item: PhysicalActivityHabits): Promise<PhysicalActivityHabits> {
        try {
            ObjectIdValidator.validate(item.patient_id!)
            item.patient_id = undefined
            UpdatePhysicalActivityHabitsValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }
}
