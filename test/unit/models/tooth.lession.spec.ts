import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { ToothLesion } from '../../../src/application/domain/model/tooth.lesion'

describe('Models: ToothLession', () => {
    describe('fromJSON()', () => {
        context('when the json contain all parameters', () => {
            it('should return the class with parameters set', () => {
                const result = new ToothLesion().fromJSON(DefaultEntityMock.TOOTH_LESSION)
                assert.propertyVal(result, 'tooth_type', DefaultEntityMock.TOOTH_LESSION.tooth_type)
                assert.propertyVal(result, 'lesion_type', DefaultEntityMock.TOOTH_LESSION.lesion_type)
            })
        })

        context('when the json is undefined', () => {
            it('should return the class without parameters', () => {
                const result = new ToothLesion().fromJSON(undefined)
                assert.isUndefined(result.tooth_type, 'no tooth_type defined')
                assert.isUndefined(result.lesion_type, 'no lesion_type defined')
            })
        })

        context('when the json is empty', () => {
            it('should return the class without parameters', () => {
                const result = new ToothLesion().fromJSON({})
                assert.isUndefined(result.tooth_type, 'no tooth_type defined')
                assert.isUndefined(result.lesion_type, 'no lesion_type defined')
            })
        })

        context('when pass json as string', () => {
            it('should return the object with json parameters set', () => {
                const result = new ToothLesion().fromJSON(JSON.stringify(DefaultEntityMock.TOOTH_LESSION))
                assert.propertyVal(result, 'tooth_type', DefaultEntityMock.TOOTH_LESSION.tooth_type)
                assert.propertyVal(result, 'lesion_type', DefaultEntityMock.TOOTH_LESSION.lesion_type)
            })


            it('should return the class without parameters for empty string', () => {
                const result = new ToothLesion().fromJSON('')
                assert.isUndefined(result.tooth_type, 'no tooth_type defined')
                assert.isUndefined(result.lesion_type, 'no lesion_type defined')
            })
        })
        context('when pass the parameters', () => {
            it('should return the object with set chronic_diseases', () => {
                const result = new ToothLesion().fromJSON({
                    tooth_type: DefaultEntityMock.TOOTH_LESSION.tooth_type
                })

                assert.propertyVal(result, 'tooth_type', DefaultEntityMock.TOOTH_LESSION.tooth_type)
                assert.isUndefined(result.lesion_type, 'no lesion_type defined')
            })
        })
    })

    describe('toJSON()', () => {
        context('when the object contains all parameters set', () => {
            it('should return the object as JSON', () => {
                const activity = new ToothLesion().fromJSON(DefaultEntityMock.TOOTH_LESSION)
                const result = activity.toJSON()
                assert.propertyVal(result, 'tooth_type', DefaultEntityMock.TOOTH_LESSION.tooth_type)
                assert.propertyVal(result, 'lesion_type', DefaultEntityMock.TOOTH_LESSION.lesion_type)
            })
        })

        context('when some parameter is missing', () => {
            it('should return json without created_at', () => {
                const activity = new ToothLesion().fromJSON({
                    lesion_type: DefaultEntityMock.TOOTH_LESSION.lesion_type
                })
                const result = activity.toJSON()
                assert.isUndefined(result.tooth_type, 'no tooth_type defined')
                assert.propertyVal(result, 'lesion_type', DefaultEntityMock.TOOTH_LESSION.lesion_type)
            })
        })
    })
})
