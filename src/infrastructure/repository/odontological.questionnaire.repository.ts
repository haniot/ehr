import { IOdontologicalQuestionnaireRepository } from '../../application/port/odontological.questionnaire.repository.interface'
import { BaseRepository } from './base/base.repository'
import { OdontologicalQuestionnaire } from '../../application/domain/model/odontological.questionnaire'
import { OdontologicalQuestionnaireEntity } from '../entity/odontological.questionnaire.entity'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { QuestionnaireTypes } from '../../application/domain/utils/questionnaire.types'

@injectable()
export class OdontologicalQuestionnaireRepository
    extends BaseRepository<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity>
    implements IOdontologicalQuestionnaireRepository {
    constructor(
        @inject(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }

    public removeQuestionnaireFromPatient(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Model.deleteMany({ patient_id: id })
                .then((result) => resolve(!!result))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    public updateQuestionnaireResource(patientId: string, questionnaireId: string, name: string, resource: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.Model.findOneAndUpdate(
                { _id: questionnaireId, patient_id: patientId, type: QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE },
                { $set: this.buildUpdateObject(name, resource) },
                { new: true })
                .then(res => resolve(res ? res : undefined))
                .catch(err => reject(this.mongoDBErrorListener(err)))
        })
    }

    private buildUpdateObject(name: string, resource: any): any {
        switch (name) {
            case 'sociodemographic_record':
                return { sociodemographic_record: resource }
            case 'family_cohesion_record':
                return { family_cohesion_record: resource }
            case 'oral_health_record':
                return { oral_health_record: resource }
            default:
                return {}
        }
    }
}
