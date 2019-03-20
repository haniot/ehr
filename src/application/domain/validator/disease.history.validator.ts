import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { DiseaseHistory } from '../utils/disease.history'

export class DiseaseHistoryValidator {
    public static validate(value: string): void | ValidationException {
        if (!Object.values(DiseaseHistory).includes(value)) {
            throw new ValidationException(
                'DiseaseHistory: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(DiseaseHistory).join(', ').concat('.')))
        }
    }
}
