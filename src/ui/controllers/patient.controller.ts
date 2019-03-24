import HttpStatus from 'http-status-codes'
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IPatientService } from '../../application/port/patient.service.interface'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { Patient } from '../../application/domain/model/patient'
import { Query } from '../../infrastructure/repository/query/query'

@controller('/pilotstudies/:pilotstudy_id/patients')
export class PatientController {
    constructor(
        @inject(Identifier.PATIENT_SERVICE) private readonly _service: IPatientService
    ) {
    }

    @httpPost('/')
    public async addPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const patient: Patient = new Patient().fromJSON(req.body)
            const result: Patient = await this._service.add(patient)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllPatients(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ pilotstudy_id: req.params.pilotstudy_id })
            const result: Array<Patient> = await this._service.getAll(query)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:patient_id')
    public async getPatientById(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ pilotstudy_id: req.params.pilotstudy_id })
            const result: Patient =
                await this._service.getById(req.params.patient_id, query)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPatch('/:patient_id')
    public async updatePatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const patient: Patient = new Patient().fromJSON(req.body)
            patient.id = req.params.patient_id
            const result: Patient = await this._service.update(patient)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:patient_id')
    public async deletePatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: boolean = await this._service.remove(req.params.patient_id)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: Patient | Array<Patient>): object {
        if (item instanceof Array) {
            return item.map(value => value.toJSON())
        }
        return item.toJSON()
    }

    private getMessageNotFound(): object {
        return new ApiException(
            HttpStatus.NOT_FOUND,
            Strings.PATIENT.NOT_FOUND,
            Strings.PATIENT.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
