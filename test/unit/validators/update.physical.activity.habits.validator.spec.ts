import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { assert } from 'chai'
import { PhysicalActivityHabits } from '../../../src/application/domain/model/physical.activity.habits'
import { UpdatePhysicalActivityHabitsValidator } from '../../../src/application/domain/validator/update.physical.activity.habits.validator'

describe('Validators: UpdatePhysicalActivityHabitsValidator', () => {

    const activity: PhysicalActivityHabits =
        new PhysicalActivityHabits().fromJSON(DefaultEntityMock.PHYSICAL_ACTIVITY_HABITS)
    activity.school_activity_freq = undefined

    it('should return undefined when the validation is successful', () => {
        const result = UpdatePhysicalActivityHabitsValidator.validate(activity)
        assert.isUndefined(result)
    })
    context('when there are validation errors', () => {
        it('should throw an error for does pass invalid school_activity_freq ', () => {
            try {
                activity.school_activity_freq = 'invalid'
                UpdatePhysicalActivityHabitsValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Value not mapped for school_activity_freq: invalid')
                assert.propertyVal(err, 'description', 'The mapped values are: one_per_week, two_per_week,' +
                    ' three_per_week, four_more_per_week, none.')
            }
        })
    })
})
