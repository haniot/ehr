import { inject } from 'inversify'
import { Identifier } from '../../../di/identifiers'
import { IIntegrationEventHandler } from './integration.event.handler.interface'
import { ILogger } from '../../../utils/custom.logger'
import { UserDeleteEvent } from '../event/user.delete.event'
import { User } from '../../domain/model/user'
import { UserValidator } from '../../domain/validator/user.validator'
import { IOdontologicalQuestionnaireRepository } from '../../port/odontological.questionnaire.repository.interface'
import { INutritionalQuestionnaireRepository } from '../../port/nutritional.questionnaire.repository'

export class UserDeleteEventHandler implements IIntegrationEventHandler<UserDeleteEvent> {
    constructor(
        @inject(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_REPOSITORY)
        private readonly _odontologicRepo: IOdontologicalQuestionnaireRepository,
        @inject(Identifier.NUTRITIONAL_QUESTIONNAIRE_REPOSITORY)
        private readonly _nutritionalRepo: INutritionalQuestionnaireRepository,
        @inject(Identifier.LOGGER) private readonly _logger: ILogger
    ) {
    }

    public async handle(event: UserDeleteEvent): Promise<void> {
        try {
            const user: User = new User().fromJSON(event.user)
            UserValidator.validate(user)
            await this._odontologicRepo.removeOdontologicalQuestionnaireFromUser(user.id!)
            await this._nutritionalRepo.removeNutritionalQuestionnaireFromUser(user.id!)
            this._logger.info(`Action for event ${event.event_name} successfully performed!`)
        } catch (err) {
            this._logger.warn(`An error occurred while attempting `
                .concat(`perform the operation with the ${event.event_name} name event. ${err.message}`)
                .concat(err.description ? ' ' + err.description : ''))
        }
    }
}
