import {inject, injectable} from 'inversify'
import {Identifier} from '../../di/identifiers'
import {INutritionalQuestionnaireRepository} from '../port/nutritional.questionnaire.repository'
import {INutritionalQuestionnaireService} from '../port/nutritional.questionnaire.service'
import {NutritionalQuestionnaire} from '../domain/model/nutritional.questionnaire'
import {CreateNutritionalQuestionnaireValidator} from '../domain/validator/create.nutritional.questionnaire.validator'
import {ObjectIdValidator} from '../domain/validator/object.id.validator'
import {QuestionnaireTypes} from '../domain/utils/questionnaire.types'
import {IQuery} from '../port/query.interface'
import {UpdateNutritionalQuestionnaireValidator} from '../domain/validator/update.nutritional.questionnaire.validator'

@injectable()
export class NutritionalQuestionnaireService implements INutritionalQuestionnaireService {

    constructor(
        @inject(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPOSITORY) private readonly  _repo: INutritionalQuestionnaireRepository
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
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({type: QuestionnaireTypes.NUTRITIONAL_QUESTIONNAIRE})
        return this._repo.find(query)
    }

    public async getById(id: string, query: IQuery): Promise<NutritionalQuestionnaire> {
        try {
            ObjectIdValidator.validate(id)
            ObjectIdValidator.validate(query.toJSON().filters.patient_id)
        } catch (err) {
            return Promise.reject(err)
        }
        query.addFilter({_id: id, type: QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE})
        return this._repo.findOne(query)

    }

    public async update(item: NutritionalQuestionnaire): Promise<NutritionalQuestionnaire> {
        try {
            ObjectIdValidator.validate(item.patient_id!)
            item.patient_id = undefined
            UpdateNutritionalQuestionnaireValidator.validate(item)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.update(item)
    }

    public async remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }

    public async removeNutrionalQuestionnaire(patientId: string, nutritionalQuestionnaireId: string): Promise<boolean> {
        try {
            ObjectIdValidator.validate(patientId)
            ObjectIdValidator.validate(nutritionalQuestionnaireId)
        } catch (err) {
            return Promise.reject(err)
        }
        return this._repo.delete(nutritionalQuestionnaireId)
    }
}
