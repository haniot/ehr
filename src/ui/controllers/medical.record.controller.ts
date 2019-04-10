import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IMedicalRecordService } from '../../application/port/medical.record.service.interface'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { MedicalRecord } from '../../application/domain/model/medical.record'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'

@controller('/patients/:patient_id/medicalrecords')
export class MedicalRecordController {
    constructor(
        @inject(Identifier.MEDICAL_RECORD_SERVICE) private readonly _service: IMedicalRecordService
    ) {
    }

    @httpPost('/')
    public async addMedicalRecordFromPacient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const medicalRecord: MedicalRecord = new MedicalRecord().fromJSON(req.body)
            medicalRecord.patient_id = req.params.patient_id
            const result: MedicalRecord = await this._service.add(medicalRecord)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllMedicalRecordsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: Array<MedicalRecord> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:medicalrecord_id')
    public async getMedicalRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            const result: MedicalRecord =
                await this._service.getById(req.params.medicalrecord_id, query)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPatch('/:medicalrecord_id')
    public async updateMedicalRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const medicalRecord: MedicalRecord = new MedicalRecord().fromJSON(req.body)
            medicalRecord.id = req.params.medicalrecord_id
            medicalRecord.patient_id = req.params.patient_id
            const result: MedicalRecord = await this._service.update(medicalRecord)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:medicalrecord_id')
    public async deleteMedicalRecordFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removeMedicalRecord(req.params.patient_id, req.params.medicalrecord_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: MedicalRecord | Array<MedicalRecord>): object {
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
            Strings.MEDICAL_RECORD.NOT_FOUND,
            Strings.MEDICAL_RECORD.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
