import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { expect } from 'chai'
import { NutritionalQuestionnaire } from '../../../src/application/domain/model/nutritional.questionnaire'
import { NutritionalQuestionnaireRepoModel } from '../../../src/infrastructure/database/schema/nutritional.questionnaire.schema'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { ObjectID } from 'bson'
import { DIContainer } from '../../../src/di/di'

const dbConnection: IConnectionDB = DIContainer.get(Identifier.MONGODB_CONNECTION)
const app: App = DIContainer.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: NutritionalQuestionnaire', () => {
    const activity: NutritionalQuestionnaire =
        new NutritionalQuestionnaire().fromJSON(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
    before(async () => {
            try {
                await dbConnection.tryConnect(0, 500)
                await deleteAllActivities({})
            } catch (err) {
                throw new Error('Failure on Patient test: ' + err.message)
            }
        }
    )

    after(async () => {
        try {
            await deleteAllActivities({})
            await dbConnection.dispose()
        } catch (err) {
            throw new Error('Failure on Patient test: ' + err.message)
        }
    })

    describe('POST /v1/patients/:patient_id/nutritional/questionnaires', () => {
        context('when save a new nutritional questionnaire', () => {
            it('should return status code 200 and the saved nutritional questionnaire', () => {
                return request
                    .post(`/v1/patients/${activity.patient_id}/nutritional/questionnaires`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('patient_id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('sleep_habit')
                        expect(res.body).to.have.property('physical_activity_habits')
                        expect(res.body).to.have.property('feeding_habits_record')
                        expect(res.body).to.have.property('medical_record')
                        activity.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            const body = Object.assign(activity.toJSON(), {})
            it('should return status code 400 and message for invalid patient_id', () => {
                return request
                    .post('/v1/patients/123/nutritional/questionnaires')
                    .send(body)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })
        })
    })

    describe('GET /v1/patients/:patient_id/nutritional/questionnaires', () => {
        context('when get all nutritional questionnaire', () => {
            it('should return status code 200', () => {
                return request
                    .get(`/v1/patients/${activity.patient_id}/nutritional/questionnaires`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).is.an.instanceOf(Array)
                        expect(res.body.length).to.eql(1)
                        expect(res.body[0]).to.have.property('id', activity.id)
                        expect(res.body[0]).to.have.property('id')
                        expect(res.body[0]).to.have.property('patient_id')
                        expect(res.body[0]).to.have.property('created_at')
                        expect(res.body[0]).to.have.property('sleep_habit')
                        expect(res.body[0]).to.have.property('physical_activity_habits')
                        expect(res.body[0]).to.have.property('feeding_habits_record')
                        expect(res.body[0]).to.have.property('medical_record')
                        expect(res.header).to.have.property('x-total-count', '1')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/v1/patients/123/nutritional/questionnaires`)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })
        })
    })

    describe('GET  /v1/patients/:patient_id/nutritional/questionnaires/:questionnaire_id', () => {
        context('when get a unique nutritional questionnaire', () => {
            it('should return status code 200 and a nutritional questionnaire', () => {
                return request
                    .get(`/v1/patients/${activity.patient_id}/nutritional/questionnaires/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('patient_id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('sleep_habit')
                        expect(res.body).to.have.property('physical_activity_habits')
                        expect(res.body).to.have.property('feeding_habits_record')
                        expect(res.body).to.have.property('medical_record')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/v1/patients/123/nutritional/questionnaires/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })

            it('should return status code 400 and message from invalid questionnaire_id', () => {
                return request
                    .get(`/v1/patients/${activity.patient_id}/nutritional/questionnaires/123`)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })
        })

        context('when the nutritional questionnaire is not founded', () => {
            it('should return status code 404 and message from nutritional questionnaire  not found', () => {
                return request
                    .get(`/v1/patients/${new ObjectID()}/nutritional/questionnaires/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Nutritional questionnaire not found!')
                        expect(res.body).to.have.property('description', 'Nutritional questionnaire not found ' +
                            'or already removed. A new operation for the same questionnaire is required.')
                    })
            })
        })
    })

    describe('GET /v1/patients/:patient_id/nutritional/questionnaires/last', () => {
        context('when get the last nutritional questionnaire', () => {
            it('should return status code 200', () => {
                return request
                    .get(`/v1/patients/${activity.patient_id}/nutritional/questionnaires/last`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('patient_id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('sleep_habit')
                        expect(res.body).to.have.property('physical_activity_habits')
                        expect(res.body).to.have.property('feeding_habits_record')
                        expect(res.body).to.have.property('medical_record')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/v1/patients/123/nutritional/questionnaires/last`)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })

        })
    })

    describe('PUT /v1/patients/:patient_id/nutritional/questionnaires/:questionnaire_id/:resource_name', () => {
        context('when update a nutritional questionnaire', () => {
            it('should return status code 200 and a updated nutritional questionnaire', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .put(
                        `/v1/patients/${DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id
                        }/nutritional/questionnaires/${activity.id}/sociodemographic_record`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('patient_id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('sleep_habit')
                        expect(res.body).to.have.property('physical_activity_habits')
                        expect(res.body).to.have.property('feeding_habits_record')
                        expect(res.body).to.have.property('medical_record')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .put(`/v1/patients/123/nutritional/questionnaires/${activity.id}/sociodemographic_recod`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Some ID provided does not have a valid format!')
                        expect(res.body.description).to.eql('A 24-byte hex ID similar to this: 507f191e810c19729de860ea ' +
                            'is expected.')
                    })
            })

            it('should return status code 400 and message from invalid familycohesionrecord_id', () => {
                return request
                    .put(`/v1/patients/${activity.patient_id}/nutritional/questionnaires/123/sociodemographic_recod`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })
        })

        context('when the nutritional questionnaire is not founded', () => {
            it('should return status code 404 and message from nutritional questionnaire not found', () => {
                return request
                    .put(`/v1/patients/${new ObjectID()}/nutritional/questionnaires/${new ObjectID()}/sociodemographic_recod`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Nutritional questionnaire not found!')
                        expect(res.body).to.have.property('description', 'Nutritional questionnaire not found ' +
                            'or already removed. A new operation for the same questionnaire is required.')
                        activity.patient_id = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id
                        activity.created_at = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.created_at
                    })
            })
        })
    })

    describe('DELETE /v1/patients/:patient_id/nutritional/questionnaires/:questionnaire_id', () => {
        context('when delete a nutritional questionnaire', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.NUTRITIONAL_QUESTIONNAIRE)
                return request
                    .delete(`/v1/patients/${activity.patient_id}/nutritional/questionnaires/${result.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.be.empty
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .delete(`/v1/patients/123/nutritional/questionnaires/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })

            it('should return status code 400 and message from invalid medicalrecord_id', () => {
                return request
                    .delete(`/v1/patients/${activity.patient_id}/nutritional/questionnaires/123`)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })
        })

        context('when the nutritional questionnaire is not founded', () => {
            it('should return status code 204 and no content', async () => {
                return request
                    .delete(`/v1/patients/${new ObjectID()}/nutritional/questionnaires/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.be.empty
                    })
            })
        })
    })
})

async function deleteAllActivities(doc) {
    return NutritionalQuestionnaireRepoModel.deleteMany({})
}

async function createActivity(doc) {
    return NutritionalQuestionnaireRepoModel.create(doc)
}
