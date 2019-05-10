import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {FamilyCohesionRecord} from '../../../src/application/domain/model/family.cohesion.record'
import {expect} from 'chai'
import {Container} from 'inversify'
import {DI} from '../../../src/di/di'
import {IConnectionDB} from '../../../src/infrastructure/port/connection.db.interface'
import {Identifier} from '../../../src/di/identifiers'
import {App} from '../../../src/app'
import {ObjectID} from 'bson'
import {FamilyCohesionRecordRepoModel} from '../../../src/infrastructure/database/schema/family.cohesion.record.schema'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: FamilyCohesionRecord', () => {
    const activity: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(DefaultEntityMock.FAMILY_COHESION_RECORD)

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

    describe('POST /patients/:patient_id/familycohesionrecords', () => {
        context('when save a new family cohesion record', () => {
            it('should return status code 200 and the saved family cohesion record', () => {
                return request
                    .post(`/patients/${activity.patient_id}/familycohesionrecords`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(201)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('created_at')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('family_mutual_aid_freq')
                        expect(res.body.family_mutual_aid_freq).to.eql(activity.family_mutual_aid_freq)
                        expect(res.body).to.have.property('friendship_approval_freq')
                        expect(res.body.friendship_approval_freq).to.eql(activity.friendship_approval_freq)
                        expect(res.body).to.have.property('family_only_task_freq')
                        expect(res.body.family_only_task_freq).to.eql(activity.family_only_task_freq)
                        expect(res.body).to.have.property('family_only_preference_freq')
                        expect(res.body.family_only_preference_freq).to.eql(activity.family_only_preference_freq)
                        expect(res.body).to.have.property('free_time_together_freq')
                        expect(res.body.free_time_together_freq).to.eql(activity.free_time_together_freq)
                        expect(res.body).to.have.property('family_proximity_perception_freq')
                        expect(res.body.family_proximity_perception_freq).to.eql(activity.family_proximity_perception_freq)
                        expect(res.body).to.have.property('all_family_tasks_freq')
                        expect(res.body.all_family_tasks_freq).to.eql(activity.all_family_tasks_freq)
                        expect(res.body).to.have.property('family_tasks_opportunity_freq')
                        expect(res.body.family_tasks_opportunity_freq).to.eql(activity.family_tasks_opportunity_freq)
                        expect(res.body).to.have.property('family_decision_support_freq')
                        expect(res.body.family_decision_support_freq).to.eql(activity.family_decision_support_freq)
                        expect(res.body).to.have.property('family_union_relevance_freq')
                        expect(res.body.family_union_relevance_freq).to.eql(activity.family_union_relevance_freq)
                        expect(res.body).to.have.property('family_cohesion_result')
                        expect(res.body.family_cohesion_result).to.eql(activity.family_cohesion_result)
                        activity.id = res.body.id
                    })
            })
        })

        context('when there are validation errors', () => {
            const body = Object.assign(activity.toJSON(), {})

            it('should return status code 400 and message for invalid patient_id', () => {
                return request
                    .post('/patients/123/familycohesionrecords/')
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

    describe('GET /patients/:patient_id/familycohesionrecords/:familycohesionrecord_id', () => {
        context('when get a unique feeding habits record', () => {
            it('should return status code 200 and a family record cohesion', () => {
                return request
                    .get(`/patients/${activity.patient_id}/familycohesionrecords/${activity.id}`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('created_at')
                        expect(res.body.created_at).to.eql(activity.created_at)
                        expect(res.body).to.have.property('family_mutual_aid_freq')
                        expect(res.body.family_mutual_aid_freq).to.eql(activity.family_mutual_aid_freq)
                        expect(res.body).to.have.property('friendship_approval_freq')
                        expect(res.body.friendship_approval_freq).to.eql(activity.friendship_approval_freq)
                        expect(res.body).to.have.property('family_only_task_freq')
                        expect(res.body.family_only_task_freq).to.eql(activity.family_only_task_freq)
                        expect(res.body).to.have.property('family_only_preference_freq')
                        expect(res.body.family_only_preference_freq).to.eql(activity.family_only_preference_freq)
                        expect(res.body).to.have.property('free_time_together_freq')
                        expect(res.body.free_time_together_freq).to.eql(activity.free_time_together_freq)
                        expect(res.body).to.have.property('family_proximity_perception_freq')
                        expect(res.body.family_proximity_perception_freq).to.eql(activity.family_proximity_perception_freq)
                        expect(res.body).to.have.property('all_family_tasks_freq')
                        expect(res.body.all_family_tasks_freq).to.eql(activity.all_family_tasks_freq)
                        expect(res.body).to.have.property('family_tasks_opportunity_freq')
                        expect(res.body.family_tasks_opportunity_freq).to.eql(activity.family_tasks_opportunity_freq)
                        expect(res.body).to.have.property('family_decision_support_freq')
                        expect(res.body.family_decision_support_freq).to.eql(activity.family_decision_support_freq)
                        expect(res.body).to.have.property('family_union_relevance_freq')
                        expect(res.body.family_union_relevance_freq).to.eql(activity.family_union_relevance_freq)
                        expect(res.body).to.have.property('family_cohesion_result')
                        expect(res.body.family_cohesion_result).to.eql(activity.family_cohesion_result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get(`/patients/123/familycohesionrecords/${activity.id}`)
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
                    .get(`/patients/${activity.patient_id}/familycohesionrecords/123`)
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

        context('when the family cohesion record is not founded', () => {
            it('should return status code 404 and message from family cohesion record not found', () => {
                return request
                    .get(`/patients/${new ObjectID()}/familycohesionrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Family cohesion record it not found!')
                        expect(res.body.description).to.eql('Family cohesion record not found or already removed. A new ' +
                            'operation for the same resource is required.')
                    })
            })
        })
    })
    describe('PATCH` /patients/:patient_id/familycohesionrecords/:familycohesionrecord_id', () => {
        context('when update a family cohesion record', () => {
            it('should return status code 200 and a updated family cohesion record', () => {
                activity.patient_id = undefined
                activity.created_at = undefined
                return request
                    .patch(
                        `/patients/${DefaultEntityMock.FAMILY_COHESION_RECORD.patient_id}/familycohesionrecords/${activity.id}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.property('id')
                        expect(res.body).to.have.property('family_mutual_aid_freq')
                        expect(res.body.family_mutual_aid_freq).to.eql(activity.family_mutual_aid_freq)
                        expect(res.body).to.have.property('friendship_approval_freq')
                        expect(res.body.friendship_approval_freq).to.eql(activity.friendship_approval_freq)
                        expect(res.body).to.have.property('family_only_task_freq')
                        expect(res.body.family_only_task_freq).to.eql(activity.family_only_task_freq)
                        expect(res.body).to.have.property('family_only_preference_freq')
                        expect(res.body.family_only_preference_freq).to.eql(activity.family_only_preference_freq)
                        expect(res.body).to.have.property('free_time_together_freq')
                        expect(res.body.free_time_together_freq).to.eql(activity.free_time_together_freq)
                        expect(res.body).to.have.property('family_proximity_perception_freq')
                        expect(res.body.family_proximity_perception_freq).to.eql(activity.family_proximity_perception_freq)
                        expect(res.body).to.have.property('all_family_tasks_freq')
                        expect(res.body.all_family_tasks_freq).to.eql(activity.all_family_tasks_freq)
                        expect(res.body).to.have.property('family_tasks_opportunity_freq')
                        expect(res.body.family_tasks_opportunity_freq).to.eql(activity.family_tasks_opportunity_freq)
                        expect(res.body).to.have.property('family_decision_support_freq')
                        expect(res.body.family_decision_support_freq).to.eql(activity.family_decision_support_freq)
                        expect(res.body).to.have.property('family_union_relevance_freq')
                        expect(res.body.family_union_relevance_freq).to.eql(activity.family_union_relevance_freq)
                        expect(res.body).to.have.property('family_cohesion_result')
                        expect(res.body.family_cohesion_result).to.eql(activity.family_cohesion_result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .patch(`/patients/123/familycohesionrecords/${activity.id}`)
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
                    .patch(`/patients/${activity.patient_id}/familycohesionrecords/123`)
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

        context('when the family cohesion record is not founded', () => {
            it('should return status code 404 and message from family cohesion record not found', () => {
                return request
                    .patch(`/patients/${new ObjectID()}/familycohesionrecords/${new ObjectID()}`)
                    .send(activity.toJSON())
                    .set('Content-Type', 'application/json')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.have.property('message')
                        expect(res.body).to.have.property('description')
                        expect(res.body.message).to.eql('Family cohesion record it not found!')
                        expect(res.body.description).to.eql('Family cohesion record not found or already removed. A new ' +
                            'operation for the same resource is required.')
                        activity.patient_id = DefaultEntityMock.FAMILY_COHESION_RECORD.patient_id
                        activity.created_at = DefaultEntityMock.FAMILY_COHESION_RECORD.created_at
                    })
            })
        })
    })

    describe('DELETE` /patients/:patient_id/familycohesionrecords/:familycohesionrecord_id', () => {
        context('when delete a family cohesion record', () => {
            it('should return status code 204 and no content', async () => {
                const result = await createActivity(DefaultEntityMock.FAMILY_COHESION_RECORD)
                return request
                    .delete(`/patients/${activity.patient_id}/familycohesionrecords/${result.id}`)
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
                    .delete(`/patients/123/familycohesionrecords/${activity.id}`)
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
                    .delete(`/patients/${activity.patient_id}/familycohesionrecords/123`)
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

        context('when the family cohesion record is not founded', () => {
            it('should return status code 204 and no content', async () => {
                return request
                    .delete(`/patients/${new ObjectID()}/familycohesionrecords/${new ObjectID()}`)
                    .set('Content-Type', 'application/json')
                    .expect(204)
                    .then(res => {
                        expect(res.body).to.eql({})
                    })
            })
        })
    })
    describe('GET` /patients/:patient_id/familycohesionrecords/', () => {
        context('when get all family cohesion records', () => {
            it('should return status code 200 and a list of family cohesion record', () => {
                return request
                    .get(`/patients/${activity.patient_id}/familycohesionrecords`)
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an.instanceof(Array)
                        expect(res.body).to.have.lengthOf(1)
                        expect(res.body[0]).to.have.property('id')
                        expect(res.body[0].created_at).to.eql(activity.created_at)
                        expect(res.body[0]).to.have.property('created_at')
                        expect(res.body[0].created_at).to.eql(activity.created_at)
                        expect(res.body[0]).to.have.property('family_mutual_aid_freq')
                        expect(res.body[0].family_mutual_aid_freq).to.eql(activity.family_mutual_aid_freq)
                        expect(res.body[0]).to.have.property('friendship_approval_freq')
                        expect(res.body[0].friendship_approval_freq).to.eql(activity.friendship_approval_freq)
                        expect(res.body[0]).to.have.property('family_only_task_freq')
                        expect(res.body[0].family_only_task_freq).to.eql(activity.family_only_task_freq)
                        expect(res.body[0]).to.have.property('family_only_preference_freq')
                        expect(res.body[0].family_only_preference_freq).to.eql(activity.family_only_preference_freq)
                        expect(res.body[0]).to.have.property('free_time_together_freq')
                        expect(res.body[0].free_time_together_freq).to.eql(activity.free_time_together_freq)
                        expect(res.body[0]).to.have.property('family_proximity_perception_freq')
                        expect(res.body[0].family_proximity_perception_freq).to.eql(activity.family_proximity_perception_freq)
                        expect(res.body[0]).to.have.property('all_family_tasks_freq')
                        expect(res.body[0].all_family_tasks_freq).to.eql(activity.all_family_tasks_freq)
                        expect(res.body[0]).to.have.property('family_tasks_opportunity_freq')
                        expect(res.body[0].family_tasks_opportunity_freq).to.eql(activity.family_tasks_opportunity_freq)
                        expect(res.body[0]).to.have.property('family_decision_support_freq')
                        expect(res.body[0].family_decision_support_freq).to.eql(activity.family_decision_support_freq)
                        expect(res.body[0]).to.have.property('family_union_relevance_freq')
                        expect(res.body[0].family_union_relevance_freq).to.eql(activity.family_union_relevance_freq)
                        expect(res.body[0]).to.have.property('family_cohesion_result')
                        expect(res.body[0].family_cohesion_result).to.eql(activity.family_cohesion_result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should return status code 400 and message from invalid patient_id', () => {
                return request
                    .get('/patients/123/familycohesionrecords/')
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

        context('when the family cohesion record is not founded', () => {
            it('should return status code 200 and a empty list', async () => {
                await deleteAllActivities({}).then()
                return request
                    .get(`/patients/${activity.patient_id}/familycohesionrecords/`)
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
    return FamilyCohesionRecordRepoModel.deleteMany({})
}
async function createActivity(doc) {
    return FamilyCohesionRecordRepoModel.create(doc)
}
