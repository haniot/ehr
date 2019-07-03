import {IEntityMapper} from '../../port/entity.mapper.interface'
import {NutritionalQuestionnaire} from '../../../application/domain/model/nutritional.questionnaire'
import {NutritionalQuestionnaireEntity} from '../nutritional.questionnaire.entity'
import {injectable} from 'inversify'

@injectable()
export class NutritionalQuestionnaireEntityMapper implements IEntityMapper<NutritionalQuestionnaire,
    NutritionalQuestionnaireEntity> {

    public jsonToModel(json: any): NutritionalQuestionnaire {
        const result: NutritionalQuestionnaire = new NutritionalQuestionnaire()

        if (!json)
            return result
        if (json.id !== undefined)
            result.id = json.id
        if (json.patient_id !== undefined)
            result.patient_id = json.patient_id
        if (json.created_at !== undefined)
            result.created_at = json.created_at
        if (json.sleep_habit !== undefined)
            result.sleep_habit = json.sleep_habit
        if (json.physical_activity_habits !== undefined)
            result.physical_activity_habits = json.physical_activity_habits
        if (json.feeding_habits_record !== undefined)
            result.feeding_habits_record = json.feeding_habits_record
        if (json.medical_record !== undefined)
            result.medical_record = json.medical_record

        return result
    }

    public modelEntityToModel(item: NutritionalQuestionnaireEntity): NutritionalQuestionnaire {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: NutritionalQuestionnaire): NutritionalQuestionnaireEntity {
        const result: NutritionalQuestionnaire = new NutritionalQuestionnaire()

        if (item.id !== undefined)
            result.id = item.id
        if (item.patient_id !== undefined)
            result.patient_id = item.patient_id
        if (item.created_at !== undefined)
            result.created_at = item.created_at
        if (item.sleep_habit !== undefined)
            result.sleep_habit = item.sleep_habit
        if (item.physical_activity_habits !== undefined)
            result.physical_activity_habits = item.physical_activity_habits
        if (item.feeding_habits_record !== undefined)
            result.feeding_habits_record = item.feeding_habits_record
        if (item.medical_record !== undefined)
            result.medical_record = item.medical_record

        return result
    }

    public transform(item: any): any {
        if (item instanceof NutritionalQuestionnaire)
            return this.modelToModelEntity(item)

        return this.jsonToModel(item)
    }
}
