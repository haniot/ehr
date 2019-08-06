import { Container } from 'inversify'
import { DI } from '../../../src/di/di'
import { App } from '../../../src/app'
import { Identifier } from '../../../src/di/identifiers'
import { expect } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'

const container: Container = DI.getInstance().getContainer()
const app: App = container.get(Identifier.APP)
const request = require('supertest')(app.getExpress())

describe('Routes: QuestionnairesTypes', () => {
    describe('GET /v1/questionnaires/types', () => {
        context('when get the questionnaires types', () => {
            it('should return status code 200', () => {
                return request
                    .get('/v1/questionnaires/types')
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.deep.property('odontological',
                            DefaultEntityMock.QUESTIONNAIRES_TYPES.odontological)
                        expect(res.body).to.have.deep. property('nutritional',
                            DefaultEntityMock.QUESTIONNAIRES_TYPES.nutritional)
                    })
            })
        })
    })
})
