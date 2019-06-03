import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { SleepHabit } from '../../application/domain/model/sleep.habit'
import { SleepHabitEntity } from '../entity/sleep.habit.entity'
import { ISleepHabitRepository } from '../../application/port/sleep.habit.repository.interface'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'

@injectable()
export class SleepHabitRepository extends BaseRepository<SleepHabit, SleepHabitEntity> implements ISleepHabitRepository {
    constructor(
        @inject(Identifier.SLEEP_HABIT_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.SLEEP_HABIT_ENTITY_MAPPER) readonly _entityMapper: IEntityMapper<SleepHabit, SleepHabitEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }
}
