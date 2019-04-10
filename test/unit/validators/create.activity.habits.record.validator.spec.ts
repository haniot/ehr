import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { CreateActivityHabitsRecordValidator }
    from '../../../src/application/domain/validator/create.activity.habits.record.validator'
import { Strings } from '../../../src/utils/strings'

describe('Validators: CreateActivityHabitsRecordValidator', () => {

    it('should return undefined when the validation is successful', () => {
        const activity = DefaultEntityMock.ACTIVITY_HABITS_RECORD
        const result = CreateActivityHabitsRecordValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        const activity = DefaultEntityMock.ACTIVITY_HABITS_RECORD

        it('should throw an error for does not pass patient_id', () => {
            try {
                activity.patient_id = undefined
                CreateActivityHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Activity Habits Record validation: patient_id is required!')
            }
        })

        it('should throw an error for does pass invalid patient_id', () => {
            try {
                activity.patient_id = '123'
                CreateActivityHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            }
        })
    })

})
