import { BaseRepository } from './base/base.repository'
import { PatientEntity } from '../entity/patient.entity'
import { Patient } from '../../application/domain/model/patient'
import { IPatientRepository } from '../../application/port/patient.repository.interface'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEntityMapper } from '../port/entity.mapper.interface'
import { ILogger } from '../../utils/custom.logger'
import { Query } from './query/query'

@injectable()
export class PatientRepository extends BaseRepository<Patient, PatientEntity> implements IPatientRepository {
    constructor(
        @inject(Identifier.PATIENT_REPO_MODEL) readonly _repoModel: any,
        @inject(Identifier.PATIENT_ENTITY_MAPPER) readonly _mapper: IEntityMapper<Patient, PatientEntity>,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
        super(_repoModel, _mapper, _logger)
    }

    public checkExists(id: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const result = await this.findOne(new Query().fromJSON({ _id: id }))
            if (result) return resolve(true)
            return resolve(false)
        })
    }
}
