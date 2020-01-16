// import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
// import { assert } from 'chai'
// import { OralHealthRecord } from '../../../src/application/domain/model/oral.health.record'
// describe('Models: OralHealthRecord', () => {
//     describe('fromJSON()', () => {
//         context('when the json contain all parameters', () => {
//             it('should return the class with parameters set', () => {
//                 const result = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//                 assert.propertyVal(result, 'teeth_brushing_freq', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq)
//             })
//         })
//
//         context('when the json is undefined', () => {
//             it('should return the class without parameters', () => {
//                 const result = new OralHealthRecord().fromJSON(undefined)
//                 assert.isUndefined(result.teeth_brushing_freq)
//                 assert.isUndefined(result.teeth_lesions)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//             })
//         })
//
//         context('when the json is empty', () => {
//             it('should return the class without parameters', () => {
//                 const result = new OralHealthRecord().fromJSON({})
//                 assert.isUndefined(result.teeth_brushing_freq)
//                 assert.isUndefined(result.teeth_lesions)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//             })
//         })
//
//         context('when pass json as string', () => {
//             it('should return the object with json parameters set', () => {
//                 const result = new OralHealthRecord().fromJSON(JSON.stringify(DefaultEntityMock.ORAL_HEALTH_RECORD))
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//                 assert.propertyVal(result, 'teeth_brushing_freq', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq)
//             })
//
//             it('should return the class without parameters for empty string', () => {
//                 const result = new OralHealthRecord().fromJSON('')
//                 assert.isUndefined(result.teeth_brushing_freq)
//                 assert.isUndefined(result.teeth_lesions)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//             })
//
//             it('should return the class without parameters for invalid string', () => {
//                 const result = new OralHealthRecord().fromJSON('invalid')
//                 assert.isUndefined(result.teeth_brushing_freq)
//                 assert.isUndefined(result.teeth_lesions)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//             })
//         })
//
//         context('when pass the parameters', () => {
//
//             it('should return the object with set teeth_brushing_freq', () => {
//                 const result = new OralHealthRecord().fromJSON({
//                     teeth_brushing_freq: DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq
//                 })
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//                 assert.propertyVal(result, 'teeth_brushing_freq', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq)
//             })
//             it('should return the object with set teeth_lesions', () => {
//                 const result = new OralHealthRecord().fromJSON({
//                     teeth_brushing_freq: DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq,
//                     teeth_lesions: DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions
//                 })
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//                 assert.propertyVal(result, 'teeth_brushing_freq', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq)
//             })
//         })
//     })
//
//     describe('toJSON()', () => {
//         context('when the object contains all parameters set', () => {
//             it('should return the object as JSON', () => {
//                 const activity = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)
//                 const result = activity.toJSON()
//
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//                 assert.propertyVal(result, 'teeth_brushing_freq', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_brushing_freq)
//                 assert.deepPropertyVal(result, 'teeth_lesions', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions)
//             })
//         })
//
//         context('when some parameter is missing', () => {
//             it('should return json without created_at', () => {
//                 const activity = new OralHealthRecord().fromJSON({
//                     teeth_lesions: DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions
//                 })
//                 const result = activity.toJSON()
//                 assert.isUndefined(result.teeth_brushing_freq)
//                 assert.propertyVal(result, 'type', DefaultEntityMock.ORAL_HEALTH_RECORD.type)
//                 assert.deepPropertyVal(result, 'teeth_lesions', DefaultEntityMock.ORAL_HEALTH_RECORD.teeth_lesions)
//             })
//         })
//     })
//
// })
