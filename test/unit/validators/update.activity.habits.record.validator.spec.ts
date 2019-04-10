import { ActivityHabitsRecord } from '../../../src/application/domain/model/activity.habits.record'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { UpdateActivityHabitsRecordValidator } from '../../../src/application/domain/validator/update.activity.habits.record.validator'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'

describe('Validators: UpdateActivityHabitsRecordValidator', () => {
    const activity: ActivityHabitsRecord = new ActivityHabitsRecord().fromJSON(DefaultEntityMock.ACTIVITY_HABITS_RECORD)
    activity.patient_id = undefined
    activity.created_at = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdateActivityHabitsRecordValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for does pass patient_id', () => {
            activity.patient_id = DefaultEntityMock.ACTIVITY_HABITS_RECORD.patient_id
            try {
                UpdateActivityHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'patient_id: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.patient_id = undefined
            }
        })

        it('should throw an error for does pass created_at', () => {
            activity.created_at = DefaultEntityMock.ACTIVITY_HABITS_RECORD.created_at
            try {
                UpdateActivityHabitsRecordValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            }
        })
    })
})
