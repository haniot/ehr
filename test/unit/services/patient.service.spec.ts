import { Patient } from '../../../src/application/domain/model/patient'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { IPatientService } from '../../../src/application/port/patient.service.interface'
import { PatientService } from '../../../src/application/service/patient.service'
import { PatientRepositoryMock } from '../../mocks/repositories/patient.repository.mock'
import { assert } from 'chai'
import { Query } from '../../../src/infrastructure/repository/query/query'

describe('Services: PatientService', () => {
    const patient: Patient = new Patient().fromJSON(DefaultEntityMock.PATIENT)
    patient.id = DefaultEntityMock.PATIENT.id
    const service: IPatientService = new PatientService(new PatientRepositoryMock())

    describe('add()', () => {
        context('when save a new patient', () => {
            it('should return a saved patient', () => {
                return service
                    .add(patient)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', patient.id)
                        assert.property(result, 'pilotstudy_id')
                        assert.propertyVal(result, 'pilotstudy_id', patient.pilotstudy_id)
                        assert.property(result, 'first_name')
                        assert.propertyVal(result, 'first_name', patient.first_name)
                        assert.property(result, 'last_name')
                        assert.propertyVal(result, 'last_name', patient.last_name)
                        assert.property(result, 'gender')
                        assert.propertyVal(result, 'gender', patient.gender)
                        assert.property(result, 'birth_date')
                        assert.propertyVal(result, 'birth_date', patient.birth_date)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service.add(new Patient())
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Required fields were not provided...')
                        assert.propertyVal(err, 'description', 'Patient validation: pilotstudy_id, first_name, last_name, ' +
                            'gender, birth_date is required!')
                    })
            })
        })
    })

    describe('getAll()', () => {
        context('when get all patients', () => {
            it('should return a lsit of patients', () => {
                const query: Query = new Query()
                query.addFilter({ pilotstudy_id: patient.pilotstudy_id })

                return service
                    .getAll(query)
                    .then(result => {
                        assert.isArray(result)
                        assert.lengthOf(result, 1)
                        assert.property(result[0], 'id')
                        assert.propertyVal(result[0], 'id', patient.id)
                        assert.property(result[0], 'pilotstudy_id')
                        assert.propertyVal(result[0], 'pilotstudy_id', patient.pilotstudy_id)
                        assert.property(result[0], 'first_name')
                        assert.propertyVal(result[0], 'first_name', patient.first_name)
                        assert.property(result[0], 'last_name')
                        assert.propertyVal(result[0], 'last_name', patient.last_name)
                        assert.property(result[0], 'gender')
                        assert.propertyVal(result[0], 'gender', patient.gender)
                        assert.property(result[0], 'birth_date')
                        assert.propertyVal(result[0], 'birth_date', patient.birth_date)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .getAll(new Query().fromJSON({ pilotstudy_id: '123' }))
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('getById()', () => {
        context('when get a unique patient', () => {
            it('should return a patient', () => {
                const query: Query = new Query()
                query.addFilter({ pilotstudy_id: patient.pilotstudy_id })

                return service
                    .getById(patient.id!, query)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', patient.id)
                        assert.property(result, 'pilotstudy_id')
                        assert.propertyVal(result, 'pilotstudy_id', patient.pilotstudy_id)
                        assert.property(result, 'first_name')
                        assert.propertyVal(result, 'first_name', patient.first_name)
                        assert.property(result, 'last_name')
                        assert.propertyVal(result, 'last_name', patient.last_name)
                        assert.property(result, 'gender')
                        assert.propertyVal(result, 'gender', patient.gender)
                        assert.property(result, 'birth_date')
                        assert.propertyVal(result, 'birth_date', patient.birth_date)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .getById('123', new Query())
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('removePatient()', () => {
        context('when delete a patient', () => {
            it('should return true', () => {
                return service
                    .removePatient(patient.pilotstudy_id!, patient.id!)
                    .then(result => {
                        assert.isBoolean(result)
                        assert.isTrue(result)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                return service
                    .removePatient('123', '321')
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('update()', () => {
        context('when update a patient', () => {
            it('should return the updated patient', () => {
                return service
                    .update(patient)
                    .then(result => {
                        assert.property(result, 'id')
                        assert.propertyVal(result, 'id', patient.id)
                        assert.property(result, 'first_name')
                        assert.propertyVal(result, 'first_name', patient.first_name)
                        assert.property(result, 'last_name')
                        assert.propertyVal(result, 'last_name', patient.last_name)
                        assert.property(result, 'gender')
                        assert.propertyVal(result, 'gender', patient.gender)
                        assert.property(result, 'birth_date')
                        assert.propertyVal(result, 'birth_date', patient.birth_date)
                    })
            })
        })

        context('when there are validation errors', () => {
            it('should reject a validation error', () => {
                patient.id = '123'
                patient.pilotstudy_id = '123'
                return service
                    .update(patient)
                    .catch(err => {
                        assert.property(err, 'message')
                        assert.property(err, 'description')
                        assert.propertyVal(err, 'message', 'Some ID provided does not have a valid format!')
                        assert.propertyVal(err, 'description', 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea' +
                            ' is expected.')
                    })
            })
        })
    })

    describe('remove()', () => {
        it('should throw an error for does not implemented', () => {
            return service
                .remove(patient.id!)
                .catch(err => {
                    assert.property(err, 'message')
                    assert.propertyVal(err, 'message', 'Not implemented yet.')
                })
        })
    })
})
