import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { PhysicalActivityHabits } from '../../application/domain/model/physical.activity.habits'
import { PhysicalActivityHabitsEntity } from '../entity/physical.activity.habits.entity'
import { IPhysicalActivityHabitsRepository } from '../../application/port/physical.activity.habits.repository.interface'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import {Query} from "./query/query";
import {QuestionnaireTypes} from "../../application/domain/utils/questionnaire.types";

@injectable()
export class PhysicalActivityHabitsRepository
    extends BaseRepository<PhysicalActivityHabits, PhysicalActivityHabitsEntity>
    implements IPhysicalActivityHabitsRepository {

    constructor(
        @inject(Identifier.PHYSICAL_ACTIVITY_HABITS_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.PHYSICAL_ACTIVITY_HABITS_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<PhysicalActivityHabits, PhysicalActivityHabitsEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }

    public count(): Promise<number> {
        return super.count(new Query().fromJSON({ filters: { type: QuestionnaireTypes.PHYSICAL_ACTIVITY_HABITS } }))
    }
}
