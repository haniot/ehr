import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { IFamilyCohesionRecordService } from '../../application/port/family.cohesion.record.service.interface'
import { FamilyCohesionRecord } from '../../application/domain/model/family.cohesion.record'

@controller('/patients/:patient_id/familycohesionrecords')
export class FamilyCohesionRecordController {
    constructor(
        @inject(Identifier.FAMILY_COHESION_RECORD_SERVICE) private readonly _service: IFamilyCohesionRecordService
    ) {
    }

    @httpPost('/')
    public async addFamilyCohesionRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const familyCohesionRecord: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(req.body)
            familyCohesionRecord.patient_id = req.params.patient_id
            const result: FamilyCohesionRecord = await this._service.add(familyCohesionRecord)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllFamilyCohesionRecordsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: Array<FamilyCohesionRecord> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:familycohesionrecord_id')
    public async getFamilyCohesionRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: FamilyCohesionRecord =
                await this._service.getById(req.params.familycohesionrecord_id, query)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPatch('/:familycohesionrecord_id')
    public async updateFamilyCohesionRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const familyCohesionRecord: FamilyCohesionRecord = new FamilyCohesionRecord().fromJSON(req.body)
            familyCohesionRecord.id = req.params.familycohesionrecord_id
            familyCohesionRecord.patient_id = req.params.patient_id
            const result: FamilyCohesionRecord = await this._service.update(familyCohesionRecord)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:familycohesionrecord_id')
    public async deleteFamilyCohesionRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removeFamilyCohesionRecord(req.params.patient_id, req.params.familycohesionrecord_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: FamilyCohesionRecord | Array<FamilyCohesionRecord>): object {
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
            Strings.FAMILY_COHESION_RECORD.NOT_FOUND,
            Strings.FAMILY_COHESION_RECORD.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
