import { Container } from 'inversify'
import { DI } from '../../../src/di/di'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { Patient } from '../../../src/application/domain/model/patient'
import { IPatientRepository } from '../../../src/application/port/patient.repository.interface'
import { PatientRepoModel } from '../../../src/infrastructure/database/schema/patient.schema'
import { expect } from 'chai'
import { MedicalRecord } from '../../../src/application/domain/model/medical.record'
import { ObjectID } from 'bson'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { MedicalRecordRepoModel } from '../../../src/infrastructure/database/schema/medical.record.schema'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const patientRepo: IPatientRepository = container.get(Identifier.PATIENT_REPOSITORY)
const request = require('supertest')(app.getExpress())

describe('Routes: MedicalRecord', () => {
    const activity: MedicalRecord = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)
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
                throw new Error('Failure on Medical Record test: ' + err.message)
            }
        }
    )

    after(async () => {
        try {
            await deleteAllActivities({})
            await deleteAllPatients({})
            await dbConnection.dispose()
        } catch (err) {
            throw new Error('Failure on Medical Record test: ' + err.message)
        }
    })

    describe('POST /patients/:patient_id/medicalrecords', () => {
        context('when save a new medical record', () => {
            it('should return status code 200 and the saved feeding habit record', () => {
                return request
                    .post(`/patients/${patient.id}/medicalrecords`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('chronic_diseases')
                        expect(res.body.chronic_diseases).to.eql(activity.chronic_diseases)
                        activity.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            const body = Object.assign(activity.toJSON(), {})

            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .post('/patients/123/medicalrecords')
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

            it('should return status code 400 and message from does not pass chronic diseases', () => {
                delete body.chronic_diseases
                return request
                    .post(`/patients/${patient.id}/medicalrecords`)
                    .send(body)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Required fields were not provided...')
                        expect(res.body.description).to.eql('Medical Record validation: chronic_diseases is required!')
                        body.chronic_diseases = [Object.assign(DefaultEntityMock.CHRONIC_DISEASE, {})]
                    })
            })

            it('should return status code 400 and message from does not pass chronic diseases type', () => {
                delete body.chronic_diseases[0].type
                return request
                    .post(`/patients/${patient.id}/medicalrecords`)
                    .send(body)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Required fields were not provided...')
                        expect(res.body.description).to.eql('Medical Record validation: chronic_disease.type is required!')
                    })
            })

            it('should return status code 400 and message from does pass invalid chronic diseases type', () => {
                body.chronic_diseases[0].type = 'invalid'
                return request
                    .post(`/patients/${patient.id}/medicalrecords`)
                    .send(body)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Value not mapped for type: invalid')
                        expect(res.body.description).to.eql('The mapped values are: hypertension, blood_fat, diabetes.')
                        body.chronic_diseases[0].type = activity.chronic_diseases![0].type
                    })
            })

            it('should return status code 400 and message from does not pass chronic diseases.disease_history', () => {
                delete body.chronic_diseases[0].disease_history
                return request
                    .post(`/patients/${patient.id}/medicalrecords`)
                    .send(body)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Required fields were not provided...')
                        expect(res.body.description).to.eql('Medical Record validation: chronic_disease.disease_history is' +
                            ' required!')
                    })
            })

            it('should return status code 400 and message from does pass invalid chronic diseases.disease_history', () => {
                body.chronic_diseases[0].disease_history = 'invalid'
                return request
                    .post(`/patients/${patient.id}/medicalrecords`)
                    .send(body)
                    .set('Content-Type', 'application/json')
                    .expect(400)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Value not mapped for disease_history: invalid')
                        expect(res.body.description).to.eql('The mapped values are: yes, no, undefined.')
                        body.chronic_diseases[0].disease_history = activity.chronic_diseases![0].disease_history
                    })
            })
        })
    })

    describe('GET /patients/:patient_id/medicalrecords/:medicalrecord_id', () => {
        context('when get a unique medical record', () => {
            it('should return status code 200 and a medical record', () => {
                return request
                    .get(`/patients/${patient.id}/medicalrecords/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('chronic_diseases')
                        expect(res.body.chronic_diseases).to.eql(activity.chronic_diseases)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/patients/123/medicalrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid medicalrecord_id', () => {
                return request
                    .get(`/patients/${patient.id}/medicalrecords/123`)
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

        context('when the medical record is not founded', () => {
            it('should return status code 404 and message from medical record not found', () => {
                return request
                    .get(`/patients/${new ObjectID()}/medicalrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Medical record not found!')
                        expect(res.body.description).to.eql('Medical record not found or already removed. A new operation for' +
                            ' the same resource is required.')
                    })
            })
        })
    })

    describe('PATCH` /patients/:patient_id/medicalrecords/:medicalrecord_id', () => {
        context('when update a medical record', () => {
            it('should return status code 200 and a updated medical record', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .patch(`/patients/${patient.id}/medicalrecords/${activity.id}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('chronic_diseases')
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .patch(`/patients/123/medicalrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid medicalrecord_id', () => {
                return request
                    .patch(`/patients/${patient.id}/medicalrecords/123`)
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

        context('when the medical record is not founded', () => {
            it('should return status code 404 and message from medical record not found', () => {
                return request
                    .patch(`/patients/${new ObjectID()}/medicalrecords/${new ObjectID()}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Medical record not found!')
                        expect(res.body.description).to.eql('Medical record not found or already removed. A new operation for' +
                            ' the same resource is required.')
                        activity.patient_id = patient.id
                        activity.created_at = DefaultEntityMock.FEEDING_HABITS_RECORD.created_at
                    })
            })
        })
    })

    describe('DELETE` /patients/:patient_id/medicalrecords/:medicalrecord_id', () => {
        context('when delete a medical record', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.MEDICAL_RECORD)
                return request
                    .delete(`/patients/${patient.id}/medicalrecords/${result.id}`)
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
                    .delete(`/patients/123/medicalrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid medicalrecord_id', () => {
                return request
                    .delete(`/patients/${patient.id}/medicalrecords/123`)
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

        context('when the medical record is not founded', () => {
            it('should return status code 204 and no content', async () => {
                return request
                    .delete(`/patients/${new ObjectID()}/medicalrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })
    })

    describe('GET` /patients/:patient_id/medicalrecords/', () => {
        context('when get all medical records', () => {
            it('should return status code 200 and a list of medical records', () => {
                return request
                    .get(`/patients/${patient.id}/medicalrecords`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(1)
                        expect(res.body[0]).to.have.property('id')
                        expect(res.body[0]).to.have.property('created_at')
                        expect(res.body[0].created_at).to.eql(activity.created_at)
                        expect(res.body[0]).to.have.property('chronic_diseases')
                        expect(res.body[0].chronic_diseases).to.eql(activity.chronic_diseases)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get('/patients/123/medicalrecords')
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

        context('when there no are medical records', () => {
            it('should return status code 200 and empty list', async () => {
                await deleteAllActivities({}).then()
                return request
                    .get(`/patients/${patient.id}/medicalrecords`)
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
    return MedicalRecordRepoModel.deleteMany({})
}

async function createActivity(doc) {
    return MedicalRecordRepoModel.create(doc)
}

async function deleteAllPatients(doc) {
    return await PatientRepoModel.deleteMany(doc)
}
