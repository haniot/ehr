// import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
// import { assert } from 'chai'
// import { FamilyCohesionRecord } from '../../../src/application/domain/model/family.cohesion.record'
//
// describe('Models: FamilyCohesionRecord', () => {
//
//     describe('fromJSON()', () => {
//         context('when the json contain all parameters', () => {
//             it('should return the class with parameters set', () => {
//                 const result = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'family_tasks_opportunity_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
//                 assert.propertyVal(result, 'family_decision_support_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
//                 assert.propertyVal(result, 'family_union_relevance_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
//                 assert.propertyVal(result, 'family_cohesion_result',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//         })
//
//         context('when the json is undefined', () => {
//             it('should return the class without parameters', () => {
//                 const result = new FamilyCohesionRecord().fromJSON(undefined)
//                 assert.isUndefined(result.family_mutual_aid_freq)
//                 assert.isUndefined(result.friendship_approval_freq)
//                 assert.isUndefined(result.family_only_task_freq)
//                 assert.isUndefined(result.family_only_preference_freq)
//                 assert.isUndefined(result.free_time_together_freq)
//                 assert.isUndefined(result.family_proximity_perception_freq)
//                 assert.isUndefined(result.all_family_tasks_freq)
//                 assert.isUndefined(result.family_tasks_opportunity_freq)
//                 assert.isUndefined(result.family_decision_support_freq)
//                 assert.isUndefined(result.family_union_relevance_freq)
//                 assert.isUndefined(result.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//         })
//
//         context('when the json is empty', () => {
//             it('should return the class without parameters', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({})
//                 assert.isUndefined(result.family_mutual_aid_freq)
//                 assert.isUndefined(result.friendship_approval_freq)
//                 assert.isUndefined(result.family_only_task_freq)
//                 assert.isUndefined(result.family_only_preference_freq)
//                 assert.isUndefined(result.free_time_together_freq)
//                 assert.isUndefined(result.family_proximity_perception_freq)
//                 assert.isUndefined(result.all_family_tasks_freq)
//                 assert.isUndefined(result.family_tasks_opportunity_freq)
//                 assert.isUndefined(result.family_decision_support_freq)
//                 assert.isUndefined(result.family_union_relevance_freq)
//                 assert.isUndefined(result.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//         })
//
//         context('when pass json as string', () => {
//             it('should return the object with json parameters set', () => {
//                 const result = new FamilyCohesionRecord().fromJSON(JSON.stringify(DefaultEntityMock.FAMILY_COHESION_RECORD))
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'family_tasks_opportunity_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
//                 assert.propertyVal(result, 'family_decision_support_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
//                 assert.propertyVal(result, 'family_union_relevance_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
//                 assert.propertyVal(result, 'family_cohesion_result',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//
//             it('should return the class without parameters for empty string', () => {
//                 const result = new FamilyCohesionRecord().fromJSON('')
//                 assert.isUndefined(result.family_mutual_aid_freq)
//                 assert.isUndefined(result.friendship_approval_freq)
//                 assert.isUndefined(result.family_only_task_freq)
//                 assert.isUndefined(result.family_only_preference_freq)
//                 assert.isUndefined(result.free_time_together_freq)
//                 assert.isUndefined(result.family_proximity_perception_freq)
//                 assert.isUndefined(result.all_family_tasks_freq)
//                 assert.isUndefined(result.family_tasks_opportunity_freq)
//                 assert.isUndefined(result.family_decision_support_freq)
//                 assert.isUndefined(result.family_union_relevance_freq)
//                 assert.isUndefined(result.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//
//             it('should return the class without parameters for invalid string', () => {
//                 const result = new FamilyCohesionRecord().fromJSON('invalid')
//                 assert.isUndefined(result.family_mutual_aid_freq)
//                 assert.isUndefined(result.friendship_approval_freq)
//                 assert.isUndefined(result.family_only_task_freq)
//                 assert.isUndefined(result.family_only_preference_freq)
//                 assert.isUndefined(result.free_time_together_freq)
//                 assert.isUndefined(result.family_proximity_perception_freq)
//                 assert.isUndefined(result.all_family_tasks_freq)
//                 assert.isUndefined(result.family_tasks_opportunity_freq)
//                 assert.isUndefined(result.family_decision_support_freq)
//                 assert.isUndefined(result.family_union_relevance_freq)
//                 assert.isUndefined(result.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//         })
//
//         context('when pass the parameters', () => {
//
//             it('should return the object with set family_mutual_aid_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//
//             it('should return the object with set family_only_task_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//             it('should return the object with set friendship_approval_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//             it('should return the object with set family_only_preference_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//             it('should return the object with set free_time_together_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq,
//                     free_time_together_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//             it('should return the object with set family_proximity_perception_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq,
//                     free_time_together_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq,
//                     family_proximity_perception_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//             it('should return the object with set all_family_tasks_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq,
//                     free_time_together_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq,
//                     family_proximity_perception_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq,
//                     all_family_tasks_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//             it('should return the object with set family_tasks_opportunity_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq,
//                     free_time_together_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq,
//                     family_proximity_perception_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq,
//                     all_family_tasks_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq,
//                     family_tasks_opportunity_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'family_tasks_opportunity_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//             it('should return the object with set family_decision_support_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq,
//                     free_time_together_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq,
//                     family_proximity_perception_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq,
//                     all_family_tasks_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq,
//                     family_tasks_opportunity_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq,
//                     family_decision_support_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'family_tasks_opportunity_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
//                 assert.propertyVal(result, 'family_decision_support_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//             it('should return the object with set family_union_relevance_freq', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq,
//                     free_time_together_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq,
//                     family_proximity_perception_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq,
//                     all_family_tasks_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq,
//                     family_tasks_opportunity_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq,
//                     family_decision_support_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq,
//                     family_union_relevance_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'family_tasks_opportunity_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
//                 assert.propertyVal(result, 'family_decision_support_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
//                 assert.propertyVal(result, 'family_union_relevance_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//
//             it('should return the object with set family_cohesion_result', () => {
//                 const result = new FamilyCohesionRecord().fromJSON({
//                     family_mutual_aid_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq,
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq,
//                     free_time_together_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq,
//                     family_proximity_perception_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq,
//                     all_family_tasks_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq,
//                     family_tasks_opportunity_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq,
//                     family_decision_support_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq,
//                     family_union_relevance_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq,
//                     family_cohesion_result: DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result
//                 })
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'family_tasks_opportunity_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
//                 assert.propertyVal(result, 'family_decision_support_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
//                 assert.propertyVal(result, 'family_union_relevance_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
//                 assert.propertyVal(result, 'family_cohesion_result',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//
//         })
//     })
//
//     describe('toJSON()', () => {
//         context('when the object contains all parameters set', () => {
//             it('should return the object as JSON', () => {
//                 const activity = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)
//                 const result = activity.toJSON()
//                 assert.propertyVal(result, 'family_mutual_aid_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_mutual_aid_freq)
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'family_tasks_opportunity_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
//                 assert.propertyVal(result, 'family_decision_support_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
//                 assert.propertyVal(result, 'family_union_relevance_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
//                 assert.propertyVal(result, 'family_cohesion_result',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//         })
//
//         context('when some parameter is missing', () => {
//             it('should return json without created_at', () => {
//                 const activity = new FamilyCohesionRecord().fromJSON({
//                     family_only_task_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_task_freq,
//                     friendship_approval_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq,
//                     family_only_preference_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq,
//                     free_time_together_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq,
//                     family_proximity_perception_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq,
//                     all_family_tasks_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq,
//                     family_tasks_opportunity_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq,
//                     family_decision_support_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq,
//                     family_union_relevance_freq: DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq,
//                     family_cohesion_result: DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result
//                 })
//                 const result = activity.toJSON()
//                 assert.isUndefined(result.family_mutual_aid_freq, 'no family_mutual_aid_freq defined')
//                 assert.propertyVal(result, 'family_only_task_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'friendship_approval_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.friendship_approval_freq)
//                 assert.propertyVal(result, 'family_only_preference_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_only_preference_freq)
//                 assert.propertyVal(result, 'free_time_together_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.free_time_together_freq)
//                 assert.propertyVal(result, 'family_proximity_perception_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_proximity_perception_freq)
//                 assert.propertyVal(result, 'all_family_tasks_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.all_family_tasks_freq)
//                 assert.propertyVal(result, 'family_tasks_opportunity_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_tasks_opportunity_freq)
//                 assert.propertyVal(result, 'family_decision_support_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_decision_support_freq)
//                 assert.propertyVal(result, 'family_union_relevance_freq',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_union_relevance_freq)
//                 assert.propertyVal(result, 'family_cohesion_result',
//                     DefaultEntityMock.FAMILY_COHESION_RECORD.family_cohesion_result)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.FAMILY_COHESION_RECORD.type)
//             })
//         })
//     })
// })
