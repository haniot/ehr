import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IOdontologicalQuestionnaireService } from '../../application/port/odontological.questionnaire.service.interface'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { OdontologicalQuestionnaire } from '../../application/domain/model/odontological.questionnaire'
import { Query } from '../../infrastructure/repository/query/query'
import HttpStatus from 'http-status-codes'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { ILogger } from '../../utils/custom.logger'
import { QuestionnaireTypes } from '../../application/domain/utils/questionnaire.types'

@controller('/v1/patients/:patient_id/odontological/questionnaires')
export class OdontologicalQuestionnaireController {

    constructor(
        @inject(Identifier.ODONTOLOGICAL_QUESTIONNAIRE_SERVICE) private readonly _service: IOdontologicalQuestionnaireService,
        @inject(Identifier.LOGGER) readonly _logger: ILogger
    ) {
    }

    @httpPost('/')
    public async addOdontologicalQuestionnaireFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const odontologicalQuestionnaire: OdontologicalQuestionnaire = new OdontologicalQuestionnaire().fromJSON(req.body)
            odontologicalQuestionnaire.patient_id = req.params.patient_id
            const result: OdontologicalQuestionnaire = await this._service.add(odontologicalQuestionnaire)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllOdontologicalQuestionnaireFromPatient(
        @request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: Array<OdontologicalQuestionnaire> = await this._service.getAll(
                new Query().fromJSON({ filters: { patient_id: req.params.patient_id } }))
            const count: number = await this._service.count(
                new Query().fromJSON({ filters: { type: QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE } }))
            res.setHeader('X-Total-Count', count)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/last')
    public async getLastPatientOdontologicalQuestionnaire(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const odontologicalQuestionnaires: Array<OdontologicalQuestionnaire> =
                await this._service.getAll(new Query().fromJSON({ filters: { patient_id: req.params.patient_id } }))
            const result: any = this.toJSONView(odontologicalQuestionnaires[0])
            return res.status(HttpStatus.OK).send(result)
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:questionnaire_id')
    public async getOdontologicalFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: OdontologicalQuestionnaire = await this._service.getById(
                req.params.questionnaire_id, new Query().fromJSON({ filters: { patient_id: req.params.patient_id } }))
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:questionnaire_id')
    public async deleteOdontologicalQuestionnaireFromPatient(
        @request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removeOdontologicalQuestionnaire(req.params.patient_id, req.params.questionnaire_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPut('/:questionnaire_id/:resource_name')
    public async updateOdontologicalQuestionnaireFromPatient(
        @request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const odontologicalQuestionnaire: OdontologicalQuestionnaire = new OdontologicalQuestionnaire().fromJSON(req.body)
            odontologicalQuestionnaire.id = req.params.questionnaire_id
            odontologicalQuestionnaire.patient_id = req.params.patient_id
            const result: OdontologicalQuestionnaire = await this._service.update(odontologicalQuestionnaire)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: OdontologicalQuestionnaire | Array<OdontologicalQuestionnaire>): object {
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
            Strings.ODONTOLOGICAL_QUESTIONNAIRE.NOT_FOUND,
            Strings.ODONTOLOGICAL_QUESTIONNAIRE.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
