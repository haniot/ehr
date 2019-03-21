/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')
    public static readonly FEEDING_HABITS_RECORD_CONTROLLER: any = Symbol.for('FeedingHabitsRecordController')
    public static readonly MEDICAL_RECORD_CONTROLLER: any = Symbol.for('MedicalRecordController')
    public static readonly PATIENT_CONTROLLER: any = Symbol.for('PatientController')
    public static readonly PHYSICAL_ACTIVITY_HABITS_CONTROLLER: any = Symbol.for('PhysicalActivityHabitsController')
    public static readonly SLEEP_HABIT_CONTROLLER: any = Symbol.for('SleepHabitController')

    // Services
    public static readonly FEEDING_HABITS_RECORD_SERVICE: any = Symbol.for('FeedingHabitsRecordService')
    public static readonly MEDICAL_RECORD_SERVICE: any = Symbol.for('MedicalRecordService')
    public static readonly PATIENT_SERVICE: any = Symbol.for('PatientService')
    public static readonly PHYSICAL_ACTIVITY_HABITS_SERVICE: any = Symbol.for('PhysicalActivityHabitsService')
    public static readonly SLEEP_HABIT_SERVICE: any = Symbol.for('SleepHabitService')

    // Repositories
    public static readonly FEEDING_HABITS_RECORD_REPOSITORY: any = Symbol.for('FeedingHabitsRecordRepository')
    public static readonly MEDICAL_RECORD_REPOSITORY: any = Symbol.for('MedicalRecordRepository')
    public static readonly PATIENT_REPOSITORY: any = Symbol.for('PatientRepository')
    public static readonly PHYSICAL_ACTIVITY_HABITS_REPOSITORY: any = Symbol.for('PhysicalActivityHabitsRepository')
    public static readonly SLEEP_HABIT_REPOSITORY: any = Symbol.for('SleepHabitRepository')

    // Models
    public static readonly ACTIVITY_HABITS_REPO_MODEL: any = Symbol.for('ActivityHabitsRepoModel')
    public static readonly PATIENT_REPO_MODEL: any = Symbol.for('PatientRepoModel')

    // Mappers
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
