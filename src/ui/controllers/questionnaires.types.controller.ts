import { controller, httpGet, request, response } from 'inversify-express-utils'
import { Request, Response } from 'express'
import HttpStatus from 'http-status-codes'

/**
 * Controller that implements Home feature operations.
 * @remarks
 * To define paths, we use library inversify-express-utils.
 *
 * @see {@link https://github.com/inversify/inversify-express-utils} for further information.
 */
@controller('/v1/questionnaires/types')
export class QuestionnairesTypesController {
    /**
     * List APIRest information.
     *
     * @returns void
     */
    @httpGet('/')
    public getQuestionnaireTypes(@request() req: Request, @response() res: Response) {
        return res.status(HttpStatus.OK).send(this.jsonTypes())
    }

    private jsonTypes(): any {
        return {
            odontological: [
                {
                    id: 'sociodemographic_recod',
                    display_name: 'Sociodemographic Record'
                },
                {
                    id: 'family_cohesion_record',
                    display_name: 'Family Cohesion Record'
                },
                {
                    id: 'oral_health_record',
                    display_name: 'Oral Health Record'
                }
            ],
            nutritional: [
                {
                    id: 'sleep_habit',
                    display_name: 'Sleep Habit'
                },
                {
                    id: 'physical_activity_habits',
                    display_name: 'Physical Activity Habits'
                },
                {
                    id: 'feeding_habits_record',
                    display_name: 'Feeding Habits Record'
                },
                {
                    id: 'medical_record',
                    display_name: 'Medical Record'
                }
            ]
        }
    }
}
