import { IOdontologicalQuestionnaireService } from '../port/odontological.questionnaire.service.interface'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IOdontologicalQuestionnaireRepository } from '../port/odontological.questionnaire.repository.interface'
import { CreateOdontologicalQuestionnaireValidator } from '../domain/validator/create.odontological.questionnaire.validator'
import { OdontologicalQuestionnaire } from '../domain/model/odontological.questionnaire'
import { IQuery } from '../port/query.interface'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'
import { UpdateOdontologicalQuestionnaireResourceValidator } from '../domain/validator/update.odontological.questionnaire.resource.validator'
import { ValidationException } from '../domain/exception/validation.exception'
import { SociodemographicRecord } from '../domain/model/sociodemographic.record'
import { FamilyCohesionRecord } from '../domain/model/family.cohesion.record'
import { OralHealthRecord } from '../domain/model/oral.health.record'

@injectable()
export class OdontologicalQuestionnaireService implements IOdontologicalQuestionnaireService {

    constructor(
        @inject(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPOSITORY) private readonly  _repo: IOdontologicalQuestionnaireRepository
    ) {

    }

    public async add(item: OdontologicalQuestionnaire): Promise<OdontologicalQuestionnaire> {
        try {
            CreateOdontologicalQuestionnaireValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.create(item)
    }

    public async getAll(query: IQuery): Promise<Array<OdontologicalQuestionnaire>> {
        try {
            const patientId = query.toJSON().filters.patient_id
            if (patientId) ObjectIdValidator.validate(patientId)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({ type: QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE })
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<OdontologicalQuestionnaire> {
        try {
            ObjectIdValidator.validate(id)
            const patientId = query.toJSON().filters.patient_id
            if (patientId) ObjectIdValidator.validate(patientId)
            query.addFilter({ _id: id, type: QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE })
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.findOne(query)
    }

    public async update(item: OdontologicalQuestionnaire): Promise<OdontologicalQuestionnaire> {
        throw Error('Not implemented yet!')
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }

    public count(query: IQuery): Promise<number> {
        query.addFilter({ type: QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE })
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
            UpdateOdontologicalQuestionnaireResourceValidator.validate(name, item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.updateQuestionnaireResource(patientId, questionnaireId, name, resource)
    }

    private transform(name: string, resource: any): Promise<any> {
        try {
            switch (name) {
                case 'sociodemographic_record':
                    return Promise.resolve(new SociodemographicRecord().fromJSON(resource))
                case 'family_cohesion_record':
                    return Promise.resolve(new FamilyCohesionRecord().fromJSON(resource))
                case 'oral_health_record':
                    return Promise.resolve(new OralHealthRecord().fromJSON(resource))
                default:
                    throw new ValidationException(`Resource not mapped to odontological evaluation: ${name}`,
                        'The mapped resources are: sociodemographic_record, family_cohesion_record, ' +
                        'oral_health_record.')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
