import { BreastFeedingTypesValidator } from '../../../src/application/domain/validator/breast.feeding.types.validator'
import { BreastFeedingTypes } from '../../../src/application/domain/utils/breast.feeding.types'
import { assert } from 'chai'
import { Strings } from '../../../src/utils/strings'

describe('Validators: BreastFeedingTypesValidator', () => {
    it('should return undefined when the validation is successful', () => {
        const result = BreastFeedingTypesValidator.validate(BreastFeedingTypes.COMPLEMENTARY)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for invalid value', () => {
            try {
                BreastFeedingTypesValidator.validate('anything')
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ENUM_VALIDATOR.NOT_MAPPED.concat('six_month_breast_feeding: anything'))
                assert.propertyVal(err, 'description', Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(BreastFeedingTypes).join(', ').concat('.')))
            }
        })
    })
})
