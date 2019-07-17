import { IEntityMapper } from '../../port/entity.mapper.interface'
import { NutritionalQuestionnaire } from '../../../application/domain/model/nutritional.questionnaire'
import { NutritionalQuestionnaireEntity } from '../nutritional.questionnaire.entity'
import { injectable } from 'inversify'
import { PhysicalActivityHabits } from '../../../application/domain/model/physical.activity.habits'
import { MedicalRecord } from '../../../application/domain/model/medical.record'
import { FeedingHabitsRecord } from '../../../application/domain/model/feeding.habits.record'
import { SleepHabit } from '../../../application/domain/model/sleep.habit'

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
        if (json.type !== undefined) result.type = json.type
        if (json.created_at !== undefined)
            result.created_at = json.created_at
        if (json.sleep_habit !== undefined)
            result.sleep_habit = new SleepHabit().fromJSON(json.sleep_habit)
        if (json.physical_activity_habits !== undefined)
            result.physical_activity_habits = new PhysicalActivityHabits().fromJSON(json.physical_activity_habits)
        if (json.feeding_habits_record !== undefined)
            result.feeding_habits_record = new FeedingHabitsRecord().fromJSON(json.feeding_habits_record)
        if (json.medical_record !== undefined)
            result.medical_record = new MedicalRecord().fromJSON(json.medical_record)
        return result
    }

    public modelEntityToModel(item: NutritionalQuestionnaireEntity): NutritionalQuestionnaire {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: NutritionalQuestionnaire): NutritionalQuestionnaireEntity {
        const result: NutritionalQuestionnaireEntity = new NutritionalQuestionnaireEntity()

        if (item.id !== undefined)
            result.id = item.id
        if (item.patient_id !== undefined)
            result.patient_id = item.patient_id
        if (item.type !== undefined) result.type = item.type
        if (item.created_at !== undefined)
            result.created_at = item.created_at
        if (item.sleep_habit !== undefined)
            result.sleep_habit = new SleepHabit().fromJSON(item.sleep_habit).toJSON()
        if (item.physical_activity_habits !== undefined)
            result.physical_activity_habits = new PhysicalActivityHabits().fromJSON(item.physical_activity_habits).toJSON()
        if (item.feeding_habits_record !== undefined)
            result.feeding_habits_record = new FeedingHabitsRecord().fromJSON(item.feeding_habits_record).toJSON()
        if (item.medical_record !== undefined)
            result.medical_record = new MedicalRecord().fromJSON(item.medical_record).toJSON()
        return result
    }

    public transform(item: any): any {
        if (item instanceof NutritionalQuestionnaire)
            return this.modelToModelEntity(item)

        return this.jsonToModel(item)
    }
}
