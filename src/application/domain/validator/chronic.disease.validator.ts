import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'
import { ChronicDiseaseType } from '../utils/chronic.disease.type'
import { DiseaseHistory } from '../utils/disease.history'

export class ChronicDiseaseValidator {
    public static validate(value: any): void | ValidationException {
        if (!Object.values(ChronicDiseaseType).includes(value.type)) {
            throw new ValidationException(
                'ChronicDisease: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ChronicDiseaseType).join(', ').concat('.')))
        }

        if (!Object.values(DiseaseHistory).includes(value.disease_history)) {
            throw new ValidationException(
                'DiseaseHistory: '.concat(Strings.ENUM_VALIDATOR.NOT_MAPPED),
                Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(DiseaseHistory).join(', ').concat('.')))
        }
    }
}
