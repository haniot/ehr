import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { IOralHealthRecordService } from '../../application/port/oral.health.record.service.interface'
import { OralHealthRecord } from '../../application/domain/model/oral.health.record'

@controller('/patients/:patient_id/oralhealthrecords')
export class OralHealthRecordController {
    constructor(
        @inject(Identifier.ORAL_HEALTH_RECORD_SERVICE) private readonly _service: IOralHealthRecordService
    ) {
    }

    @httpPost('/')
    public async addOralHealthRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const oralHealthRecord: OralHealthRecord = new OralHealthRecord().fromJSON(req.body)
            oralHealthRecord.patient_id = req.params.patient_id
            const result: OralHealthRecord = await this._service.add(oralHealthRecord)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllOralHealthRecordsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: Array<OralHealthRecord> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:oralhealthrecord_id')
    public async getOralHealthRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: OralHealthRecord =
                await this._service.getById(req.params.oralhealthrecord_id, query)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPatch('/:oralhealthrecord_id')
    public async updateOralHealthRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const oralHealthRecord: OralHealthRecord = new OralHealthRecord().fromJSON(req.body)
            oralHealthRecord.id = req.params.oralhealthrecord_id
            oralHealthRecord.patient_id = req.params.patient_id
            const result: OralHealthRecord = await this._service.update(oralHealthRecord)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:oralhealthrecord_id')
    public async deleteOralHealthRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removeOralHealthRecord(req.params.patient_id, req.params.oralhealthrecord_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: OralHealthRecord | Array<OralHealthRecord>): object {
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
            Strings.ORAL_HEALTH_RECORD.NOT_FOUND,
            Strings.ORAL_HEALTH_RECORD.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
