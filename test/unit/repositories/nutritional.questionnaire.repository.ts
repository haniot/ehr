import { NutritionalQuestionnaireRepoModel } from '../../../src/infrastructure/database/schema/nutritional.questionnaire.schema'
import { NutritionalQuestionnaireRepository } from '../../../src/infrastructure/repository/nutritional.questionnaire.repository'
import { EntityMapperMock } from '../../mocks/models/entity.mapper.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import sinon from 'sinon'
import { assert } from 'chai'
import { Query } from '../../../src/infrastructure/repository/query/query'

require('sinon-mongoose')

describe('Repositories: NutritionalQuestionnaire', () => {
    const modelFake: any = NutritionalQuestionnaireRepoModel
    const repo = new NutritionalQuestionnaireRepository(modelFake, new EntityMapperMock(), new CustomLoggerMock())
    const activity: NutritionalQuestionnaire =
        new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)

    afterEach(() => {
        sinon.restore()
    })

    describe('create()', () => {
        context('when save a new nutritional questionnaire', () => {
            it('should return the saved nutritional questionnaire', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .resolves(activity)

                return repo.create(activity)
                    .then(result => {
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sleep_habit',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                        assert.propertyVal(result, 'feeding_habits_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                        assert.propertyVal(result, 'physical_activity_habits',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                        assert.propertyVal(result, 'medical_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
                    })
            })
        })

        context('when the nutritional questionnaire is not saved', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .resolves(undefined)

                return repo.create(activity)
                    .then(result => {
                        assert.isUndefined(result, 'no result defined')
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.create(activity)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })
    describe('find()', () => {
        context('when get all nutritional questionnaires', () => {
            it('should return a list of nutritional questionnaires', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('select')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .resolves([activity])

                return repo.find(new Query())
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 1)
                        assert.propertyVal(result[0], 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result[0], 'sleep_habit',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                        assert.propertyVal(result[0], 'feeding_habits_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                        assert.propertyVal(result[0], 'physical_activity_habits',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                        assert.propertyVal(result[0], 'medical_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
                        assert.propertyVal(result[0], 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
                    })
            })
        })

        context('when there are no nutritional questionnaires', () => {
            it('should return empty array', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('select')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .resolves([])

                return repo.find(new Query())
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 0)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('select')
                    .chain('sort')
                    .withArgs({ created_at: 'desc' })
                    .chain('skip')
                    .withArgs(0)
                    .chain('limit')
                    .withArgs(100)
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.find(new Query())
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('findOne()', () => {
        context('when get a unique nutritional questionnaire', () => {
            it('should return a unique nutritional questionnaire', () => {

                const query = new Query()
                query.addFilter({ _id: activity.id })

                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('select')
                    .chain('exec')
                    .resolves(activity)

                return repo.findOne(query)
                    .then(result => {
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sleep_habit',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                        assert.propertyVal(result, 'feeding_habits_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                        assert.propertyVal(result, 'physical_activity_habits',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                        assert.propertyVal(result, 'medical_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
                    })
            })
        })

        context('when the nutritional questionnaire is not found', () => {
            it('should return undefined', () => {
                const query = new Query()
                query.addFilter({ _id: activity.id })

                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('select')
                    .chain('exec')
                    .resolves(undefined)

                return repo.findOne(query)
                    .then(result => {
                        assert.isUndefined(result, 'no result defined')
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                const query = new Query()
                query.addFilter({ _id: activity.id })

                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('select')
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.findOne(query)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('update()', () => {
        context('when update a nutritional questionnaire', () => {
            it('should return the nutritional questionnaire record', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .resolves(activity)

                return repo.update(activity)
                    .then(result => {
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sleep_habit',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.sleep_habit)
                        assert.propertyVal(result, 'feeding_habits_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.feeding_habits_record)
                        assert.propertyVal(result, 'physical_activity_habits',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.physical_activity_habits)
                        assert.propertyVal(result, 'medical_record',
                            DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.medical_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE.type)
                    })
            })
        })
        context('when the nutritional questionnaire is not found', () => {
            it('should return undefined', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .resolves(undefined)

                return repo.update(activity)
                    .then(result => {
                        assert.isUndefined(result, 'no result defined')
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.update(activity)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('delete()', () => {
        context('when want delete nutritional questionnaire', () => {
            it('should return true', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .resolves(true)

                return repo.delete(activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when the nutritional questionnaire is not found', () => {
            it('should return false', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .resolves(false)

                return repo.delete(activity.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isFalse(result)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.delete(activity.id!)
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })

    describe('count()', () => {
        context('when count all nutritional questionnaire by a filter', () => {
            it('should return the number of nutritional questionnaire', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .resolves(1)

                return repo.count(new Query())
                    .then(result => {
                        assert.isNumber(result)
                        assert.equal(result, 1)
                    })
            })
        })

        context('when a database error occurs', () => {
            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ message: 'An internal error has occurred in the database!' })

                return repo.count(new Query())
                    .catch(err => {
                        assert.property(err, 'name')
                        assert.propertyVal(err, 'name', 'Error')
                        assert.property(err, 'message')
                        assert.propertyVal(err, 'message', 'An internal error has occurred in the database!')
                    })
            })
        })
    })
})
