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
import { HomeController } from '../ui/controllers/home.controller'
import { QuestionnairesTypesController } from '../ui/controllers/questionnaires.types.controller'
import { ConnectionFactoryRabbitMQ } from '../infrastructure/eventbus/rabbitmq/connection.factory.rabbitmq'
import { IBackgroundTask } from '../application/port/background.task.interface'
import { SubscribeEventBusTask } from '../background/task/subscribe.event.bus.task'
import { EventBusRabbitMQ } from '../infrastructure/eventbus/rabbitmq/eventbus.rabbitmq'
import { IConnectionEventBus } from '../infrastructure/port/connection.event.bus.interface'
import { ConnectionRabbitMQ } from '../infrastructure/eventbus/rabbitmq/connection.rabbitmq'
import { IEventBus } from '../infrastructure/port/event.bus.interface'
import { RpcServerEventBusTask } from '../background/task/rpc.server.event.bus.task'

export class IoC {
    private readonly _container: Container

    /**
     * Creates an instance of DI.
     *
     * @private
     */
    constructor() {
        this._container = new Container()
        this.initDependencies()
    }

    /**
     * Get Container inversify.
     *
     * @returns {Container}
     */
    get container(): Container {
        return this._container
    }

    /**
     * Initializes injectable containers.
     *
     * @private
     * @return void
     */
    private initDependencies(): void {
        this._container.bind(Identifier.APP).to(App).inSingletonScope()

        // Controllers
        this._container.bind<HomeController>(Identifier.HOME_CONTROLLER)
            .to(HomeController).inSingletonScope()
        this._container.bind<QuestionnairesTypesController>(Identifier.QUESTIONNAIRES_TYPES_CONTROLLER)
            .to(QuestionnairesTypesController).inSingletonScope()
        this._container.bind<NutritionalQuestionnaireController>(Identifier.NUTRITIONAL_QUESTIONNAIRE_CONTROLLER)
            .to(NutritionalQuestionnaireController).inSingletonScope()
        this._container.bind<OdontologicalQuestionnaireController>(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_CONTROLLER)
            .to(OdontologicalQuestionnaireController).inSingletonScope()

        // Services
        this._container.bind<INutritionalQuestionnaireService>(Identifier.NUTRITIONAL_QUESTIONNAIRE_SERVICE)
            .to(NutritionalQuestionnaireService).inSingletonScope()
        this._container.bind<IOdontologicalQuestionnaireService>(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_SERVICE)
            .to(OdontologicalQuestionnaireService).inSingletonScope()

        // Repositories
        this._container.bind<INutritionalQuestionnaireRepository>(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPOSITORY)
            .to(NutritionalQuestionnaireRepository).inSingletonScope()
        this._container.bind<IOdontologicalQuestionnaireRepository>(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPOSITORY)
            .to(OdontologicalQuestionnaireRepository).inSingletonScope()

        // Models
        this._container.bind(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPO_MODEL)
            .toConstantValue(NutritionalQuestionnaireRepoModel)
        this._container.bind(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPO_MODEL)
            .toConstantValue(OdontologicalQuestionnaireRepoModel)

        // Mappers
        this._container
            .bind<IEntityMapper<NutritionalQuestionnaire, NutritionalQuestionnaireEntity>>
            (Identifier.NUTRITIONAL_QUESTIONNAIRE_ENTITY_MAPPER)
            .to(NutritionalQuestionnaireEntityMapper).inSingletonScope()
        this._container
            .bind<IEntityMapper<OdontologicalQuestionnaire, OdontologicalQuestionnaireEntity>>
            (Identifier.ODONTOLOGICAL_QUESTIONNAIRE_ENTITY_MAPPER)
            .to(OdontologicalQuestionnaireEntityMapper).inSingletonScope()

        // Background Services
        this._container
            .bind<IConnectionFactory>(Identifier.MONGODB_CONNECTION_FACTORY)
            .to(ConnectionFactoryMongodb).inSingletonScope()
        this._container
            .bind<IConnectionDB>(Identifier.MONGODB_CONNECTION)
            .to(ConnectionMongodb).inSingletonScope()
        this._container
            .bind<IConnectionFactory>(Identifier.RABBITMQ_CONNECTION_FACTORY)
            .to(ConnectionFactoryRabbitMQ).inSingletonScope()
        this._container
            .bind<IConnectionEventBus>(Identifier.RABBITMQ_CONNECTION)
            .to(ConnectionRabbitMQ)
        this._container
            .bind<IEventBus>(Identifier.RABBITMQ_EVENT_BUS)
            .to(EventBusRabbitMQ).inSingletonScope()
        this._container
            .bind(Identifier.BACKGROUND_SERVICE)
            .to(BackgroundService).inSingletonScope()

        // Tasks
        this._container
            .bind<IBackgroundTask>(Identifier.RPC_SERVER_EVENT_BUST_TASK)
            .to(RpcServerEventBusTask).inSingletonScope()
        this._container
            .bind<IBackgroundTask>(Identifier.SUBSCRIBE_EVENT_BUS_TASK)
            .to(SubscribeEventBusTask).inSingletonScope()

        // Log
        this._container.bind<ILogger>(Identifier.LOGGER).to(CustomLogger).inSingletonScope()
    }
}

export const DIContainer = new IoC().container
