import { EntityMapperMock } from '../../mocks/models/entity.mapper.mock'
import { CustomLoggerMock } from '../../mocks/custom.logger.mock'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { OdontologicalQuestionnaireRepository } from '../../../src/infrastructure/repository/odontological.questionnaire.repository'
import { OdontologicalQuestionnaire } from '../../../src/application/domain/model/odontological.questionnaire'
import sinon from 'sinon'
import { assert } from 'chai'
import { Query } from '../../../src/infrastructure/repository/query/query'
import { OdontologicalQuestionnaireRepoModel } from '../../../src/infrastructure/database/schema/odontological.questionnaire.schema'

require('sinon-mongoose')

describe('Repositories: OdontologicalQuestionnaire', () => {
    const modelFake: any = OdontologicalQuestionnaireRepoModel
    const repo =
        new OdontologicalQuestionnaireRepository(modelFake, new EntityMapperMock(), new CustomLoggerMock())
    const activity: OdontologicalQuestionnaire =
        new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)

    afterEach(() => {
        sinon.restore()
    })

    describe('create()', () => {
        context('when save a new odontological questionnaire', () => {
            it('should return the saved odontological questionnaire', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .resolves(activity)

                return repo.create(activity)
                    .then(result => {
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sociodemographic_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record)
                        assert.propertyVal(result, 'oral_health_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                        assert.propertyVal(result, 'family_cohesion_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
                    })
            })
        })

        context('when the odontological questionnaire is not saved', () => {
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

            it('should reject a error in validation', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .rejects({ name: 'ValidationError' })

                return repo.create(activity)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Required fields were not provided!')
                    })
            })

            it('should reject a error in cast', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .rejects({ name: 'CastError' })

                return repo.create(activity)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'The given ID is in invalid format.')
                    })
            })

            it('should reject a error in mongo', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .rejects({ name: 'MongoError', code: 11000 })

                return repo.create(activity)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'A registration with the same unique data already exists!')
                    })
            })
            it('should reject a error in parameter', () => {
                sinon
                    .mock(modelFake)
                    .expects('create')
                    .withArgs(activity)
                    .chain('exec')
                    .rejects({ name: 'ObjectParameterError' })

                return repo.create(activity)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Invalid query parameters!')
                    })
            })
        })
    })

    describe('find()', () => {
        context('when get all odontological questionnaires', () => {
            it('should return a list of odontological questionnaires', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
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
                        assert.propertyVal(result[0], 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result[0], 'sociodemographic_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record)
                        assert.propertyVal(result[0], 'oral_health_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                        assert.propertyVal(result[0], 'family_cohesion_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                        assert.propertyVal(result[0], 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
                    })
            })
        })

        context('when there are no odontological questionnaires', () => {
            it('should return empty array', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
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
            it('should reject a error in validation', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .chain('skip')
                    .chain('limit')
                    .chain('exec')
                    .rejects({ name: 'ValidationError' })

                return repo.find(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Required fields were not provided!')
                    })
            })

            it('should reject a error in cast', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .chain('skip')
                    .chain('limit')
                    .chain('exec')
                    .rejects({ name: 'CastError' })

                return repo.find(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'The given ID is in invalid format.')
                    })
            })

            it('should reject a error in mongo', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .chain('skip')
                    .chain('limit')
                    .chain('exec')
                    .rejects({ name: 'MongoError', code: 11000 })

                return repo.find(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'A registration with the same unique data already exists!')
                    })
            })

            it('should reject a error in parameter', () => {
                sinon
                    .mock(modelFake)
                    .expects('find')
                    .chain('sort')
                    .chain('skip')
                    .chain('limit')
                    .chain('exec')
                    .rejects({ name: 'ObjectParameterError' })

                return repo.find(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Invalid query parameters!')
                    })
            })
        })
    })

    describe('findOne()', () => {
        context('when get a unique odontological questionnaire', () => {
            it('should return a unique odontological questionnaire', () => {

                const query = new Query()
                query.addFilter({ _id: activity.id })

                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .resolves(activity)

                return repo.findOne(query)
                    .then(result => {
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sociodemographic_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record)
                        assert.propertyVal(result, 'oral_health_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                        assert.propertyVal(result, 'family_cohesion_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
                    })
            })
        })

        context('when the odontological questionnaire is not found', () => {
            it('should return undefined', () => {
                const query = new Query()
                query.addFilter({ _id: activity.id })

                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .resolves(undefined)

                return repo.findOne(query)
                    .then(result => {
                        assert.isUndefined(result, 'no result defined')
                    })
            })
        })

        context('when a database error occurs', () => {
            const query = new Query()
            query.addFilter({ _id: activity.id })

            it('should reject a error', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
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

            it('should reject a error in validation', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ name: 'ValidationError' })

                return repo.findOne(query)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Required fields were not provided!')
                    })
            })

            it('should reject a error in cast', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ name: 'CastError' })

                return repo.findOne(query)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'The given ID is in invalid format.')
                    })
            })

            it('should reject a error in mongo', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ name: 'MongoError', code: 11000 })

                return repo.findOne(query)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'A registration with the same unique data already exists!')
                    })
            })

            it('should reject a error in parameter', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOne')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ name: 'ObjectParameterError' })

                return repo.findOne(query)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Invalid query parameters!')
                    })
            })
        })
    })

    describe('update()', () => {
        context('when update a odontological questionnaire', () => {
            it('should return the odontological questionnaire record', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .resolves(activity)

                return repo.update(activity)
                    .then(result => {
                        assert.propertyVal(result, 'patient_id', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id)
                        assert.propertyVal(result, 'sociodemographic_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.sociodemographic_record)
                        assert.propertyVal(result, 'oral_health_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.oral_health_record)
                        assert.propertyVal(result, 'family_cohesion_record',
                            DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.family_cohesion_record)
                        assert.propertyVal(result, 'type', DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.type)
                    })
            })
        })
        context('when the odontological questionnaire is not found', () => {
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
            it('should reject a error in validation', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .rejects({ name: 'ValidationError' })

                return repo.update(activity)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Required fields were not provided!')
                    })
            })

            it('should reject a error in cast', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .rejects({ name: 'CastError' })

                return repo.update(activity)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'The given ID is in invalid format.')
                    })
            })

            it('should reject a error in mongo', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .rejects({ name: 'MongoError', code: 11000 })

                return repo.update(activity)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'A registration with the same unique data already exists!')
                    })
            })

            it('should reject a error in parameter', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndUpdate')
                    .withArgs({ _id: activity.id }, activity, { new: true })
                    .chain('exec')
                    .rejects({ name: 'ObjectParameterError' })

                return repo.update(activity)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Invalid query parameters!')
                    })
            })
        })
    })

    describe('delete()', () => {
        context('when want delete odontological questionnaire', () => {
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

        context('when the odontological questionnaire is not found', () => {
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
            it('should reject a error in validation', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ name: 'ValidationError' })

                return repo.delete(activity.id!)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Required fields were not provided!')
                    })
            })

            it('should reject a error in cast', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ name: 'CastError' })

                return repo.delete(activity.id!)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'The given ID is in invalid format.')
                    })
            })

            it('should reject a error in mongo', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ name: 'MongoError', code: 11000 })

                return repo.delete(activity.id!)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'A registration with the same unique data already exists!')
                    })
            })

            it('should reject a error in parameter', () => {
                sinon
                    .mock(modelFake)
                    .expects('findOneAndDelete')
                    .withArgs({ _id: activity.id })
                    .chain('exec')
                    .rejects({ name: 'ObjectParameterError' })

                return repo.delete(activity.id!)
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Invalid query parameters!')
                    })
            })
        })
    })

    describe('count()', () => {
        context('when count all odontological questionnaire by a filter', () => {
            it('should return the number of odontological questionnaire', () => {
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
            it('should reject a error in validation', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ name: 'ValidationError' })

                return repo.count(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Required fields were not provided!')
                    })
            })

            it('should reject a error in cast', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ name: 'CastError' })

                return repo.count(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'The given ID is in invalid format.')
                    })
            })

            it('should reject a error in mongo', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ name: 'MongoError', code: 11000 })

                return repo.count(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'A registration with the same unique data already exists!')
                    })
            })

            it('should reject a error in parameter', () => {
                sinon
                    .mock(modelFake)
                    .expects('countDocuments')
                    .withArgs({})
                    .chain('exec')
                    .rejects({ name: 'ObjectParameterError' })

                return repo.count(new Query())
                    .catch(err => {
                        assert.propertyVal(err, 'name', 'Error')
                        assert.propertyVal(err, 'message', 'Invalid query parameters!')
                    })
            })
        })
    })

})
