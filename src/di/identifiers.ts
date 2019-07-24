/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')
    public static readonly NUTRITIONAL_QUESTIONNAIRE_CONTROLLER: any = Symbol.for('NutritionalQuestionnnaireController')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_CONTROLLER: any = Symbol.for('OdontologicalQuestionnaireController')
    public static readonly QUESTIONNAIRES_TYPES_CONTROLLER: any = Symbol.for('QuestionnairesTypesController')
    // Services
    public static readonly NUTRITIONAL_QUESTIONNAIRE_SERVICE: any = Symbol.for('NutritionalQuestionnaireService')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_SERVICE: any = Symbol.for('OdontologicalQuestionnaireService')
    // Repositories
    public static readonly NUTRITIONAL_QUESTIONNAIRE_REPOSITORY: any = Symbol.for('NutritionalQuestionnaireRepository')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_REPOSITORY: any = Symbol.for('OdontologicalQuestionnaireRepository')
    // Models
    public static readonly NUTRITIONAL_QUESTIONNAIRE_REPO_MODEL: any = Symbol.for('NutritionalQuestionnaireRepoModel')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_REPO_MODEL: any = Symbol.for('OdontologicalQuestionnaireRepoModel')
    // Mappers
    public static readonly NUTRITIONAL_QUESTIONNAIRE_ENTITY_MAPPER: any = Symbol.for('NutritionalQuestionnaireEntityMapper')
    public static readonly ODONTOLOGICAL_QUESTIONNAIRE_ENTITY_MAPPER: any = Symbol.for('OdontologicalQuestionnaireEntityMapper')
    // Background Services
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryMongodb')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('ConnectionMongodb')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Tasks

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
