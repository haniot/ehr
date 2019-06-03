import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { FeedingHabitsRecord } from '../../application/domain/model/feeding.habits.record'
import { FeedingHabitsRecordEntity } from '../entity/feeding.habits.record.entity'
import { IFeedingHabitsRecordRepository } from '../../application/port/feeding.habits.record.repository.interface'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'

@injectable()
export class FeedingHabitsRecordRepository
    extends BaseRepository<FeedingHabitsRecord, FeedingHabitsRecordEntity>
    implements IFeedingHabitsRecordRepository {

    constructor(
        @inject(Identifier.FEEDING_HABITS_RECORD_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.FEEDING_HABITS_RECORD_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<FeedingHabitsRecord, FeedingHabitsRecordEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }
}
