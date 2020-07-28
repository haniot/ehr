import { DIContainer } from '../../di/di'
import { inject, injectable } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IEventBus } from '../../infrastructure/port/event.bus.interface'
import { ILogger } from '../../utils/custom.logger'
import { IBackgroundTask } from '../../application/port/background.task.interface'
import { UserDeleteEvent } from '../../application/integration-event/event/user.delete.event'
import { UserDeleteEventHandler } from '../../application/integration-event/handler/user.delete.event.handler'

@injectable()
export class SubscribeEventBusTask implements IBackgroundTask {
    constructor(
        @inject(Identifier.RABBITMQ_EVENT_BUS) private readonly _eventBus: IEventBus,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public run(): void {
        this.subscribeEvents()
    }

    public async stop(): Promise<void> {
        try {
            await this._eventBus.dispose()
        } catch (err) {
            return Promise.reject(new Error(`Error stopping SubscribeEventBusTask! ${err.message}`))
        }
    }

    /**
     * Subscribe for all events.
     */
    private subscribeEvents(): void {
        /**
         * Subscribe in UserDeleteEvent
         */
        this._eventBus
            .subscribe(
                new UserDeleteEvent(),
                new UserDeleteEventHandler(
                    DIContainer.get(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPOSITORY),
                    DIContainer.get(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPOSITORY),
                    this._logger
                ),
                UserDeleteEvent.ROUTING_KEY
            )
            .then((result: boolean) => {
                if (result) this._logger.info('Subscribe in UserDeleteEvent successful!')
            })
            .catch(err => {
                this._logger.error(`Error in Subscribe UserDeleteEvent! ${err.message}`)
            })
    }
}
