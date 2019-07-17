import { BaseRepository } from './base/base.repository'
import { NutritionalQuestionnaire } from '../../application/domain/model/nutritional.questionnaire'
import { NutritionalQuestionnaireEntity } from '../entity/nutritional.questionnaire.entity'
import { INutritionalQuestionnaireRepository } from '../../application/port/nutritional.questionnaire.repository'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'

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
}
