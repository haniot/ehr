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
    public static readonly PHYSICAL_ACTIVITY_HABITS_CONTROLLER: any = Symbol.for('PhysicalActivityHabitsController')
    public static readonly SLEEP_HABIT_CONTROLLER: any = Symbol.for('SleepHabitController')
    public static readonly FAMILY_COHESION_RECORD_CONTROLLER: any = Symbol.for('FamilyCohesionRecordController')
    public static readonly ORAL_HEALTH_RECORD_CONTROLLER: any = Symbol.for('OralHealthRecordController')
    public static readonly SOCIODEMOGRAPHIC_RECORD_CONTROLLER: any = Symbol.for('SociodemographicRecordController')
    public static readonly QUESTIONNAIRES_CONTROLLER: any = Symbol.for('QuestionnairesController')
    public static readonly NUTRITIONAL_QUESTIONNAIRE_CONTROLLER: any = Symbol.for('NutritionalQuestionnnaireController')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_CONTROLLER: any = Symbol.for('OdontologicalQuestionnaireController')
    // Services
    public static readonly FEEDING_HABITS_RECORD_SERVICE: any = Symbol.for('FeedingHabitsRecordService')
    public static readonly MEDICAL_RECORD_SERVICE: any = Symbol.for('MedicalRecordService')
    public static readonly PHYSICAL_ACTIVITY_HABITS_SERVICE: any = Symbol.for('PhysicalActivityHabitsService')
    public static readonly SLEEP_HABIT_SERVICE: any = Symbol.for('SleepHabitService')
    public static readonly FAMILY_COHESION_RECORD_SERVICE: any = Symbol.for('FamilyCohesionRecordService')
    public static readonly ORAL_HEALTH_RECORD_SERVICE: any = Symbol.for('OralHealthRecordService')
    public static readonly SOCIODEMOGRAPHIC_RECORD_SERVICE: any = Symbol.for('SociodemographicRecordService')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_SERVICE: any = Symbol.for('OdontologicalQuestionnaireService')
    public static readonly NUTRITIONAL_QUESTIONNAIRE_SERVICE: any = Symbol.for('NutritionalQuestionnaireService')
    // Repositories
    public static readonly FEEDING_HABITS_RECORD_REPOSITORY: any = Symbol.for('FeedingHabitsRecordRepository')
    public static readonly MEDICAL_RECORD_REPOSITORY: any = Symbol.for('MedicalRecordRepository')
    public static readonly PHYSICAL_ACTIVITY_HABITS_REPOSITORY: any = Symbol.for('PhysicalActivityHabitsRepository')
    public static readonly SLEEP_HABIT_REPOSITORY: any = Symbol.for('SleepHabitRepository')
    public static readonly FAMILY_COHESION_RECORD_REPOSITORY: any = Symbol.for('FamilyCohesionRecordRepository')
    public static readonly ORAL_HEALTH_RECORD_REPOSITORY: any = Symbol.for('OralHealthRecordRepository')
    public static readonly SOCIODEMOGRAPHIC_RECORD_REPOSITORY: any = Symbol.for('SociodemographicRecordRepository')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_REPOSITORY: any = Symbol.for('OdontologicalQuestionnaireRepository')
    public static readonly NUTRITIONAL_QUESTIONNAIRE_REPOSITORY: any = Symbol.for('NutritionalQuestionnaireRepository')
    // Models
    public static readonly FAMILY_COHESION_RECORD_REPO_MODEL: any = Symbol.for('FamilyCohesionRecordRepoModel')
    public static readonly FEEDING_HABITS_RECORD_REPO_MODEL: any = Symbol.for('FeedingHabitsRecordRepoModel')
    public static readonly MEDICAL_RECORD_REPO_MODEL: any = Symbol.for('MedicalRecordRepoModel')
    public static readonly ORAL_HEALTH_RECORD_REPO_MODEL: any = Symbol.for('OralHealthRecordRepoModel')
    public static readonly PHYSICAL_ACTIVITY_HABITS_REPO_MODEL: any = Symbol.for('PhysicalActivityHabitsRepoModel')
    public static readonly SLEEP_HABIT_REPO_MODEL: any = Symbol.for('SleepHabitRepoModel')
    public static readonly SOCIODEMOGRAPHIC_RECORD_REPO_MODEL: any = Symbol.for('SociodemographicRecordRepoModel')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_REPO_MODEL: any = Symbol.for('OdontologicalQuestionnaireRepoModel')
    public static readonly NUTRITIONAL_QUESTIONNAIRE_REPO_MODEL: any = Symbol.for('NutritionalQuestionnaireRepoModel')
    // Mappers
    public static readonly FEEDING_HABITS_RECORD_ENTITY_MAPPER: any = Symbol.for('FeedingHabitsRecordEntityMapper')
    public static readonly MEDICAL_RECORD_ENTITY_MAPPER: any = Symbol.for('MedicalRecordEntityMapper')
    public static readonly PHYSICAL_ACTIVITY_HABITS_ENTITY_MAPPER: any = Symbol.for('PhysicalActivityHabitsEntityMapper')
    public static readonly SLEEP_HABIT_ENTITY_MAPPER: any = Symbol.for('SleepHabitEntityMapper')
    public static readonly FAMILY_COHESION_RECORD_ENTITY_MAPPER: any = Symbol.for('FamilyCohesionRecordEntityMapper')
    public static readonly ORAL_HEALTH_RECORD_ENTITY_MAPPER: any = Symbol.for('OralHealthRecordEntityMapper')
    public static readonly SOCIODEMOGRAPHIC_RECORD_ENTITY_MAPPER: any = Symbol.for('SociodemographicRecordEntityMapper')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_ENTITY_MAPPER: any = Symbol.for('OdontologicalQuestionnaireEntityMapper')
    public static readonly NUTRITIONAL_QUESTIONNAIRE_ENTITY_MAPPER: any = Symbol.for('NutritionalQuestionnaireEntityMapper')
    // Background Services
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryMongodb')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('ConnectionMongodb')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Tasks

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
