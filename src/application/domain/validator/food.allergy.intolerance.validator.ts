import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { FoodAllergyIntolerance } from '../utils/food.allergy.intolerance'

export class FoodAllergyIntoleranceValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(FoodAllergyIntolerance).includes(value)) {
            throw new ValidationException(
                'FoodAllergyIntolerance'.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ValidationException).join(', ').concat('.')))
        }
    }
}
