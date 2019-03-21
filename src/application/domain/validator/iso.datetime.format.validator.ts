import { ValidationException } from '../exception/validation.exception'
import { Strings } from '../../../utils/strings'

export class ISODateTimeFormatValidator {
    public static validate(value: string): void | ValidationException {
        if (!(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))T(0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/
            .test(value))) {
            throw new ValidationException(Strings.ERROR_MESSAGE.ISO_DATE_NOT_VALID_FORMAT,
                Strings.ERROR_MESSAGE.ISO_DATETIME_NOT_VALID_FORMAT_DESC)
        }
    }
}
