import { Patient } from '../../../src/application/domain/model/patient'
import { DefaultEntityMock } from '../../mocks/default.entity.mock'
import { App } from '../../../src/app'
import { Identifier } from '../../../src/di/identifiers'
import { DI } from '../../../src/di/di'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { Container } from 'inversify'
import { PatientRepoModel } from '../../../src/infrastructure/database/schema/patient.schema'
import { expect } from 'chai'
import { ObjectID } from 'bson'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: PilotStudiesPatients', () => {
    const patient: Patient = new Patient().fromJSON(DefaultEntityMock.PATIENT)

    before(async () => {
            try {
                await dbConnection.tryConnect(0, 500)
                await deleteAllPatients({})
            } catch (err) {
                throw new Error('Failure on Patient test: ' + err.message)
            }
        }
    )

    after(async () => {
        try {
            await deleteAllPatients({})
            await dbConnection.dispose()
        } catch (err) {
            throw new Error('Failure on Patient test: ' + err.message)
        }
    })

    describe('POST /pilotstudies/:pilotstudy_id/patients', () => {
        context('when save a new patient', () => {
            it('should return status code 200 and saved patient', () => {
                return request
                    .post(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .send(patient.toJSON())
                    .set('Content-Type', 'application/json')
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('pilotstudy_id')
                        expect(res.body.pilotstudy_id).to.eql(patient.pilotstudy_id)
                        expect(res.body).to.have.property('first_name')
                        expect(res.body.first_name).to.eql(patient.first_name)
                        expect(res.body).to.have.property('last_name')
                        expect(res.body.last_name).to.eql(patient.last_name)
                        expect(res.body).to.have.property('gender')
                        expect(res.body.gender).to.eql(patient.gender)
                        expect(res.body).to.have.property('birth_date')
                        expect(res.body.birth_date).to.eql(patient.birth_date)
                        patient.id = res.body.id
                    })
            })
        })

        context('when there are a patient with same unique parameters', () => {
            it('should return status code 409 and message from duplicate items', () => {
                return request
                    .post(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .send(patient.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(409)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.eql('A registration with the same unique data already exists!')
                    })
            })
        })

        context('when here are validation errors', () => {
            it('should return status code 400 and message for does pass invalid pilotstudy_id', () => {
                return request
                    .post('/pilotstudies/123/patients')
                    .send(patient.toJSON())
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

            it('should return status code 400 and message for does not pass first_name', () => {
                patient.first_name = undefined
                return request
                    .post(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .send(patient.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Required fields were not provided...')
                        expect(res.body.description).to.eql('Patient validation: first_name is required!')
                        patient.first_name = DefaultEntityMock.PATIENT.first_name
                    })
            })

            it('should return status code 400 and message for does not pass last_name', () => {
                patient.last_name = undefined
                return request
                    .post(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .send(patient.toJSON())
                    .expect(400)
                    .set('Content-Type', 'application/json')
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Required fields were not provided...')
                        expect(res.body.description).to.eql('Patient validation: last_name is required!')
                        patient.last_name = DefaultEntityMock.PATIENT.last_name
                    })
            })

            it('should return status code 400 and message for does not pass gender', () => {
                patient.gender = undefined
                return request
                    .post(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .send(patient.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Required fields were not provided...')
                        expect(res.body.description).to.eql('Patient validation: gender is required!')
                        patient.gender = DefaultEntityMock.PATIENT.gender
                    })
            })

            it('should return status code 400 and message for does pass invalid gender', () => {
                patient.gender = 'invalid'
                return request
                    .post(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .send(patient.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Value not mapped for gender: invalid')
                        expect(res.body.description).to.eql('The mapped values are: male, female.')
                        patient.gender = DefaultEntityMock.PATIENT.gender
                    })
            })

            it('should return status code 400 and message for does not pass birth_date', () => {
                patient.birth_date = undefined
                return request
                    .post(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .send(patient.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Required fields were not provided...')
                        expect(res.body.description).to.eql('Patient validation: birth_date is required!')
                        patient.birth_date = DefaultEntityMock.PATIENT.birth_date
                    })
            })

            it('should return status code 400 and message for does pass invalid birth_date', () => {
                patient.birth_date = '20-08-1987'
                return request
                    .post(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .send(patient.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Date: 20-08-1987 is not in valid ISO 8601 format.')
                        expect(res.body.description).to.eql('Date must be in the format: yyyy-MM-dd')
                        patient.birth_date = DefaultEntityMock.PATIENT.birth_date
                    })
            })
        })
    })

    describe('GET /pilotstudies/:pilotstudy_id/patients/:patient_id', () => {
        context('when get a unique patient', () => {
            it('should return status code 200 and a patient', () => {
                return request
                    .get(`/pilotstudies/${patient.pilotstudy_id}/patients/${patient.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body.id).to.eql(patient.id)
                        expect(res.body).to.have.property('pilotstudy_id')
                        expect(res.body.pilotstudy_id).to.eql(patient.pilotstudy_id)
                        expect(res.body).to.have.property('first_name')
                        expect(res.body.first_name).to.eql(patient.first_name)
                        expect(res.body).to.have.property('last_name')
                        expect(res.body.last_name).to.eql(patient.last_name)
                        expect(res.body).to.have.property('gender')
                        expect(res.body.gender).to.eql(patient.gender)
                        expect(res.body).to.have.property('birth_date')
                        expect(res.body.birth_date).to.eql(patient.birth_date)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message for does pass invalid pilotstudy_id', () => {
                return request
                    .get(`/pilotstudies/123/patients/${patient.id}`)
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

            it('should return status code 400 and message for does pass invalid patient_id', () => {
                return request
                    .get(`/pilotstudies/${patient.pilotstudy_id}/patients/123`)
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

        context('when the patient is not founded', () => {
            it('should return status code 404 and message from patient not found', () => {
                return request
                    .get(`/pilotstudies/${patient.pilotstudy_id}/patients/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Patient not found!')
                        expect(res.body.description).to.eql('Patient not found or already removed. A new operation for the ' +
                            'same resource is required.')
                    })
            })
        })

    })

    describe('PATCH /pilotstudies/:pilotstudy_id/patients/:patient_id', () => {
        context('when update a patient', () => {
            it('should return status code 200 and updated patient', () => {
                const body = patient.toJSON()
                delete body.pilotstudy_id
                return request
                    .patch(`/pilotstudies/${patient.pilotstudy_id}/patients/${patient.id}`)
                    .set('Content-Type', 'application/json')
                    .send(body)
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body.id).to.eql(patient.id)
                        expect(res.body).to.have.property('first_name')
                        expect(res.body.first_name).to.eql(patient.first_name)
                        expect(res.body).to.have.property('last_name')
                        expect(res.body.last_name).to.eql(patient.last_name)
                        expect(res.body).to.have.property('gender')
                        expect(res.body.gender).to.eql(patient.gender)
                        expect(res.body).to.have.property('birth_date')
                        expect(res.body.birth_date).to.eql(patient.birth_date)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from pass invalid pilotstudy_id', () => {
                return request
                    .patch(`/pilotstudies/123/patients/${patient.id}`)
                    .set('Content-Type', 'application/json')
                    .send(patient.toJSON())
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Some ID provided does not have a valid format!')
                        expect(res.body.description).to.eql('A 24-byte hex ID similar to this: 507f191e810c19729de860ea ' +
                            'is expected.')
                    })

            })

            it('should return status code 400 and message from pass invalid id', () => {
                return request
                    .patch(`/pilotstudies/${patient.pilotstudy_id}/patients/123`)
                    .set('Content-Type', 'application/json')
                    .send(patient.toJSON())
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Some ID provided does not have a valid format!')
                        expect(res.body.description).to.eql('A 24-byte hex ID similar to this: 507f191e810c19729de860ea ' +
                            'is expected.')
                    })
            })

            it('should return status code 400 and message from pass invalid gender', () => {
                patient.gender = 'invalid'
                return request
                    .patch(`/pilotstudies/${patient.pilotstudy_id}/patients/${patient.id}`)
                    .set('Content-Type', 'application/json')
                    .send(patient.toJSON())
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Value not mapped for gender: invalid')
                        expect(res.body.description).to.eql('The mapped values are: male, female.')
                        patient.gender = DefaultEntityMock.PATIENT.gender
                    })
            })

            it('should return status code 400 and message from pass invalid birth date', () => {
                patient.birth_date = '20-08-1987'
                return request
                    .patch(`/pilotstudies/${patient.pilotstudy_id}/patients/${patient.id}`)
                    .set('Content-Type', 'application/json')
                    .send(patient.toJSON())
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Date: 20-08-1987 is not in valid ISO 8601 format.')
                        expect(res.body.description).to.eql('Date must be in the format: yyyy-MM-dd')
                        patient.birth_date = DefaultEntityMock.PATIENT.birth_date
                    })
            })

            context('when the patient is not founded', () => {
                it('should return status code 404 and message from patient not found', () => {
                    return request
                        .patch(`/pilotstudies/${patient.pilotstudy_id}/patients/${new ObjectID()}`)
                        .set('Content-Type', 'application/json')
                        .send(patient.toJSON())
                        .expect(404)
                        .then(res => {
                            expect(res.body).to.have.property('message')
                            expect(res.body).to.have.property('description')
                            expect(res.body.message).to.eql('Patient not found!')
                            expect(res.body.description).to.eql('Patient not found or already removed. A new operation for the ' +
                                'same resource is required.')
                        })
                })
            })
        })
    })

    describe('DELETE /pilotstudies/:pilotstudy_id/patients/:patient_id', () => {
        context('when delete a patient', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createPatient({
                    pilotstudy_id: '5c86d00c2239a48ea20a0134',
                    first_name: 'Jorge',
                    last_name: 'Aragão',
                    gender: 'male',
                    birth_date: '1935-01-08'
                })

                return request
                    .delete(`/pilotstudies/${patient.pilotstudy_id}/patients/${result.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from pass invalid pilotstudy_id', () => {
                return request
                    .delete(`/pilotstudies/123/patients/${patient.id}`)
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

            it('should return status code 400 and message from pass invalid patient_id', () => {
                return request
                    .delete(`/pilotstudies/${patient.pilotstudy_id}/patients/123`)
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

        context('when the patient is not founded', () => {
            it('should return status code 204 and no content', async () => {
                return request
                    .delete(`/pilotstudies/${new ObjectID()}/patients/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })
    })
    describe('GET /pilotstudies/:pilotstudy_id/patients', () => {
        context('when get all patients', () => {
            it('should return status code 200 and a list of patients', () => {
                return request
                    .get(`/pilotstudies/${patient.pilotstudy_id}/patients`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(1)
                        expect(res.body[0]).to.have.property('id')
                        expect(res.body[0]).to.have.property('pilotstudy_id')
                        expect(res.body[0].pilotstudy_id).to.eql(patient.pilotstudy_id)
                        expect(res.body[0]).to.have.property('first_name')
                        expect(res.body[0].first_name).to.eql(patient.first_name)
                        expect(res.body[0]).to.have.property('last_name')
                        expect(res.body[0].last_name).to.eql(patient.last_name)
                        expect(res.body[0]).to.have.property('gender')
                        expect(res.body[0].gender).to.eql(patient.gender)
                        expect(res.body[0]).to.have.property('birth_date')
                        expect(res.body[0].birth_date).to.eql(patient.birth_date)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get('/pilotstudies/123/patients')
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

        context('when there are no patients', () => {
            it('should return status code 200 and a empty list', async () => {
                await deleteAllPatients({}).then()
                return request
                    .get(`/pilotstudies/${patient.pilotstudy_id}/patients`)
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

async function deleteAllPatients(doc) {
    return await PatientRepoModel.deleteMany(doc)
}

async function createPatient(doc) {
    return await PatientRepoModel.create(doc)
}
