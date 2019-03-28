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
        TITLE: 'Account Service',
        APP_DESCRIPTION: 'Micro-service for Account.'
    }

    public static readonly PARAMETERS: any = {
        COULD_NOT_BE_UPDATED: 'This parameter could not be updated!'
    }

    public static readonly ERROR_MESSAGE: any = {
        UNEXPECTED: 'An unexpected error has occurred. Please try again later...',
        UUID_NOT_VALID_FORMAT: 'Some ID provided does not have a valid format!',
        UUID_NOT_VALID_FORMAT_DESC: 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is expected.',
        ISO_DATE_NOT_VALID_FORMAT: 'Some date provided does not have a valid format!',
        ISO_DATE_NOT_VALID_FORMAT_DESC: 'The format expect for date is: yyyy-MM-dd.',
        ISO_DATETIME_NOT_VALID_FORMAT_DESC: 'The format expect for date is: yyyy-MM-ddThh:mm:ss.'
    }

    public static readonly ENUM_VALIDATOR: any = {
        NOT_MAPPED: 'Value not mapped!',
        NOT_MAPPED_DESC: 'The mapped values are: '
    }

    public static readonly FEEDING_HABITS_RECORD: any = {
        NOT_FOUND: 'Feeding habits record not found!',
        NOT_FOUND_DESCRIPTION: 'Feeding habits record not found or already removed.' +
            ' A new operation for the same resource is not required.'
    }

    public static readonly MEDICAL_RECORD: any = {
        NOT_FOUND: 'Medical record not found!',
        NOT_FOUND_DESCRIPTION: 'Medical record not found or already removed.' +
            ' A new operation for the same resource is not required.'
    }

    public static readonly PATIENT: any = {
        NOT_FOUND: 'Patient not found!',
        NOT_FOUND_DESCRIPTION: 'Patient not found or already removed.' +
            ' A new operation for the same resource is not required.'
    }
    public static readonly PHYSICAL_ACTIVITY_HABITS: any = {
        NOT_FOUND: 'Physical activity habits not founded!',
        NOT_FOUND_DESCRIPTION: 'Physical activity habits not founded or already removed.' +
            ' A new operation for the same resource is not required.'
    }
    public static readonly SLEEP_HABIT: any = {
        NOT_FOUND: 'Sleep habit not found!',
        NOT_FOUND_DESCRIPTION: 'Sleep habit not found or already removed.' +
            ' A new operation for the same resource is not required.'
    }
}
