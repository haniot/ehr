import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { SociodemographicRecord } from '../../application/domain/model/sociodemographic.record'
import { ISociodemographicRecordService } from '../../application/port/sociodemographic.record.service.interface'

@controller('/patients/:patient_id/sociodemographicrecords')
export class SociodemographicRecordController {
    constructor(
        @inject(Identifier.SOCIODEMOGRAPHIC_RECORD_SERVICE) private readonly _service: ISociodemographicRecordService
    ) {
    }

    @httpPost('/')
    public async addSociodemographicRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const sociodemographicRecord: SociodemographicRecord = new SociodemographicRecord().fromJSON(req.body)
            sociodemographicRecord.patient_id = req.params.patient_id
            const result: SociodemographicRecord = await this._service.add(sociodemographicRecord)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllSociodemographicRecordsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: Array<SociodemographicRecord> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:sociodemographicrecord_id')
    public async getSociodemographicRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: SociodemographicRecord =
                await this._service.getById(req.params.sociodemographicrecord_id, query)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPatch('/:sociodemographicrecord_id')
    public async updateSociodemographiclRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const sociodemographicRecord: SociodemographicRecord = new SociodemographicRecord().fromJSON(req.body)
            sociodemographicRecord.id = req.params.sociodemographicrecord_id
            sociodemographicRecord.patient_id = req.params.patient_id
            const result: SociodemographicRecord = await this._service.update(sociodemographicRecord)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:sociodemographicrecord_id')
    public async deleteSociodemographicRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removeSociodemographicRecord(req.params.patient_id, req.params.sociodemographicrecord_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: SociodemographicRecord | Array<SociodemographicRecord>): object {
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
            Strings.SOCIODEMOGRAPHIC_RECORD.NOT_FOUND,
            Strings.SOCIODEMOGRAPHIC_RECORD.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
