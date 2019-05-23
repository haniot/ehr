import { Container } from 'inversify'
import { DI } from '../../../src/di/di'
import { IConnectionDB } from '../../../src/infrastructure/port/connection.db.interface'
import { Identifier } from '../../../src/di/identifiers'
import { App } from '../../../src/app'
import { FeedingHabitsRecord } from '../../../src/application/domain/model/feeding.habits.record'
import { expect } from 'chai'
import { ObjectID } from 'bson'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { FeedingHabitsRecordRepoModel } from '../../../src/infrastructure/database/schema/feeding.habits.record.schema'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: FeedingHabitsRecord', () => {
    const activity: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(DefaultEntityMock.FEEDING_HABITS_RECORD)

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

    describe('POST /patients/:patient_id/feedinghabitsrecords', () => {
        context('when save a new feeding habits record', () => {
            it('should return status code 200 and the saved feeding habit record', () => {
                return request
                    .post(`/patients/${activity.patient_id}/feedinghabitsrecords`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('weekly_feeding_habits')
                        expect(res.body.weekly_feeding_habits).to.eql(activity.weekly_feeding_habits)
                        expect(res.body).to.have.property('daily_water_glasses')
                        expect(res.body.daily_water_glasses).to.eql(activity.daily_water_glasses)
                        expect(res.body).to.have.property('six_month_breast_feeding')
                        expect(res.body.six_month_breast_feeding).to.eql(activity.six_month_breast_feeding)
                        expect(res.body).to.have.property('food_allergy_intolerance')
                        expect(res.body.food_allergy_intolerance).to.eql(activity.food_allergy_intolerance)
                        expect(res.body).to.have.property('breakfast_daily_frequency')
                        expect(res.body.breakfast_daily_frequency).to.eql(activity.breakfast_daily_frequency)
                        activity.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            const body = Object.assign(activity.toJSON(), {})

            it('should return status code 400 and message for invalid patient_id', () => {
                return request
                    .post('/patients/123/feedinghabitsrecords/')
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

    describe('GET /patients/:patient_id/feedinghabitsrecords/:feedinghabitsrecord_id', () => {
        context('when get a unique feeding habits record', () => {
            it('should return status code 200 and a feeding habits record', () => {
                return request
                    .get(`/patients/${activity.patient_id}/feedinghabitsrecords/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('created_at')
                        expect(res.body).to.have.property('weekly_feeding_habits')
                        expect(res.body.weekly_feeding_habits).to.eql(activity.weekly_feeding_habits)
                        expect(res.body).to.have.property('daily_water_glasses')
                        expect(res.body.daily_water_glasses).to.eql(activity.daily_water_glasses)
                        expect(res.body).to.have.property('six_month_breast_feeding')
                        expect(res.body.six_month_breast_feeding).to.eql(activity.six_month_breast_feeding)
                        expect(res.body).to.have.property('food_allergy_intolerance')
                        expect(res.body.food_allergy_intolerance).to.eql(activity.food_allergy_intolerance)
                        expect(res.body).to.have.property('breakfast_daily_frequency')
                        expect(res.body.breakfast_daily_frequency).to.eql(activity.breakfast_daily_frequency)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/patients/123/feedinghabitsrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid feedinghabitsrecord_id', () => {
                return request
                    .get(`/patients/${activity.patient_id}/feedinghabitsrecords/123`)
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

        context('when the feeding habits record is not founded', () => {
            it('should return status code 404 and message from feeding habits record not found', () => {
                return request
                    .get(`/patients/${new ObjectID()}/feedinghabitsrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Feeding habits record not found!')
                        expect(res.body.description).to.eql('Feeding habits record not found or already removed. A new ' +
                            'operation for the same resource is required.')
                    })
            })
        })
    })

    describe('PATCH` /patients/:patient_id/feedinghabitsrecords/:feedinghabitsrecord_id', () => {
        context('when update a feeding habits record', () => {
            it('should return status code 200 and a updated feeding habits record', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .patch(`/patients/${DefaultEntityMock.FEEDING_HABITS_RECORD.patient_id}/feedinghabitsrecords/${activity.id}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('weekly_feeding_habits')
                        expect(res.body.weekly_feeding_habits).to.eql(activity.weekly_feeding_habits)
                        expect(res.body).to.have.property('daily_water_glasses')
                        expect(res.body.daily_water_glasses).to.eql(activity.daily_water_glasses)
                        expect(res.body).to.have.property('six_month_breast_feeding')
                        expect(res.body.six_month_breast_feeding).to.eql(activity.six_month_breast_feeding)
                        expect(res.body).to.have.property('food_allergy_intolerance')
                        expect(res.body.food_allergy_intolerance).to.eql(activity.food_allergy_intolerance)
                        expect(res.body).to.have.property('breakfast_daily_frequency')
                        expect(res.body.breakfast_daily_frequency).to.eql(activity.breakfast_daily_frequency)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .patch(`/patients/123/feedinghabitsrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid feedinghabitsrecord_id', () => {
                return request
                    .patch(`/patients/${activity.patient_id}/feedinghabitsrecords/123`)
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

        context('when the feeding habits record is not founded', () => {
            it('should return status code 404 and message from feeding habits record not found', () => {
                return request
                    .patch(`/patients/${new ObjectID()}/feedinghabitsrecords/${new ObjectID()}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Feeding habits record not found!')
                        expect(res.body.description).to.eql('Feeding habits record not found or already removed. A new ' +
                            'operation for the same resource is required.')
                        activity.patient_id = DefaultEntityMock.FEEDING_HABITS_RECORD.patient_id
                        activity.created_at = DefaultEntityMock.FEEDING_HABITS_RECORD.created_at
                    })
            })
        })
    })

    describe('DELETE` /patients/:patient_id/feedinghabitsrecords/:feedinghabitsrecord_id', () => {
        context('when delete a feeding habits record', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.FEEDING_HABITS_RECORD)
                return request
                    .delete(`/patients/${activity.patient_id}/feedinghabitsrecords/${result.id}`)
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
                    .delete(`/patients/123/feedinghabitsrecords/${activity.id}`)
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

            it('should return status code 400 and message from invalid feedinghabitsrecord_id', () => {
                return request
                    .delete(`/patients/${activity.patient_id}/feedinghabitsrecords/123`)
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

        context('when the feeding habits record is not founded', () => {
            it('should return status code 204 and no content', async () => {
                return request
                    .delete(`/patients/${new ObjectID()}/feedinghabitsrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })
    })

    describe('GET` /patients/:patient_id/feedinghabitsrecords/', () => {
        context('when get all feeding habits records', () => {
            it('should return status code 200 and a list of feeding habits record', () => {
                return request
                    .get(`/patients/${activity.patient_id}/feedinghabitsrecords`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(1)
                        expect(res.body[0]).to.have.property('id')
                        expect(res.body[0].created_at).to.eql(activity.created_at)
                        expect(res.body[0]).to.have.property('created_at')
                        expect(res.body[0].created_at).to.eql(activity.created_at)
                        expect(res.body[0]).to.have.property('weekly_feeding_habits')
                        expect(res.body[0].weekly_feeding_habits).to.eql(activity.weekly_feeding_habits)
                        expect(res.body[0]).to.have.property('daily_water_glasses')
                        expect(res.body[0].daily_water_glasses).to.eql(activity.daily_water_glasses)
                        expect(res.body[0]).to.have.property('six_month_breast_feeding')
                        expect(res.body[0].six_month_breast_feeding).to.eql(activity.six_month_breast_feeding)
                        expect(res.body[0]).to.have.property('food_allergy_intolerance')
                        expect(res.body[0].food_allergy_intolerance).to.eql(activity.food_allergy_intolerance)
                        expect(res.body[0]).to.have.property('breakfast_daily_frequency')
                        expect(res.body[0].breakfast_daily_frequency).to.eql(activity.breakfast_daily_frequency)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get('/patients/123/feedinghabitsrecords/')
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

        context('when the feeding habits record is not founded', () => {
            it('should return status code 200 and a empty list', async () => {
                await deleteAllActivities({}).then()
                return request
                    .get(`/patients/${activity.patient_id}/feedinghabitsrecords/`)
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
    return FeedingHabitsRecordRepoModel.deleteMany({})
}

async function createActivity(doc) {
    return FeedingHabitsRecordRepoModel.create(doc)
}
