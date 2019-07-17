import 'reflect-metadata'
import { Container } from 'inversify'
import { Identifier } from './identifiers'
import { ConnectionFactoryMongodb } from '../infrastructure/database/connection.factory.mongodb'
import { ConnectionMongodb } from '../infrastructure/database/connection.mongodb'
import { IConnectionDB } from '../infrastructure/port/connection.db.interface'
import { IConnectionFactory } from '../infrastructure/port/connection.factory.interface'
import { BackgroundService } from '../background/background.service'
import { App } from '../app'
import { CustomLogger, ILogger } from '../utils/custom.logger'
import { IEntityMapper } from '../infrastructure/port/entity.mapper.interface'

import { NutritionalQuestionnaireController } from '../ui/controllers/nutritional.questionnaire.controller'
import { IOdontologicalQuestionnaireService } from '../application/port/odontological.questionnaire.service.interface'
import { OdontologicalQuestionnaireService } from '../application/service/odontological.questionnaire.service'
import { IOdontologicalQuestionnaireRepository } from '../application/port/odontological.questionnaire.repository.interface'
import { OdontologicalQuestionnaireRepository } from '../infrastructure/repository/odontological.questionnaire.repository'
import { OdontologicalQuestionnaireRepoModel } from '../infrastructure/database/schema/odontological.questionnaire.schema'
import { OdontologicalQuestionnaire } from '../application/domain/model/odontological.questionnaire'
import { OdontologicalQuestionnaireEntity } from '../infrastructure/entity/odontological.questionnaire.entity'
import { OdontologicalQuestionnaireEntityMapper } from '../infrastructure/entity/mapper/odontological.questionnaire.entity.mapper'
import { OdontologicalQuestionnaireController } from '../ui/controllers/odontological.questionnaire.controller'
import { INutritionalQuestionnaireService } from '../application/port/nutritional.questionnaire.service'
import { NutritionalQuestionnaireService } from '../application/service/nutritional.questionnaire.service'
import { INutritionalQuestionnaireRepository } from '../application/port/nutritional.questionnaire.repository'
import { NutritionalQuestionnaireRepository } from '../infrastructure/repository/nutritional.questionnaire.repository'
import { NutritionalQuestionnaireEntity } from '../infrastructure/entity/nutritional.questionnaire.entity'
import { NutritionalQuestionnaire } from '../application/domain/model/nutritional.questionnaire'
import { NutritionalQuestionnaireEntityMapper } from '../infrastructure/entity/mapper/nutritional.questionnaire.entity.mapper'
import { NutritionalQuestionnaireRepoModel } from '../infrastructure/database/schema/nutritional.questionnaire.schema'

export class DI {
    private static instance: DI
    private readonly container: Container

    /**
     * Creates an instance of DI.
     *
     * @private
     */
    private constructor() {
        this.container = new Container()
        this.initDependencies()
    }

    /**
     * Recover single instance of class.
     *
     * @static
     * @return {App}
     */
    public static getInstance(): DI {
        if (!this.instance) this.instance = new DI()
        return this.instance
    }

    /**
     * Get Container inversify.
     *
     * @returns {Container}
     */
    public getContainer(): Container {
        return this.container
    }

    /**
     * Initializes injectable containers.
     *
     * @private
     * @return void
     */
    private initDependencies(): void {
        this.container.bind(Identifier.APP).to(App).inSingletonScope()

        // Controllers
        this.container.bind<NutritionalQuestionnaireController>(Identifier.NUTRITIONAL_QUESTIONNAIRE_CONTROLLER)
            .to(NutritionalQuestionnaireController).inSingletonScope()
        this.container.bind<OdontologicalQuestionnaireController>(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_CONTROLLER)
            .to(OdontologicalQuestionnaireController).inSingletonScope()

        // Services
        this.container.bind<INutritionalQuestionnaireService>(Identifier.NUTRITIONAL_QUESTIONNAIRE_SERVICE)
            .to(NutritionalQuestionnaireService).inSingletonScope()
        this.container.bind<IOdontologicalQuestionnaireService>(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_SERVICE)
            .to(OdontologicalQuestionnaireService).inSingletonScope()

        // Repositories
        this.container.bind<INutritionalQuestionnaireRepository>(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPOSITORY)
            .to(NutritionalQuestionnaireRepository).inSingletonScope()
        this.container.bind<IOdontologicalQuestionnaireRepository>(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPOSITORY)
            .to(OdontologicalQuestionnaireRepository).inSingletonScope()

        // Models
        this.container.bind(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPO_MODEL)
            .toConstantValue(NutritionalQuestionnaireRepoModel)
        this.container.bind(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPO_MODEL)
            .toConstantValue(OdontologicalQuestionnaireRepoModel)

        // Mappers
        this.container
            .bind<IEntityMapper<NutritionalQuestionnaire, NutritionalQuestionnaireEntity>>
            (Identifier.NUTRITIONAL_QUESTIONNAIRE_ENTITY_MAPPER)
            .to(NutritionalQuestionnaireEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity>>
            (Identifier.ODONTOLOGICAL_QUESTIONNAIRE_ENTITY_MAPPER)
            .to(OdontologicalQuestionnaireEntityMapper).inSingletonScope()

        // Background Services
        this.container
            .bind<IConnectionFactory>(Identifier.MONGODB_CONNECTION_FACTORY)
            .to(ConnectionFactoryMongodb).inSingletonScope()
        this.container
            .bind<IConnectionDB>(Identifier.MONGODB_CONNECTION)
            .to(ConnectionMongodb).inSingletonScope()
        this.container
            .bind(Identifier.BACKGROUND_SERVICE)
            .to(BackgroundService).inSingletonScope()

        // Log
        this.container.bind<ILogger>(Identifier.LOGGER).to(CustomLogger).inSingletonScope()
    }
}
