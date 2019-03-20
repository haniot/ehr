/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers

    // Services

    // Repositories

    // Models
    public static readonly ACTIVITY_HABITS_REPO_MODEL: any = Symbol.for('ActivityHabitsRepoModel')
    public static readonly PATIENT_REPO_MODEL: any = Symbol.for('PatientRepoModel')

    // Mappers
    public static readonly ACTIVITY_HABITS_RECORD_ENTITY_MAPPER: any = Symbol.for('ActivityHabitsRecordEntityMapper')
    public static readonly FEEDING_HABITS_RECORD_ENTITY_MAPPER: any = Symbol.for('FeedingHabitsRecordEntityMapper')
    public static readonly MEDICAL_RECORD_ENTITY_MAPPER: any = Symbol.for('MedicalRecordEntityMapper')
    public static readonly PATIENT_ENTITY_MAPPER: any = Symbol.for('PatientEntityMapper')
    public static readonly PHYSICAL_ACTIVITY_HABITS_ENTITY_MAPPER: any = Symbol.for('PhysicalActivityHabitsEntityMapper')
    public static readonly SLEEP_HABIT_ENTITY_MAPPER: any = Symbol.for('SleepHabitEntityMapper')

    // Background Services
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryMongodb')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('ConnectionMongodb')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Tasks

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
