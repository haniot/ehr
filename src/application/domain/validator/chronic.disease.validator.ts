import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ChronicDiseaseType } from '../utils/chronic.disease.type'

export class ChronicDiseaseValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(ChronicDiseaseType).includes(value)) {
            throw new ValidationException(
                'ChronicDisease: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ChronicDiseaseType).join(', ').concat('.')))
        }
    }
}
