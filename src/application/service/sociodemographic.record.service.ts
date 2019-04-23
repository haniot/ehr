import { ISociodemographicRecordService } from '../port/sociodemographic.record.service.interface'
import { IQuery } from '../port/query.interface'
import { SociodemographicRecord } from '../domain/model/sociodemographic.record'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { ISociodemographicRecordRepository } from '../port/sociodemographic.record.repository.interface'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'

@injectable()
export class SociodemographicRecordService implements ISociodemographicRecordService {
    constructor(
        @inject(Identifier.SOCIODEMOGRAPHIC_RECORD_REPOSITORY) private readonly _repo: ISociodemographicRecordRepository
    ) {
    }

    public add(item: SociodemographicRecord): Promise<SociodemographicRecord> {
        return this._repo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<SociodemographicRecord>> {
        query.addFilter({ type: QuestionnaireTypes.SOCIODEMOGRAPHIC_RECORD })
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<SociodemographicRecord> {
        query.addFilter({ _id: id, type: QuestionnaireTypes.SOCIODEMOGRAPHIC_RECORD })
        return this._repo.findOne(query)
    }

    public update(item: SociodemographicRecord): Promise<SociodemographicRecord> {
        return this._repo.update(item)
    }

    public removeSociodemographicRecord(patientId, socioId: string): Promise<boolean> {
        return this._repo.delete(socioId)
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }
}
