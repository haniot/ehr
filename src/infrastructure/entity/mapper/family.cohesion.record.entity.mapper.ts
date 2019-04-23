import { IEntityMapper } from '../../port/entity.mapper.interface'
import { FamilyCohesionRecord } from '../../../application/domain/model/family.cohesion.record'
import { FamilyCohesionRecordEntity } from '../family.cohesion.record.entity'
import { injectable } from 'inversify'

@injectable()
export class FamilyCohesionRecordEntityMapper implements IEntityMapper<FamilyCohesionRecord, FamilyCohesionRecordEntity> {
    public jsonToModel(json: any): FamilyCohesionRecord {
        const result: FamilyCohesionRecord = new FamilyCohesionRecord()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.patient_id !== undefined) result.patient_id = json.patient_id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.family_mutual_aid_freq !== undefined) result.family_mutual_aid_freq = json.family_mutual_aid_freq
        if (json.friendship_approval_freq !== undefined) result.friendship_approval_freq = json.friendship_approval_freq
        if (json.family_only_task_freq !== undefined) result.family_only_task_freq = json.family_only_task_freq
        if (json.family_only_preference_freq !== undefined) result.family_only_preference_freq = json.family_only_preference_freq
        if (json.free_time_together_freq !== undefined) result.free_time_together_freq = json.free_time_together_freq
        if (json.family_proximity_perception_freq !== undefined)
            result.family_proximity_perception_freq = json.family_proximity_perception_freq
        if (json.all_family_tasks_freq !== undefined) result.all_family_tasks_freq = json.all_family_tasks_freq
        if (json.family_tasks_opportunity_freq !== undefined)
            result.family_tasks_opportunity_freq = json.family_tasks_opportunity_freq
        if (json.family_decision_support_freq !== undefined)
            result.family_decision_support_freq = json.family_decision_support_freq
        if (json.family_union_relevance_freq !== undefined) result.family_union_relevance_freq = json.family_union_relevance_freq
        if (json.family_cohesion_result !== undefined) result.family_cohesion_result = json.family_cohesion_result

        return result
    }

    public modelEntityToModel(item: FamilyCohesionRecordEntity): FamilyCohesionRecord {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: FamilyCohesionRecord): FamilyCohesionRecordEntity {
        const result: FamilyCohesionRecordEntity = new FamilyCohesionRecordEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.patient_id !== undefined) result.patient_id = item.patient_id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
        if (item.family_mutual_aid_freq !== undefined) result.family_mutual_aid_freq = item.family_mutual_aid_freq
        if (item.friendship_approval_freq !== undefined) result.friendship_approval_freq = item.friendship_approval_freq
        if (item.family_only_task_freq !== undefined) result.family_only_task_freq = item.family_only_task_freq
        if (item.family_only_preference_freq !== undefined) result.family_only_preference_freq = item.family_only_preference_freq
        if (item.free_time_together_freq !== undefined) result.free_time_together_freq = item.free_time_together_freq
        if (item.family_proximity_perception_freq !== undefined)
            result.family_proximity_perception_freq = item.family_proximity_perception_freq
        if (item.all_family_tasks_freq !== undefined) result.all_family_tasks_freq = item.all_family_tasks_freq
        if (item.family_tasks_opportunity_freq !== undefined)
            result.family_tasks_opportunity_freq = item.family_tasks_opportunity_freq
        if (item.family_decision_support_freq !== undefined)
            result.family_decision_support_freq = item.family_decision_support_freq
        if (item.family_union_relevance_freq !== undefined) result.family_union_relevance_freq = item.family_union_relevance_freq
        if (item.family_cohesion_result !== undefined) result.family_cohesion_result = item.family_cohesion_result

        return result
    }

    public transform(item: any): any {
        if (item instanceof FamilyCohesionRecord) return this.modelToModelEntity(item)
        return this.jsonToModel(item)
    }

}
