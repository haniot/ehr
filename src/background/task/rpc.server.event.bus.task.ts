import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEventBus } from '../../infrastructure/port/event.bus.interface'
import { ILogger } from '../../utils/custom.logger'
import { IBackgroundTask } from '../../application/port/background.task.interface'
import { Query } from '../../infrastructure/repository/query/query'
import { INutritionalQuestionnaireRepository } from '../../application/port/nutritional.questionnaire.repository'
import { IOdontologicalQuestionnaireRepository } from '../../application/port/odontological.questionnaire.repository.interface'
import qs from 'query-strings-parser'

@injectable()
export class RpcServerEventBusTask implements IBackgroundTask {
    constructor(
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPOSITORY)
        private readonly _odontologicRepo: IOdontologicalQuestionnaireRepository,
        @inject(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPOSITORY)
        private readonly _nutritionalRepo: INutritionalQuestionnaireRepository,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public run(): void {
        // It RPC Server events, that for some reason could not
        // e sent and were saved for later submission.
        this._eventBus
            .connectionRpcServer
            .open(0, 2000)
            .then(() => {
                this._logger.info('Connection with RPC Server opened successful!')
                this.initializeServer()
            })
            .catch(err => {
                this._logger.error(`Error trying to get connection to Event Bus for RPC Server. ${err.message}`)
            })
    }

    public async stop(): Promise<void> {
        try {
            await this._eventBus.dispose()
        } catch (err) {
            return Promise.reject(new Error(`Error stopping RPC Server! ${err.message}`))
        }
    }

    private initializeServer(): void {
        this._eventBus
            .provideResource('nutritional.questionnaires.find', (_query?: string, patientId?: string) => {
                const query: Query = new Query().fromJSON({ ...qs.parser(_query) })
                query.addFilter({ patient_id: patientId })
                return this._nutritionalRepo.find(query)
            })
            .then(() => this._logger.info('Resource nutritional.questionnaires.find successful registered'))
            .catch((err) => this._logger.error(`Error at register resource nutritional.questionnaires.find: ${err.message}`))
        this._eventBus
            .provideResource('odontological.questionnaires.find', (_query?: string, patientId?: string) => {
                const query: Query = new Query().fromJSON({ ...qs.parser(_query) })
                query.addFilter({ patient_id: patientId })
                return this._odontologicRepo.find(query)
            })
            .then(() => this._logger.info('Resource odontological.questionnaires.find successful registered'))
            .catch((err) => this._logger.error(`Error at register resource odontological.questionnaires.find: ${err.message}`))
    }
}
