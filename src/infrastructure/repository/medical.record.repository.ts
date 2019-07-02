import { inject, injectable } from 'inversify'
import { BaseRepository } from './base/base.repository'
import { MedicalRecord } from '../../application/domain/model/medical.record'
import { MedicalRecordEntity } from '../entity/medical.record.entity'
import { IMedicalRecordRepository } from '../../application/port/medical.record.repository.interface'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import {Query} from "./query/query";
import {QuestionnaireTypes} from "../../application/domain/utils/questionnaire.types";

@injectable()
export class MedicalRecordRepository
    extends BaseRepository<MedicalRecord, MedicalRecordEntity> implements IMedicalRecordRepository {

    constructor(
        @inject(Identifier.MEDICAL_RECORD_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.MEDICAL_RECORD_ENTITY_MAPPER)
        readonly _entityMapper: IEntityMapper<MedicalRecord, MedicalRecordEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _entityMapper, _logger)
    }

    public count(): Promise<number> {
        return super.count(new Query().fromJSON({ filters: { type: QuestionnaireTypes.MEDICAL_RECORD } }))
    }
}
