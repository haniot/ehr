/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
export abstract class Strings {
    public static readonly APP: any = {
        TITLE: 'EHR Service',
        APP_DESCRIPTION: 'Micro-service for EHR.'
    }

    public static readonly PARAMETERS: any = {
        COULD_NOT_BE_UPDATED: 'This parameter could not be updated!'
    }

    public static readonly ERROR_MESSAGE: any = {
        UNEXPECTED: 'An unexpected error has occurred. Please try again later...',
        UUID_NOT_VALID_FORMAT: 'Some ID provided does not have a valid format!',
        UUID_NOT_VALID_FORMAT_DESC: 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is expected.',
        DATE_NOT_VALID_FORMAT_DESC: 'Date must be in the format: yyyy-MM-dd',
        DATETIME_NOT_VALID_FORMAT_DESC: 'Date must be in the format: yyyy-MM-dd\'T\'HH:mm:ssZ'
    }

    public static readonly ENUM_VALIDATOR: any = {
        NOT_MAPPED: 'Value not mapped for ',
        NOT_MAPPED_DESC: 'The mapped values are: '
    }

    public static readonly ODONTOLOGICAL_QUESTIONNAIRE: any = {
        NOT_FOUND: 'Odontological questionnaire not found!',
        NOT_FOUND_DESCRIPTION: 'Odontological questionnaire not found or already removed.' +
            ' A new operation for the same questionnaire is required.'
    }
    public static readonly NUTRITIONAL_QUESTIONNAIRE: any = {
        NOT_FOUND: 'Nutritional questionnaire not found!',
        NOT_FOUND_DESCRIPTION: 'Nutritional questionnaire not found or already removed.' +
            ' A new operation for the same questionnaire is required.'
    }
}
