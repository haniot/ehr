import { IOralHealthRecordService } from '../port/oral.health.record.service.interface'
import { IQuery } from '../port/query.interface'
import { OralHealthRecord } from '../domain/model/oral.health.record'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IOralHealthRecordRepository } from '../port/oral.health.record.repository.interface'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'

@injectable()
export class OralHealthRecordService implements IOralHealthRecordService {
    constructor(
        @inject(Identifier.ORAL_HEALTH_RECORD_REPOSITORY) private readonly _repo: IOralHealthRecordRepository
    ) {
    }

    public add(item: OralHealthRecord): Promise<OralHealthRecord> {
        return this._repo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<OralHealthRecord>> {
        query.addFilter({ type: QuestionnaireTypes.ORAL_HEALTH_RECORD })
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<OralHealthRecord> {
        query.addFilter({ _id: id, type: QuestionnaireTypes.ORAL_HEALTH_RECORD })
        return this._repo.findOne(query)
    }

    public update(item: OralHealthRecord): Promise<OralHealthRecord> {
        return this._repo.update(item)
    }

    public removeOralHealthRecord(patientId, oralHealthId: string): Promise<boolean> {
        return this._repo.delete(oralHealthId)
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }
}
