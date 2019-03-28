import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { PhysicalActivityHabits } from '../../application/domain/model/physical.activity.habits'
import { PhysicalActivityHabitsEntity } from '../entity/physical.activity.habits.entity'
import { IPhysicalActivityHabitsRepository } from '../../application/port/physical.activity.habits.repository.interface'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'

@injectable()
export class PhysicalActivityHabitsRepository
    extends BaseRepository<PhysicalActivityHabits, PhysicalActivityHabitsEntity>
    implements IPhysicalActivityHabitsRepository {

    constructor(
        @inject(Identifier.ACTIVITY_HABITS_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.PHYSICAL_ACTIVITY_HABITS_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<PhysicalActivityHabits, PhysicalActivityHabitsEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }
}
