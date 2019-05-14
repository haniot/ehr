import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {OralHealthRecord} from '../../../src/application/domain/model/oral.health.record'
import {Container} from 'inversify'
import {DI} from '../../../src/di/di'
import {IConnectionDB} from '../../../src/infrastructure/port/connection.db.interface'
import {Identifier} from '../../../src/di/identifiers'
import {App} from '../../../src/app'
import {OralHealthRecordRepoModel} from '../../../src/infrastructure/database/schema/oral.health.record.schema'
import {expect} from 'chai'
import {ObjectID} from 'bson'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: OralHealthRecord', () => {
    const activity: OralHealthRecord = new OralHealthRecord().fromJSON(DefaultEntityMock.ORAL_HEALTH_RECORD)

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

    describe('POST /patients/:patient_id/oralhealthrecords', () => {
        context('when save a new oral health record', () => {
            it('should return status code 200 and the saved oral health record', () => {
                console.log('ORAL HEALTH activity ', activity)
                return request
                    .post(`/patients/${activity.patient_id}/oralhealthrecords`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        console.log('ORAL HEALTH activity ', activity)
                        expect(res.body).to.have.property('id')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('created_at')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('teeth_brushing_freq')
                        expect(res.body.teeth_brushing_freq).to.eql(activity.teeth_brushing_freq)
                        expect(res.body).to.have.property('teeth_lesions')

                        activity.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            const body = Object.assign(activity.toJSON(), {})

            it('should return status code 400 and message for invalid patient_id', () => {
                return request
                    .post('/patients/123/oralhealthrecords/')
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

    describe('GET /patients/:patient_id/oralhealthrecords/:oralhealthrecord_id', () => {
        context('when get a unique oral health record', () => {
            it('should return status code 200 and a oral health record', () => {
                return request
                    .get(`/patients/${activity.patient_id}/oralhealthrecords/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('created_at')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('teeth_brushing_freq')
                        expect(res.body.teeth_brushing_freq).to.eql(activity.teeth_brushing_freq)
                        expect(res.body).to.have.property('teeth_lesions')
                       // expect(res.body.teeth_lesions).to.eql(activity.teeth_lesions)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/patients/123/oralhealthrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid oralhealthrecord_id', () => {
                return request
                    .get(`/patients/${activity.patient_id}/oralhealthrecords/123`)
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

        context('when the oral health record is not founded', () => {
            it('should return status code 404 and message from oral health record not found', () => {
                return request
                    .get(`/patients/${new ObjectID()}/oralhealthrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Oral health record not found!')
                        expect(res.body.description).to.eql('Oral health record not found or already removed. A new ' +
                            'operation for the same resource is required.')
                    })
            })
        })
    })
    describe('PATCH` /patients/:patient_id/oralhealthrecords/:oralhealthrecord_id', () => {
        context('when update a oral health record', () => {
            it('should return status code 200 and a updated oral health record', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .patch(`/patients/${DefaultEntityMock.ORAL_HEALTH_RECORD.patient_id}/oralhealthrecords/${activity.id}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('teeth_brushing_freq')
                        expect(res.body.teeth_brushing_freq).to.eql(activity.teeth_brushing_freq)
                        expect(res.body).to.have.property('teeth_lesions')
                     //   expect(res.body.teeth_lesions).to.eql(activity.teeth_lesions)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .patch(`/patients/123/oralhealthrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid oralhealthrecord_id', () => {
                return request
                    .patch(`/patients/${activity.patient_id}/oralhealthrecords/123`)
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

        context('when the oral health record is not founded', () => {
            it('should return status code 404 and message from oral health record not found', () => {
                return request
                    .patch(`/patients/${new ObjectID()}/oralhealthrecords/${new ObjectID()}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Oral health record not found!')
                        expect(res.body.description).to.eql('Oral health record not found or already removed. A new ' +
                            'operation for the same resource is required.')
                        activity.patient_id = DefaultEntityMock.ORAL_HEALTH_RECORD.patient_id
                        activity.created_at = DefaultEntityMock.ORAL_HEALTH_RECORD.created_at
                    })
            })
        })
    })
    describe('DELETE` /patients/:patient_id/oralhealthrecords/:oralhealthrecord_id', () => {
        context('when delete a oral health record', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.ORAL_HEALTH_RECORD)
                return request
                    .delete(`/patients/${activity.patient_id}/oralhealthrecords/${result.id}`)
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
                    .delete(`/patients/123/oralhealthrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid oralhealthrecord_id', () => {
                return request
                    .delete(`/patients/${activity.patient_id}/oralhealthrecords/123`)
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

        context('when the oral health record is not founded', () => {
            it('should return status code 204 and no content', async () => {
                return request
                    .delete(`/patients/${new ObjectID()}/oralhealthrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })
    })

})

async function deleteAllActivities(doc) {
    return OralHealthRecordRepoModel.deleteMany({})
}

async function createActivity(doc) {
    return OralHealthRecordRepoModel.create(doc)
}
