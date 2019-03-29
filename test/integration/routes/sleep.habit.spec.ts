import { DefaultEntityMock } from '../../mocks/default.entity.mock'
import { Container } from 'inversify'
import { DI } from '../../../src/di/di'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { ActivityHabitsRepoModel } from '../../../src/infrastructure/database/schema/activity.habits.schema'
import { Patient } from '../../../src/application/domain/model/patient'
import { IPatientRepository } from '../../../src/application/port/patient.repository.interface'
import { PatientRepoModel } from '../../../src/infrastructure/database/schema/patient.schema'
import { expect } from 'chai'
import { SleepHabit } from '../../../src/application/domain/model/sleep.habit'
import { ObjectID } from 'bson'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const patientRepo: IPatientRepository = container.get(Identifier.PATIENT_REPOSITORY)
const request = require('supertest')(app.getExpress())

describe('Routes: SleepHabit', () => {
    const activity: SleepHabit = new SleepHabit().fromJSON(DefaultEntityMock.SLEEP_HABIT)
    const patient: Patient = new Patient().fromJSON(DefaultEntityMock.PATIENT)

    before(async () => {
            try {
                await dbConnection.tryConnect(0, 500)
                await deleteAllActivities({})
                await deleteAllPatients({})
                const result = await patientRepo.create(new Patient().fromJSON(DefaultEntityMock.PATIENT))
                patient.id = result.id
                activity.patient_id = patient.id
            } catch (err) {
                throw new Error('Failure on Patient test: ' + err.message)
            }
        }
    )

    after(async () => {
        try {
            await deleteAllActivities({})
            await deleteAllPatients({})
            await dbConnection.dispose()
        } catch (err) {
            throw new Error('Failure on Patient test: ' + err.message)
        }
    })

    describe('POST /patients/:patient_id/sleephabits', () => {
        context('when save a new sleep habit', () => {
            it('should return status code 200 and the saved sleep habit', () => {
                return request
                    .post(`/patients/${patient.id}/sleephabits`)
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
                    .post('/patients/123/sleephabits')
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

    describe('GET /patients/:patient_id/sleephabits/:sleephabit_id', () => {
        context('when get a unique sleep habit', () => {
            it('should return status code 200 and a sleep habit', () => {
                return request
                    .get(`/patients/${patient.id}/sleephabits/${activity.id}`)
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
                    .get(`/patients/123/sleephabits/${activity.id}`)
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

            it('should return status code 400 and message from invalid sleephabit_id', () => {
                return request
                    .get(`/patients/${patient.id}/sleephabits/123`)
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

        context('when the sleep habit is not founded', () => {
            it('should return status code 404 and message from sleep habit not found', () => {
                return request
                    .get(`/patients/${new ObjectID()}/sleephabits/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Sleep habit not found!')
                        expect(res.body.description).to.eql('Sleep habit not found or already removed. A new operation for' +
                            ' the same resource is required.')
                    })
            })
        })
    })

    describe('PATCH` /patients/:patient_id/sleephabits/:sleephabit_id', () => {
        context('when update a sleep habit', () => {
            it('should return status code 200 and a updated sleep habit', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .patch(`/patients/${patient.id}/sleephabits/${activity.id}`)
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
                    .patch(`/patients/123/sleephabits/${activity.id}`)
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

            it('should return status code 400 and message from invalid sleephabit_id', () => {
                return request
                    .patch(`/patients/${patient.id}/sleephabits/123`)
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

        context('when the sleep habit is not founded', () => {
            it('should return status code 404 and message from sleep habit not found', () => {
                return request
                    .patch(`/patients/${new ObjectID()}/sleephabits/${new ObjectID()}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Sleep habit not found!')
                        expect(res.body.description).to.eql('Sleep habit not found or already removed. A new operation for' +
                            ' the same resource is required.')
                    })
            })
        })
    })

    describe('DELETE` /patients/:patient_id/sleephabits/:sleephabit_id', () => {
        context('when delete a sleep habit', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
                return request
                    .delete(`/patients/${patient.id}/sleephabits/${result.id}`)
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
                    .delete(`/patients/123/sleephabits/${activity.id}`)
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

            it('should return status code 400 and message from invalid sleephabit_id', () => {
                return request
                    .delete(`/patients/${patient.id}/sleephabits/123`)
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

        context('when the sleep habit is not founded', () => {
            it('should return status code 204 and no content', () => {
                return request
                    .delete(`/patients/${new ObjectID()}/sleephabits/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })
    })

    describe('GET` /patients/:patient_id/sleephabits/', () => {
        context('when get all sleep habits', () => {
            it('should return status code 200 and a list of sleep habits', () => {
                return request
                    .get(`/patients/${patient.id}/sleephabits`)
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
                    .get('/patients/123/sleephabits')
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

        context('when the sleep habit is not founded', () => {
            it('should return status code 200 and a empty list', () => {
                return request
                    .get(`/patients/${new ObjectID()}/sleephabits`)
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
    return ActivityHabitsRepoModel.deleteMany({})
}

async function createActivity(doc) {
    return ActivityHabitsRepoModel.create(doc)
}

async function deleteAllPatients(doc) {
    return await PatientRepoModel.deleteMany(doc)
}
