import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { OralHealthRecord } from '../../application/domain/model/oral.health.record'
import { OralHealthRecordEntity } from '../entity/oral.health.record.entity'
import { IOralHealthRecordRepository } from '../../application/port/oral.health.record.repository.interface'

@injectable()
export class OralHealthRecordRepository
    extends BaseRepository<OralHealthRecord, OralHealthRecordEntity>
    implements IOralHealthRecordRepository {

    constructor(
        @inject(Identifier.ORAL_HEALTH_RECORD_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.ORAL_HEALTH_RECORD_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<OralHealthRecord, OralHealthRecordEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }
}
