import {Container} from 'inversify'
import {DI} from '../../../src/di/di'
import {IConnectionDB} from '../../../src/infrastructure/port/connection.db.interface'
import {Identifier} from '../../../src/di/identifiers'
import {App} from '../../../src/app'
import {OdontologicalQuestionnaire} from '../../../src/application/domain/model/odontological.questionnaire'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {OdontologicalQuestionnaireRepoModel} from '../../../src/infrastructure/database/schema/odontological.questionnaire.schema'
import {expect} from 'chai'
import {ObjectID} from 'bson'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: OdontologicalQuestionnaire', () => {

    const activity: OdontologicalQuestionnaire =
        new OdontologicalQuestionnaire().fromJSON(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)

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

    describe('POST /v1/patients/:patient_id/odontological/questionnaires', () => {
        context('when save a new odontological questionnaire', () => {
            it('should return status code 200 and the saved odontological questionnaire', () => {
                return request
                    .post(`/v1/patients/${activity.patient_id}/odontological/questionnaires`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('patient_id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('sociodemographic_record')
                        expect(res.body).to.have.property('family_cohesion_record')
                        expect(res.body).to.have.property('oral_health_record')
                        activity.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            const body = Object.assign(activity.toJSON(), {})

            it('should return status code 400 and message for invalid patient_id', () => {
                return request
                    .post('/v1/patients/123/odontological/questionnaires')
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

    describe('GET /v1/patients/:patient_id/odontological/questionnaires', () => {
        context('when get all odontological questionnaire', () => {
            it('should return status code 200', () => {
                return request
                    .get(`/v1/patients/${activity.patient_id}/odontological/questionnaires`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).is.an.instanceOf(Array)
                        expect(res.body.length).to.eql(1)
                        expect(res.body[0]).to.have.property('id', activity.id)
                        expect(res.body[0]).to.have.property('patient_id')
                        expect(res.body[0]).to.have.property('created_at')
                        expect(res.body[0]).to.have.property('sociodemographic_record')
                        expect(res.body[0]).to.have.property('family_cohesion_record')
                        expect(res.body[0]).to.have.property('oral_health_record')
                        expect(res.header).to.have.property('x-total-count', '1')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/v1/patients/123/odontological/questionnaires`)
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
    describe('GET  /v1/patients/:patient_id/odontological/questionnaires/:questionnaire_id', () => {
        context('when get a unique odontological questionnaire', () => {
            it('should return status code 200 and a odontological questionnaire', () => {
                return request
                    .get(`/v1/patients/${activity.patient_id}/odontological/questionnaires/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('patient_id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('sociodemographic_record')
                        expect(res.body).to.have.property('family_cohesion_record')
                        expect(res.body).to.have.property('oral_health_record')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/v1/patients/123/odontological/questionnaires/${activity.id}`)
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
                    .get(`/v1/patients/${activity.patient_id}/odontological/questionnaires/123`)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })
        })

        context('when the odontological questionnaire is not founded', () => {
            it('should return status code 404 and message from odontological questionnaire  not found', () => {
                return request
                    .get(`/v1/patients/${new ObjectID()}/odontological/questionnaires/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Odontological questionnaire not found!')
                        expect(res.body).to.have.property('description', 'Odontological questionnaire not found or ' +
                            'already removed. A new operation for the same questionnaire is required.')
                    })
            })
        })
    })

    describe('GET /v1/patients/:patient_id/odontological/questionnaires/last', () => {
        context('when get the last odontological questionnaire', () => {
            it('should return status code 200', () => {
                return request
                    .get(`/v1/patients/${activity.patient_id}/odontological/questionnaires/last`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('patient_id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('sociodemographic_record')
                        expect(res.body).to.have.property('family_cohesion_record')
                        expect(res.body).to.have.property('oral_health_record')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/v1/patients/123/odontological/questionnaires/last`)
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
    describe('PUT /v1/patients/:patient_id/odontological/questionnaires/:questionnaire_id/:resource_name', () => {
        context('when update a odontological questionnaire', () => {
            it('should return status code 200 and a updated odontological questionnaire', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .put(
                        `/v1/patients/${DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id
                        }/odontological/questionnaires/${activity.id}/sociodemographic_recod`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('patient_id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('sociodemographic_record')
                        expect(res.body).to.have.property('family_cohesion_record')
                        expect(res.body).to.have.property('oral_health_record')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .put(`/v1/patients/123/odontological/questionnaires/${activity.id}/sociodemographic_recod`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })

            it('should return status code 400 and message from invalid familycohesionrecord_id', () => {
                return request
                    .put(`/v1/patients/${activity.patient_id}/odontological/questionnaires/123/sociodemographic_recod`)
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

        context('when the odontological questionnaire is not founded', () => {
            it('should return status code 404 and message from odontological questionnaire not found', () => {
                return request
                    .put(`/v1/patients/${new ObjectID()}/odontological/questionnaires/${new ObjectID()}/sociodemographic_recod`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Odontological questionnaire not found!')
                        expect(res.body).to.have.property('description', 'Odontological questionnaire not found or ' +
                            'already removed. A new operation for the same questionnaire is required.')
                        activity.patient_id = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.patient_id
                        activity.created_at = DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE.created_at
                    })
            })
        })
    })

    describe('DELETE /v1/patients/:patient_id/odontological/questionnaires/:questionnaire_id', () => {
        context('when delete a odontological questionnaire', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.ODONTOLOGICAL_QUESTIONNAIRE)
                return request
                    .delete(`/v1/patients/${activity.patient_id}/odontological/questionnaires/${result.id}`)
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
                    .delete(`/v1/patients/123/odontological/questionnaires/${activity.id}`)
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
                    .delete(`/v1/patients/${activity.patient_id}/odontological/questionnaires/123`)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message', 'Some ID provided does not have a valid format!')
                        expect(res.body).to.have.property('description', 'A 24-byte hex ID similar to this:' +
                            ' 507f191e810c19729de860ea is expected.')
                    })
            })
        })

        context('when the odontological questionnaire is not founded', () => {
            it('should return status code 204 and no content', async () => {
                return request
                    .delete(`/v1/patients/${new ObjectID()}/odontological/questionnaires/${new ObjectID()}`)
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
    return OdontologicalQuestionnaireRepoModel.deleteMany({})
}
async function createActivity(doc) {
    return OdontologicalQuestionnaireRepoModel.create(doc)
}
