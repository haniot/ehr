import {IConnectionDB} from '../../../src/infrastructure/port/connection.db.interface'
import {Identifier} from '../../../src/di/identifiers'
import {Container} from 'inversify'
import {DI} from '../../../src/di/di'
import {App} from '../../../src/app'
import {expect} from 'chai'
import {MedicalRecord} from '../../../src/application/domain/model/medical.record'
import {DefaultEntityMock} from '../../mocks/models/default.entity.mock'
import {MedicalRecordRepoModel} from '../../../src/infrastructure/database/schema/medical.record.schema'

const container: Container = DI.getInstance().getContainer()
const dbConnection: IConnectionDB = container.get(Identifier.MONGODB_CONNECTION)
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: NutritionalQuestionnaire', () => {

    const activity: MedicalRecord = new MedicalRecord().fromJSON(DefaultEntityMock.MEDICAL_RECORD)

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

    describe('GET /patients/:patient_id/nutritional/questionnaires', () => {
        context('when get all nutritional questionnaire and the X-Total-Count', () => {
            it('should return status code 200 and the X Total Count', () => {
                return request
                    .get(`/patients/${activity.patient_id}/nutritional/questionnaires`)
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
                    .get(`/patients/123/nutritional/questionnaires`)
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
        return MedicalRecordRepoModel.deleteMany({})
    }
