import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { INutritionalQuestionnaireRepository } from '../port/nutritional.questionnaire.repository'
import { INutritionalQuestionnaireService } from '../port/nutritional.questionnaire.service'
import { NutritionalQuestionnaire } from '../domain/model/nutritional.questionnaire'
import { CreateNutritionalQuestionnaireValidator } from '../domain/validator/create.nutritional.questionnaire.validator'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'
import { IQuery } from '../port/query.interface'
import { ValidationException } from '../domain/exception/validation.exception'
import { PhysicalActivityHabits } from '../domain/model/physical.activity.habits'
import { SleepHabit } from '../domain/model/sleep.habit'
import { FeedingHabitsRecord } from '../domain/model/feeding.habits.record'
import { MedicalRecord } from '../domain/model/medical.record'
import { UpdateNutritionalQuestionnaireResourceValidator } from '../domain/validator/update.nutritional.questionnaire.resource.validator'

@injectable()
export class NutritionalQuestionnaireService implements INutritionalQuestionnaireService {
    constructor(
        @inject(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPOSITORY)
        private readonly  _repo: INutritionalQuestionnaireRepository
    ) {
    }

    public async add(item: NutritionalQuestionnaire): Promise<NutritionalQuestionnaire> {
        try {
            CreateNutritionalQuestionnaireValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.create(item)
    }

    public async getAll(query: IQuery): Promise<Array<NutritionalQuestionnaire>> {
        try {
            const patientId = query.toJSON().filters.patient_id
            if (patientId) ObjectIdValidator.validate(patientId)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: QuestionnaireTypes.NUTRITIONAL_QUESTIONNAIRE })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<NutritionalQuestionnaire> {
        try {
            ObjectIdValidator.validate(id)
            const patientId = query.toJSON().filters.patient_id
            if (patientId) ObjectIdValidator.validate(patientId)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ _id: id, type: QuestionnaireTypes.NUTRITIONAL_QUESTIONNAIRE })
        return this._repo.findOne(query)

    }

    public async update(item: NutritionalQuestionnaire): Promise<NutritionalQuestionnaire> {
        throw Error('Not implemented yet!')
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }

    public count(query: IQuery): Promise<number> {
        query.addFilter({ type: QuestionnaireTypes.NUTRITIONAL_QUESTIONNAIRE })
        return this._repo.count(query)
    }

    public removeQuestionnaire(patientId: string, questionnaireId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(questionnaireId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(questionnaireId)
    }

    public async updateQuestionnaireResource(patientId: string, questionnaireId: string, name: string, resource: any):
        Promise<any> {
        try {
            const item: any = await this.transform(name, resource)
            UpdateNutritionalQuestionnaireResourceValidator.validate(name, item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.updateQuestionnaireResource(patientId, questionnaireId, name, resource)
    }

    private transform(name: string, resource: any): Promise<any> {
        try {
            switch (name) {
                case 'physical_activity_habits':
                    return Promise.resolve(new PhysicalActivityHabits().fromJSON(resource))
                case 'sleep_habit':
                    return Promise.resolve(new SleepHabit().fromJSON(resource))
                case 'feeding_habits_record':
                    return Promise.resolve(new FeedingHabitsRecord().fromJSON(resource))
                case 'medical_record':
                    return Promise.resolve(new MedicalRecord().fromJSON(resource))
                default:
                    throw new ValidationException(`Resource not mapped to nutritional evaluation: ${name}`,
                        'The mapped resources are: physical_activity_habits, sleep_habit, ' +
                        'feeding_habits_record, medical_record.')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

}
