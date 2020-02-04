import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import HttpStatus from 'http-status-codes'
import { Request, Response } from 'express'
import { Query } from '../../infrastructure/repository/query/query'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { INutritionalQuestionnaireService } from '../../application/port/nutritional.questionnaire.service'
import { ApiException } from '../exception/api.exception'
import { Strings } from '../../utils/strings'
import { NutritionalQuestionnaire } from '../../application/domain/model/nutritional.questionnaire'
import { QuestionnaireTypes } from '../../application/domain/utils/questionnaire.types'

@controller('/v1/patients/:patient_id/nutritional/questionnaires')
export class NutritionalQuestionnaireController {
    constructor(
        @inject(Identifier.NUTRITIONAL_QUESTIONNAIRE_SERVICE) private readonly _service: INutritionalQuestionnaireService
    ) {
    }

    @httpPost('/')
    public async addNutritionalQuestionnaireFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const nutritionalQuestionnaire: NutritionalQuestionnaire = new NutritionalQuestionnaire().fromJSON(req.body)
            nutritionalQuestionnaire.patient_id = req.params.patient_id
            const result: NutritionalQuestionnaire = await this._service.add(nutritionalQuestionnaire)
            return res.status(HttpStatus.CREATED).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/')
    public async getAllNutritionalQuestionnaireFromPatient(
        @request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            query.addFilter({ type: QuestionnaireTypes.NUTRITIONAL_QUESTIONNAIRE })
            const result: Array<NutritionalQuestionnaire> = await this._service.getAll(query)
            const count: number = await this._service.count(query)
            res.setHeader('X-Total-Count', count)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/last')
    public async getLastNutritionalQuestionnaireFromPatient(
        @request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const questionnaires: Array<NutritionalQuestionnaire> = await this._service.getAll(
                new Query().fromJSON({ filters: { patient_id: req.params.patient_id } }))
            return res.status(HttpStatus.OK).send(
                questionnaires && questionnaires.length ? this.toJSONView(questionnaires[0]) : {})
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpGet('/:questionnaire_id')
    public async getNutritionalQuestionnaireFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: NutritionalQuestionnaire = await this._service.getById(
                req.params.questionnaire_id, new Query().fromJSON({ filters: { patient_id: req.params.patient_id } }))
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpDelete('/:questionnaire_id')
    public async deleteNutritionalQuestionnaireFromPatient(
        @request() req: Request, @response() res: Response): Promise<Response> {
        try {
            await this._service.removeQuestionnaire(req.params.patient_id, req.params.questionnaire_id)
            return res.status(HttpStatus.NO_CONTENT).send()
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    @httpPut('/:questionnaire_id/:resource_name')
    public async updateNutritionalQuestionnaireFromPatient(
        @request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const result: any = await this._service.updateQuestionnaireResource(
                req.params.patient_id, req.params.questionnaire_id, req.params.resource_name, req.body)
            if (!result) return res.status(HttpStatus.NOT_FOUND).send(this.getMessageNotFound())
            return res.status(HttpStatus.OK).send(req.body)
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: any): any {
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
            Strings.NUTRITIONAL_QUESTIONNAIRE.NOT_FOUND,
            Strings.NUTRITIONAL_QUESTIONNAIRE.NOT_FOUND_DESCRIPTION
        ).toJson()
    }
}
