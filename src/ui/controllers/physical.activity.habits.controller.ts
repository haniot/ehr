import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IPhysicalActivityHabitsService } from '../../application/port/physical.activity.habits.service.interface'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { PhysicalActivityHabits } from '../../application/domain/model/physical.activity.habits'
import { Query } from '../../infrastructure/repository/query/query'

@controller('/patients/:patient_id/physicalactivityhabits')
export class PhysicalActivityHabitsController {
    constructor(
        @inject(Identifier.PHYSICAL_ACTIVITY_HABITS_SERVICE) private readonly _service: IPhysicalActivityHabitsService
    ) {
    }

    @httpPost('/')
    public async addPhysicalActivityHabitFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const physicalActivityHabits: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON(req.body)
            physicalActivityHabits.patient_id = req.params.patient_id
            const result: PhysicalActivityHabits = await this._service.add(physicalActivityHabits)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllPhysicalActivityHabitsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: Array<PhysicalActivityHabits> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:physicalactivityhabits_id')
    public async getPhysicalActivityHabitsFromPacient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: PhysicalActivityHabits =
                await this._service.getById(req.params.physicalactivityhabits_id, query)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPatch('/:physicalactivityhabits_id')
    public async updatePhysicalActivityHabitsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const physicalActivityHabits: PhysicalActivityHabits = new PhysicalActivityHabits().fromJSON(req.body)
            physicalActivityHabits.id = req.params.physicalactivityhabits_id
            physicalActivityHabits.patient_id = req.params.patient_id
            const result: PhysicalActivityHabits = await this._service.update(physicalActivityHabits)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:physicalactivityhabits_id')
    public async deletePhysicalActivityHabitsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removePhysicalActivityHabits(req.params.patient_id, req.params.physicalactivityhabits_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: PhysicalActivityHabits | Array<PhysicalActivityHabits>): object {
        if (item instanceof Array) {
            return item.map(value => {
                value.type = undefined
                return value.toJSON()
            })
        }

        item.type = undefined
        return item.toJSON()
    }

    private getMessageNotFound(): object {
        return new ApiException(
            HttpStatus.NOT_FOUND,
            Strings.PHYSICAL_ACTIVITY_HABITS.NOT_FOUND,
            Strings.PHYSICAL_ACTIVITY_HABITS.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
