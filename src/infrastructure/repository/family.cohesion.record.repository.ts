import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { FamilyCohesionRecord } from '../../application/domain/model/family.cohesion.record'
import { FamilyCohesionRecordEntity } from '../entity/family.cohesion.record.entity'
import { IFamilyCohesionRecordRepository } from '../../application/port/family.cohesion.record.repository.interface'

@injectable()
export class FamilyCohesionRecordRepository
    extends BaseRepository<FamilyCohesionRecord, FamilyCohesionRecordEntity>
    implements IFamilyCohesionRecordRepository {

    constructor(
        @inject(Identifier.FAMILY_COHESION_RECORD_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.FAMILY_COHESION_RECORD_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<FamilyCohesionRecord, FamilyCohesionRecordEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }
}
