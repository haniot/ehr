import { IOdontologicalQuestionnaireService } from '../port/odontological.questionnaire.service.interface'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IOdontologicalQuestionnaireRepository } from '../port/odontological.questionnaire.repository.interface'
import { CreateOdontologicalQuestionnaireValidator } from '../domain/validator/create.odontological.questionnaire.validator'
import { OdontologicalQuestionnaire } from '../domain/model/odontological.questionnaire'
import { IQuery } from '../port/query.interface'
import { ObjectIdValidator } from '../domain/validator/object.id.validator'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'
import { UpdateOdontologicalQuestionnaireValidator } from '../domain/validator/update.odontological.questionnaire.validator'

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
            if (patientId)
                ObjectIdValidator.validate(patientId)
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
            if (patientId)
                ObjectIdValidator.validate(patientId)
            query.addFilter({ _id: id, type: QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE })
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.findOne(query)
    }

    public async update(item: OdontologicalQuestionnaire): Promise<OdontologicalQuestionnaire> {
        try {
            ObjectIdValidator.validate(item.patient_id!)
            item.patient_id = undefined
            UpdateOdontologicalQuestionnaireValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }

    public async removeOdontologicalQuestionnaire(patientId: string, odontologicalQuestionnaireId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(odontologicalQuestionnaireId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(odontologicalQuestionnaireId)
    }

    public count(query: IQuery): Promise<number> {
        return this._repo.count(query)
    }
}
