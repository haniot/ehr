import { assert } from 'chai'
import { DefaultEntityMock } from '../../mocks/models/default.entity.mock'
import { CreateQuestionnaireRecordValidator }
    from '../../../src/application/domain/validator/create.questionnaire.record.validator'
import { Strings } from '../../../src/utils/strings'

describe('Validators: CreateQuestionnaireRecordValidator', () => {

    const activity = DefaultEntityMock.ACTIVITY_HABITS_RECORD

    it('should return undefined when the validation is successful', () => {
        const result = CreateQuestionnaireRecordValidator.validate(activity)
        assert.isUndefined(result)
    })

    context('when there are validation errors', () => {

        it('should throw an error for does not pass patient_id', () => {
            try {
                activity.patient_id = undefined
                CreateQuestionnaireRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', 'Required fields were not provided...')
                assert.propertyVal(err, 'description', 'Activity Habits Record validation: patient_id is required!')
            }
        })

        it('should throw an error for does pass invalid patient_id', () => {
            try {
                activity.patient_id = '123'
                CreateQuestionnaireRecordValidator.validate(activity)
            } catch (err) {
                assert.propertyVal(err, 'message', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT)
                assert.propertyVal(err, 'description', Strings.ERROR_MESSAGE.UUID_NOT_VALID_FORMAT_DESC)
            }
        })
    })

})
