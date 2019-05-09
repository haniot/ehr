import { Container } from 'inversify'
import { DI } from '../../../src/di/di'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { SociodemographicRecord } from '../../../src/application/domain/model/sociodemographic.record'
import { SociodemographicRecordRepoModel } from '../../../src/infrastructure/database/schema/sociodemographic.record.schema'
import { expect } from 'chai'
import { ObjectID } from 'bson'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: SociodemographicRecord', () => {

    const activity: SociodemographicRecord = new SociodemographicRecord().fromJSON(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)

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

    describe('POST /patients/:patient_id/sociodemographicrecords', () => {
        context('when save a new sociodemographic record', () => {
            it('should return status code 200 and the saved sociodemographic record', () => {
                return request
                    .post(`/patients/${activity.patient_id}/sociodemographicrecords`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        activity.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .post('/patients/123/sociodemographicrecords')
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

    describe('GET /patients/:patient_id/sociodemographicrecords/:sociodemographicrecord_id', () => {
        context('when get a unique sociodemographic record', () => {
            it('should return status code 200 and a sociodemographic record', () => {
                return request
                    .get(`/patients/${activity.patient_id}/sociodemographicrecords/${activity.id}`)
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
                    .get(`/patients/123/sociodemographicrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid sociodemographicrecord_id', () => {
                return request
                    .get(`/patients/${activity.patient_id}/sociodemographicrecords/123`)
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

        context('when the sociodemographic record is not founded', () => {
            it('should return status code 404 and message from sociodemographic record not found', () => {
                return request
                    .get(`/patients/${new ObjectID()}/sociodemographicrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Sociodemographic record not found!')
                        expect(res.body.description).to.eql('Sociodemographic record not found or already removed. ' +
                            'A new operation for' +
                            ' the same resource is required.')
                    })
            })
        })
    })

    describe('PATCH` /patients/:patient_id/sociodemographicrecords/:sociodemographicrecord_id', () => {
        context('when update a sociodemographic record', () => {
            it('should return status code 200 and a updated sociodemographic record', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .patch
                    (`/patients/${DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id}/sociodemographicrecords/${activity.id}`)
                    .send(activity.toJSON())
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
                    .patch(`/patients/123/sociodemographicrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid sociodemographicrecord_id', () => {
                return request
                    .patch(`/patients/${activity.patient_id}/sociodemographicrecords/123`)
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
        })

        context('when the sociodemographic record is not founded', () => {
            it('should return status code 404 and message from sociodemographic record not found', () => {
                return request
                    .patch(`/patients/${new ObjectID()}/sociodemographicrecords/${new ObjectID()}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Sociodemographic record not found!')
                        expect(res.body.description).to.eql('Sociodemographic record not found or already removed.' +
                            ' A new operation for' +
                            ' the same resource is required.')
                        activity.patient_id = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.patient_id
                        activity.created_at = DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD.created_at
                    })
            })
        })
    })

    describe('DELETE` /patients/:patient_id/sociodemographicrecords/:sociodemographicrecord_id', () => {
        context('when delete a sociodemographic record', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.SOCIODEMOGRAPHIC_RECORD)
                return request
                    .delete(`/patients/${activity.patient_id}/sociodemographicrecords/${result.id}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .delete(`/patients/123/sociodemographicrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid sociodemographicrecord_id', () => {
                return request
                    .delete(`/patients/${activity.patient_id}/sociodemographicrecords/123`)
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

        context('when the sociodemographic record is not founded', () => {
            it('should return status code 204 and no content', () => {
                return request
                    .delete(`/patients/${new ObjectID()}/sociodemographicrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })
    })
    describe('GET` /patients/:patient_id/sociodemographicrecords/', () => {
        context('when get all sociodemographic record', () => {
            it('should return status code 200 and a list of sociodemographic record', () => {
                return request
                    .get(`/patients/${activity.patient_id}/sociodemographicrecords`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(1)
                        expect(res.body[0]).to.have.property('id')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get('/patients/123/sociodemographicrecords')
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

        context('when the sociodemographic record is not founded', () => {
            it('should return status code 200 and a empty list', () => {
                return request
                    .get(`/patients/${new ObjectID()}/sociodemographicrecords`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(0)
                    })
            })
        })
    })
})

async function deleteAllActivities(doc) {
    return SociodemographicRecordRepoModel.deleteMany({})
}

async function createActivity(doc) {
    return SociodemographicRecordRepoModel.create(doc)
}
