import {IOdontologicalQuestionnaireRepository} from '../../application/port/odontological.questionnaire.repository.interface'
import {BaseRepository} from './base/base.repository'
import {OdontologicalQuestionnaire} from '../../application/domain/model/odontological.questionnaire'
import {OdontologicalQuestionnaireEntity} from '../entity/odontological.questionnaire.entity'
import {inject, injectable} from 'inversify'
import {Identifier} from '../../di/identifiers'
import {IEntityMapper} from '../port/entity.mapper.interface'
import {ILogger} from '../../utils/custom.logger'

@injectable()
export class OdontologicalQuestionnaireRepository
    extends BaseRepository<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity>
    implements IOdontologicalQuestionnaireRepository {

    constructor(
        @inject(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_ENTITY_MAPPER)
        readonly _entityMappser: IEntityMapper<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    )
    {
    super(_repoModel, _entityMappser, _logger)
}

}
