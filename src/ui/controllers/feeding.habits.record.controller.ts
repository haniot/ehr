import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IFeedingHabitsRecordService } from '../../application/port/feeding.habits.record.service.interface'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { FeedingHabitsRecord } from '../../application/domain/model/feeding.habits.record'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { Query } from '../../infrastructure/repository/query/query'

@controller('/patients/:patient_id/feedinghabitsrecords')
export class FeedingHabitsRecordController {
    constructor(
        @inject(Identifier.FEEDING_HABITS_RECORD_SERVICE) private readonly _service: IFeedingHabitsRecordService
    ) {
    }

    @httpPost('/')
    public async addFeedingHabitsRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const feedingHabitRecord: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(req.body)
            feedingHabitRecord.patient_id = req.params.patient_id
            const result: FeedingHabitsRecord = await this._service.add(feedingHabitRecord)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllFeedingHabitsRecordsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: Array<FeedingHabitsRecord> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:feedinghabitsrecord_id')
    public async getFeedingHabitsRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: FeedingHabitsRecord =
                await this._service.getById(req.params.feedinghabitsrecord_id, query)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPatch('/:feedinghabitsrecord_id')
    public async updateFeedingHabitsRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const feedingHabitRecord: FeedingHabitsRecord = new FeedingHabitsRecord().fromJSON(req.body)
            feedingHabitRecord.id = req.params.feedinghabitsrecord_id
            const result: FeedingHabitsRecord = await this._service.update(feedingHabitRecord)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:feedinghabitsrecord_id')
    public async deleteFeedingHabitsRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: boolean = await this._service.remove(req.params.feedinghabitsrecord_id)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: FeedingHabitsRecord | Array<FeedingHabitsRecord>): object {
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
            Strings.FEEDING_HABITS_RECORD.NOT_FOUND,
            Strings.FEEDING_HABITS_RECORD.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
