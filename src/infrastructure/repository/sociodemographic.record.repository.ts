import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { SociodemographicRecord } from '../../application/domain/model/sociodemographic.record'
import { SociodemographicRecordEntity } from '../entity/sociodemographic.record.entity'
import { ISociodemographicRecordRepository } from '../../application/port/sociodemographic.record.repository.interface'

@injectable()
export class SociodemographicRecordRepository
    extends BaseRepository<SociodemographicRecord, SociodemographicRecordEntity>
    implements ISociodemographicRecordRepository {

    constructor(
        @inject(Identifier.SOCIODEMOGRAPHIC_RECORD_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.SOCIODEMOGRAPHIC_RECORD_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<SociodemographicRecord, SociodemographicRecordEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }
}
