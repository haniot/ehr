import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { UpdatePhysicalActivityHabitsValidator } from '../../../src/application/domain/validator/update.physical.activity.habits.validator'

describe('Validators: UpdatePhysicalActivityHabitsValidator', () => {

    const activity: PhysicalActivityHabits =
        new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
    activity.patient_id = undefined
    activity.created_at = undefined
    activity.school_activity_freq = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdatePhysicalActivityHabitsValidator.validate(activity)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for pass invalid id', () => {
            activity.id = '123'
            try {
                UpdatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            } finally {
                activity.id = undefined
            }
        })

        it('should throw an error for does pass patient_id', () => {
            activity.patient_id = DefaultEntityMock.ACTIVITY_HABITS_RECORD.patient_id
            try {
                UpdatePhysicalActivityHabitsValidator.validate(activity)
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
                UpdatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.propertyVal(err, 'message', 'created_at: '.concat(Strings.PARAMETERS.COULD_NOT_BE_UPDATED))
            } finally {
                activity.created_at = undefined
            }
        })

        it('should throw an error for does pass invalid school_activity_freq ', () => {
            try {
                activity.school_activity_freq = 'invalid'
                UpdatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', 'Value not mapped for school_activity_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: one_per_week, two_per_week,' +
                    ' three_per_week, four_more_per_week, none.')
            }
        })
    })
})
