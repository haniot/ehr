import { ValidationException } from '../exception/validation.exception'

export class DatetimeValidator {
    public static validate(value: string): void | ValidationException {
        if (!(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))T(0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/
            .test(value))) {
            throw new ValidationException(`Datetime: ${value} is not in valid ISO 8601 format.`,
                'Date must be in the format: yyyy-MM-dd\'T\'HH:mm:ssZ')
        }
    }
}
