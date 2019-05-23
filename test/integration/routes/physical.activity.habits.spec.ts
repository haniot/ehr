import { Container } from 'inversify'
import { DI } from '../../../src/di/di'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { expect } from 'chai'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { ObjectID } from 'bson'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { PhysicalActivityHabitsRepoModel } from '../../../src/infrastructure/database/schema/physical.activity.habits.schema'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: PhysicalActivityHabits', () => {
    const activity: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)

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

    describe('POST /patients/:patient_id/physicalactivityhabits', () => {
        context('when save a new physical activity habits', () => {
            it('should return status code 200 and the saved physical activity habits', () => {
                return request
                    .post(`/patients/${activity.patient_id}/physicalactivityhabits`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('created_at')
                        activity.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .post('/patients/123/physicalactivityhabits')
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
    })

    describe('GET /patients/:patient_id/physicalactivityhabits/:physicalactivityhabits_id', () => {
        context('when get a unique physical activity habits', () => {
            it('should return status code 200 and a physical activity habits', () => {
                return request
                    .get(`/patients/${activity.patient_id}/physicalactivityhabits/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('created_at')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/patients/123/physicalactivityhabits/${activity.id}`)
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

            it('should return status code 400 and message from invalid physicalactivityhabits_id', () => {
                return request
                    .get(`/patients/${activity.patient_id}/physicalactivityhabits/123`)
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

        context('when the physical activity habits is not founded', () => {
            it('should return status code 404 and message from physical activity habits not found', () => {
                return request
                    .get(`/patients/${new ObjectID()}/physicalactivityhabits/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Physical activity habits not founded!')
                        expect(res.body.description).to.eql('Physical activity habits not founded or already removed. A new ' +
                            'operation for the same resource is required.')
                    })
            })
        })
    })

    describe('PATCH` /patients/:patient_id/physicalactivityhabits/:physicalactivityhabits_id', () => {
        context('when update a physical activity habits', () => {
            it('should return status code 200 and a updated physical activity habits', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .patch
                    (`/patients/${DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id}/physicalactivityhabits/${activity.id}`)
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
                    .patch(`/patients/123/physicalactivityhabits/${activity.id}`)
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

            it('should return status code 400 and message from invalid physicalactivityhabits_id', () => {
                return request
                    .patch(`/patients/${activity.patient_id}/physicalactivityhabits/123`)
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

        context('when the physical activity habits is not founded', () => {
            it('should return status code 404 and message from physical activity habits not founded', () => {
                return request
                    .patch(`/patients/${new ObjectID()}/physicalactivityhabits/${new ObjectID()}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Physical activity habits not founded!')
                        expect(res.body.description).to.eql('Physical activity habits not founded or already removed. A new' +
                            ' operation for the same resource is required.')
                        activity.patient_id = DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.patient_id
                        activity.created_at = DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS.created_at
                    })
            })
        })
    })

    describe('DELETE` /patients/:patient_id/physicalactivityhabits/:physicalactivityhabits_id', () => {
        context('when delete a physical activity habits', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
                return request
                    .delete(`/patients/${activity.patient_id}/physicalactivityhabits/${result.id}`)
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
                    .delete(`/patients/123/physicalactivityhabits/${activity.id}`)
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

            it('should return status code 400 and message from invalid physicalactivityhabits_id', () => {
                return request
                    .delete(`/patients/${activity.patient_id}/physicalactivityhabits/123`)
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

        context('when the physical activity habits is not founded', () => {
            it('should return status code 204 and no content', async () => {
                return request
                    .delete(`/patients/${new ObjectID()}/physicalactivityhabits/${new ObjectID()}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })
    })

    describe('GET` /patients/:patient_id/physicalactivityhabits/', () => {
        context('when get all physical activity habits', () => {
            it('should return status code 200 and a list of physical activity habits', () => {
                return request
                    .get(`/patients/${activity.patient_id}/physicalactivityhabits`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(1)
                        expect(res.body[0]).to.have.property('id')
                        expect(res.body[0]).to.have.property('created_at')
                        expect(res.body[0].created_at).to.eql(activity.created_at)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get('/patients/123/physicalactivityhabits')
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

        context('when there no are physical activity habits', () => {
            it('should return status code 200 and a empty list', async () => {
                await deleteAllActivities({}).then()
                return request
                    .get(`/patients/${activity.patient_id}/physicalactivityhabits`)
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
    return PhysicalActivityHabitsRepoModel.deleteMany({})
}

async function createActivity(doc) {
    return PhysicalActivityHabitsRepoModel.create(doc)
}
