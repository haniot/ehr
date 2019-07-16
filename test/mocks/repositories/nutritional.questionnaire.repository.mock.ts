import { INutritionalQuestionnaireRepository } from '../../../src/application/port/nutritional.questionnaire.repository'
import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'
import { DefaultEntityMock } from '../models/default.entity.mock'
import { IQuery } from '../../../src/application/port/query.interface'

const activity: NutritionalQuestionnaire = new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
activity.id = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id

export class NutritionalQuestionnaireRepositoryMock implements INutritionalQuestionnaireRepository {

    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: NutritionalQuestionnaire): Promise<NutritionalQuestionnaire> {
        return Promise.resolve(activity)
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(activity.id === id)
    }

    public find(query: IQuery): Promise<Array<NutritionalQuestionnaire>> {
        return Promise.resolve([activity])
    }

    public findOne(query: IQuery): Promise<NutritionalQuestionnaire> {
        return Promise.resolve(activity)
    }

    public update(item: NutritionalQuestionnaire): Promise<NutritionalQuestionnaire> {
        return Promise.resolve(activity)
    }

}
