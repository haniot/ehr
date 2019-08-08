import { IOdontologicalQuestionnaireRepository } from '../../../src/application/port/odontological.questionnaire.repository.interface'
import { OdontologicalQuestionnaire } from '../../../src/application/domain/model/odontological.questionnaire'
import { DefaultEntityMock } from '../models/default.entity.mock'
import { IQuery } from '../../../src/application/port/query.interface'

const activity: OdontologicalQuestionnaire =
    new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)
activity.id = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.id

export class OdontologicalQuestionnaireRepositoryMock implements IOdontologicalQuestionnaireRepository {

    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: OdontologicalQuestionnaire): Promise<OdontologicalQuestionnaire> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(activity.id === id)
    }

    public find(query: IQuery): Promise<Array<OdontologicalQuestionnaire>> {
        return Promise.resolve([activity])
    }

    public findOne(query: IQuery): Promise<OdontologicalQuestionnaire> {
        return Promise.resolve(activity)
    }

    public update(item: OdontologicalQuestionnaire): Promise<OdontologicalQuestionnaire> {
        return Promise.resolve(activity)
    }

    public removeOdontologicalQuestionnaireFromUser(id: string): Promise<boolean> {
        return Promise.resolve(true)
    }

}
