import {Container} from 'inversify'
import {DI} from '../../../src/di/di'
import {IConnectionDB} from '../../../src/infrastructure/port/connection.db.interface'
import {Identifier} from '../../../src/di/identifiers'
import {App} from '../../../src/app'
import {OdontologicalQuestionnaire} from '../../../src/application/domain/model/odontological.questionnaire'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {OdontologicalQuestionnaireRepoModel} from '../../../src/infrastructure/database/schema/odontological.questionnaire.schema'
import {expect} from 'chai'

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

    describe('POST /patients/:patient_id/odontological/questionnaires', () => {
        context('when save a new odontological questionnaire', () => {
            it('should return status code 200 and the saved odontological questionnaire', () => {
                return request
                    .post(`/patients/${activity.patient_id}/odontological/questionnaires`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                       // expect(res.body).to.have.property('id')
                       // activity.id = res.body.id

                        console.log(res.body)
                    })
            })
        })

        context('when there are validation errors', () => {
            const body = Object.assign(activity.toJSON(), {})

            it('should return status code 400 and message for invalid patient_id', () => {
                return request
                    .post('/patients/123/odontological/questionnaires')
                    .send(body)
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
        })
    })

    describe('GET /patients/:patient_id/odontological/questionnaires', () => {
        context('when get all odontological questionnaire', () => {
            it('should return status code 200', () => {
                return request
                    .get(`/patients/${activity.patient_id}/odontological/questionnaires`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')

                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/patients/123/odontological/questionnaires`)
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

        })

    })
})

async function deleteAllActivities(doc) {
    return OdontologicalQuestionnaireRepoModel.deleteMany({})
}
