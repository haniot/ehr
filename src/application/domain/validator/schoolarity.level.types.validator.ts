import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { SchoolarityLevelTypes } from '../utils/schoolarity.level.types'

export class SchoolarityLevelTypesValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(SchoolarityLevelTypes).includes(value)) {
            throw new ValidationException(
                Strings.ENUM_VALIDATOR.NOT_MAPPED.concat(`mother_schoolarity: ${value}`),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(SchoolarityLevelTypes).join(', ').concat('.')))
        }
    }
}
