import { IFamilyCohesionRecordService } from '../port/family.cohesion.record.service.interface'
import { FamilyCohesionRecord } from '../domain/model/family.cohesion.record'
import { IQuery } from '../port/query.interface'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IFamilyCohesionRecordRepository } from '../port/family.cohesion.record.repository.interface'
import { QuestionnaireTypes } from '../domain/utils/questionnaire.types'

@injectable()
export class FamilyCohesionRecordService implements IFamilyCohesionRecordService {
    constructor(
        @inject(Identifier.FAMILY_COHESION_RECORD_REPOSITORY) private readonly _repo: IFamilyCohesionRecordRepository
    ) {
    }

    public add(item: FamilyCohesionRecord): Promise<FamilyCohesionRecord> {
        return this._repo.create(item)
    }

    public getAll(query: IQuery): Promise<Array<FamilyCohesionRecord>> {
        query.addFilter({ type: QuestionnaireTypes.FAMILY_COHESION_RECORD })
        return this._repo.find(query)
    }

    public getById(id: string, query: IQuery): Promise<FamilyCohesionRecord> {
        query.addFilter({ _id: id, type: QuestionnaireTypes.FAMILY_COHESION_RECORD })
        return this._repo.findOne(query)
    }

    public update(item: FamilyCohesionRecord): Promise<FamilyCohesionRecord> {
        return this._repo.update(item)
    }

    public removeFamilyCohesionRecord(patientId, familyCohesionId: string): Promise<boolean> {
        return this._repo.delete(familyCohesionId)
    }

    public remove(id: string): Promise<boolean> {
        throw Error('Not implemented yet!')
    }

}
