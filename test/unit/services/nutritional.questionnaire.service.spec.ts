// import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'
// import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
// import { INutritionalQuestionnaireService } from '../../../src/application/port/nutritional.questionnaire.service'
// import { NutritionalQuestionnaireService } from '../../../src/application/service/nutritional.questionnaire.service'
// import { NutritionalQuestionnaireRepositoryMock } from '../../mocks/repositories/nutritional.questionnaire.repository.mock'
// import { Query } from '../../../src/infrastructure/repository/query/query'
// import { assert } from 'chai'
//
// describe('Services: NutritionalQuestionnaire', () => {
//     const activity: NutritionalQuestionnaire =
//         new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
//     activity.id = DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id
//     const service: INutritionalQuestionnaireService =
//         new NutritionalQuestionnaireService(new NutritionalQuestionnaireRepositoryMock())
//     const data: NutritionalQuestionnaire =
//         new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
//
//     describe('add()', () => {
//         context('when save a new nutritional questionnaire', () => {
//             it('should return the saved nutritional questionnaire', () => {
//                 return service
//                     .add(activity)
//                     .then(result => {
//                         assert.propertyVal(result, 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
//                         assert.propertyVal(result, 'patient_id', data.patient_id)
//                         assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
//                         assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
//                         assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
//                         assert.deepPropertyVal(result, 'medical_record', data.medical_record)
//                         assert.propertyVal(result, 'type', data.type)
//                     })
//             })
//         })
//
//         context('when there are validation errors', () => {
//             it('should reject a validation error', () => {
//                 return service
//                     .add(new NutritionalQuestionnaire().fromJSON({ patient_id: activity.patient_id }))
//                     .catch(err => {
//                         assert.propertyVal(err, 'message', 'Required fields were not provided...')
//                         assert.propertyVal(err, 'description', 'Nutritional Questionnaire validation:' +
//                             ' sleep_habit, physical_activity_habits, feeding_habits_record, medical_record is required!')
//                     })
//             })
//         })
//     })
//     describe('getAll()', () => {
//         context('when get all nutritional questionnaires', () => {
//             it('should return a list of nutritional questionnaires', () => {
//                 const query: Query = new Query()
//                 query.addFilter({ patient_id: activity.patient_id })
//                 return service
//                     .getAll(query)
//                     .then(result => {
//                         assert.isArray(result)
//                         assert.lengthOf(result, 1)
//                         assert.propertyVal(result[0], 'patient_id', data.patient_id)
//                         assert.deepPropertyVal(result[0], 'sleep_habit', data.sleep_habit)
//                         assert.deepPropertyVal(result[0], 'feeding_habits_record', data.feeding_habits_record)
//                         assert.deepPropertyVal(result[0], 'physical_activity_habits', data.physical_activity_habits)
//                         assert.deepPropertyVal(result[0], 'medical_record', data.medical_record)
//                         assert.propertyVal(result[0], 'type', data.type)
//                     })
//             })
//         })
//
//         context('when there are validation errors', () => {
//             it('should reject a validation error', () => {
//                 const query: Query = new Query()
//                 query.addFilter({ patient_id: '123' })
//                 return service
//                     .getAll(query)
//                     .catch(err => {
//                         assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
//                         assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
//                             ' is expected.')
//                     })
//             })
//         })
//     })
//     describe('getById()', () => {
//         context('when get a unique nutritional questionnaire', () => {
//             it('should return a nutritional questionnaire', () => {
//                 const query: Query = new Query()
//                 query.addFilter({ patient_id: activity.patient_id })
//                 return service
//                     .getById(activity.id!, query)
//                     .then(result => {
//                         assert.propertyVal(result, 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
//                         assert.propertyVal(result, 'patient_id', data.patient_id)
//                         assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
//                         assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
//                         assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
//                         assert.deepPropertyVal(result, 'medical_record', data.medical_record)
//                         assert.propertyVal(result, 'type', data.type)
//                     })
//             })
//         })
//
//         context('when there are validation errors', () => {
//             it('should reject a validation error', () => {
//                 const query: Query = new Query()
//                 query.addFilter({ patient_id: '123' })
//                 return service
//                     .getById(activity.id!, query)
//                     .catch(err => {
//                         assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
//                         assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
//                             ' is expected.')
//                     })
//             })
//         })
//     })
//     describe('removeQuestionnaire()', () => {
//         context('when delete a nutritional questionnaire', () => {
//             it('should return true', () => {
//                 return service.removeQuestionnaire(activity.patient_id!, activity.id!)
//                     .then(result => {
//                         assert.isBoolean(result)
//                         assert.isTrue(result)
//                     })
//             })
//         })
//
//         context('when there are validation errors', () => {
//             it('should reject a validation error', () => {
//                 return service.removeQuestionnaire('123', '321')
//                     .catch(err => {
//                         assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
//                         assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
//                             ' is expected.')
//                     })
//             })
//         })
//     })
//
//     describe('update()', () => {
//         context('when update a nutritional questionnaire', () => {
//             it('should return the updated nutritional questionnaire', () => {
//                 activity.created_at = undefined
//                 return service
//                     .update(activity)
//                     .then(result => {
//                         assert.propertyVal(result, 'id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.id)
//                         assert.propertyVal(result, 'patient_id', data.patient_id)
//                         assert.deepPropertyVal(result, 'sleep_habit', data.sleep_habit)
//                         assert.deepPropertyVal(result, 'feeding_habits_record', data.feeding_habits_record)
//                         assert.deepPropertyVal(result, 'physical_activity_habits', data.physical_activity_habits)
//                         assert.deepPropertyVal(result, 'medical_record', data.medical_record)
//                         assert.propertyVal(result, 'type', data.type)
//                     })
//             })
//         })
//
//         context('when there are validation errors', () => {
//             it('should reject a validation error', () => {
//                 activity.patient_id = '123'
//                 return service
//                     .update(activity)
//                     .catch(err => {
//                         assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
//                         assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
//                             ' is expected.')
//                     })
//             })
//         })
//     })
//
//     describe('count()', () => {
//         context('when want count nutritional questionnaires', () => {
//             it('should return a number of nutritional questionnaires', () => {
//                 return service.count(new Query())
//                     .then(res => {
//                         assert.isNumber(res)
//                         assert.equal(res, 1)
//                     })
//             })
//         })
//     })
//
//     describe('remove()', () => {
//         it('should throw an error for does not implemented', () => {
//             return service
//                 .remove(activity.id!)
//                 .catch(err => {
//                     assert.propertyVal(err, 'message', 'Not implemented yet!')
//                 })
//         })
//     })
//
// })
