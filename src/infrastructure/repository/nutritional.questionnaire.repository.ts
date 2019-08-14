import { BaseRepository } from './base/base.repository'
import { NutritionalQuestionnaire } from '../../application/domain/model/nutritional.questionnaire'
import { NutritionalQuestionnaireEntity } from '../entity/nutritional.questionnaire.entity'
import { INutritionalQuestionnaireRepository } from '../../application/port/nutritional.questionnaire.repository'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { QuestionnaireTypes } from '../../application/domain/utils/questionnaire.types'

export class NutritionalQuestionnaireRepository extends BaseRepository<NutritionalQuestionnaire, NutritionalQuestionnaireEntity>
    implements INutritionalQuestionnaireRepository {
    constructor(
        @inject(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.NUTRITIONAL_QUESTIONNAIRE_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<NutritionalQuestionnaire, NutritionalQuestionnaireEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }

    public removeQuestionnairesFromPatient(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Model.deleteMany({ patient_id: id })
                .then((result) => resolve(!!result))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public updateQuestionnaireResource(patientId: string, questionnaireId: string, name: string, resource: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.Model.findOneAndUpdate(
                { _id: questionnaireId, patient_id: patientId, type: QuestionnaireTypes.NUTRITIONAL_QUESTIONNAIRE },
                { $set: this.buildUpdateObject(name, resource) },
                { new: true })
                .then(res => resolve(res ? res : undefined))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    private buildUpdateObject(name: string, resource: any): any {
        switch (name) {
            case 'sleep_habit':
                return { sleep_habit: resource }
            case 'physical_activity_habits':
                return { physical_activity_habits: resource }
            case 'feeding_habits_record':
                return { feeding_habits_record: resource }
            case 'medical_record':
                return { medical_record: resource }
            default:
                return {}
        }
    }
}
