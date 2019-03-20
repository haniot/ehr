import { inject, injectable } from 'inversify'
import { Identifier } from '../di/identifiers'
import { IConnectionDB } from '../infrastructure/port/connection.db.interface'
import { CustomLogger } from '../utils/custom.logger'

@injectable()
export class BackgroundService {

    constructor(
        @inject(Identifier.MONGODB_CONNECTION) private _mongodb: IConnectionDB,
        @inject(Identifier.LOGGER) private _logger: CustomLogger
    ) {
    }

    public async startServices(): Promise<void> {
        this._logger.debug('startServices()')
        try {
            /**
             * Trying to connect to mongodb.
             * Go ahead only when the run is resolved.
             * Since the application depends on the database connection to work.
             */
            await this._mongodb.tryConnect(0, 1000) // Initialize mongodb

            /**
             * Register your events using the event bus instance here.
             */
        } catch (err) {
            this._logger.error('Error initializing services in background: '.concat(err.message))
        }
    }

    public async stopServices(): Promise<void> {
        this._logger.debug('stopServices()')
        try {
            await this._mongodb.dispose()
        } catch (err) {
            this._logger.error('Error stopping background services: '.concat(err.message))
        }
    }
}
