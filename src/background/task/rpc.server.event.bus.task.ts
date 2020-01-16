import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEventBus } from '../../infrastructure/port/event.bus.interface'
import { ILogger } from '../../utils/custom.logger'
import { IBackgroundTask } from '../../application/port/background.task.interface'
import { Query } from '../../infrastructure/repository/query/query'
import { INutritionalQuestionnaireRepository } from '../../application/port/nutritional.questionnaire.repository'
import { IOdontologicalQuestionnaireRepository } from '../../application/port/odontological.questionnaire.repository.interface'
import qs from 'query-strings-parser'
import { NutritionalQuestionnaire } from '../../application/domain/model/nutritional.questionnaire'
import { OdontologicalQuestionnaire } from '../../application/domain/model/odontological.questionnaire'
import fs from 'fs'
import { Default } from '../../utils/default'
import { IQuery } from '../../application/port/query.interface'

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
        // To use SSL/TLS, simply mount the uri with the amqps protocol and pass the CA.
        const rabbitUri = process.env.RABBITMQ_URI || Default.RABBITMQ_URI
        const rabbitOptions: any = { sslOptions: { ca: [] } }
        if (rabbitUri.indexOf('amqps') === 0) {
            rabbitOptions.sslOptions.ca = [fs.readFileSync(process.env.RABBITMQ_CA_PATH || Default.RABBITMQ_CA_PATH)]
        }
        // It RPC Server events, that for some reason could not
        // e sent and were saved for later submission.
        this._eventBus
            .connectionRpcServer
            .open(rabbitUri, rabbitOptions)
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
            .provideResource('nutritional.questionnaires.find', async (_query?: string) => {
                const query: IQuery = this.buildQS(_query)
                const result: Array<NutritionalQuestionnaire> = await this._nutritionalRepo.find(query)
                return result.map(item => item.toJSON())
            })
            .then(() => this._logger.info('Resource nutritional.questionnaires.find successful registered'))
            .catch((err) => this._logger.error(`Error at register resource nutritional.questionnaires.find: ${err.message}`))
        this._eventBus
            .provideResource('odontological.questionnaires.find', async (_query?: string) => {
                const query: IQuery = this.buildQS(_query)
                const result: Array<OdontologicalQuestionnaire> = await this._odontologicRepo.find(query)
                return result.map(item => item.toJSON())
            })
            .then(() => this._logger.info('Resource odontological.questionnaires.find successful registered'))
            .catch((err) => this._logger.error(`Error at register resource odontological.questionnaires.find: ${err.message}`))
    }

    /**
     * Prepare query string based on defaults parameters and values.
     *
     * @param query
     */
    private buildQS(query?: any): IQuery {
        return new Query().fromJSON(
            qs.parser(query ? query : {}, { pagination: { limit: Number.MAX_SAFE_INTEGER } },
                { use_page: true })
        )
    }
}
