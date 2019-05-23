import HttpStatus from 'http-status-codes'
import { controller, httpGet, request, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import { Identifier } from '../../di/identifiers'
import { IPhysicalActivityHabitsService } from '../../application/port/physical.activity.habits.service.interface'
import { Request, Response } from 'express'
import { ApiExceptionManager } from '../exception/api.exception.manager'
import { Query } from '../../infrastructure/repository/query/query'
import { IFamilyCohesionRecordService } from '../../application/port/family.cohesion.record.service.interface'
import { IFeedingHabitsRecordService } from '../../application/port/feeding.habits.record.service.interface'
import { IMedicalRecordService } from '../../application/port/medical.record.service.interface'
import { IOralHealthRecordService } from '../../application/port/oral.health.record.service.interface'
import { ISleepHabitService } from '../../application/port/sleep.habit.service.interface'
import { ISociodemographicRecordService } from '../../application/port/sociodemographic.record.service.interface'

@controller('/patients/:patient_id/questionnaires')
export class QuestionnairesController {
    constructor(
        @inject(Identifier.FAMILY_COHESION_RECORD_SERVICE)
        private readonly _familyCohesionRecordService: IFamilyCohesionRecordService,
        @inject(Identifier.FEEDING_HABITS_RECORD_SERVICE)
        private readonly _feedingHabitsRecordService: IFeedingHabitsRecordService,
        @inject(Identifier.MEDICAL_RECORD_SERVICE)
        private readonly _medicalRecordService: IMedicalRecordService,
        @inject(Identifier.ORAL_HEALTH_RECORD_SERVICE)
        private readonly _oralHealthRecordService: IOralHealthRecordService,
        @inject(Identifier.PHYSICAL_ACTIVITY_HABITS_SERVICE)
        private readonly _physicalActivityHabitsService: IPhysicalActivityHabitsService,
        @inject(Identifier.SLEEP_HABIT_SERVICE)
        private readonly _sleepHabitService: ISleepHabitService,
        @inject(Identifier.SOCIODEMOGRAPHIC_RECORD_SERVICE)
        private readonly _sociodemographicRecordService: ISociodemographicRecordService
    ) {
    }

    @httpGet('/')
    public async getAllPhysicalActivityHabitsFromPatient(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })

            const result: Array<any> = [
                ...await this._familyCohesionRecordService.getAll(query),
                ...await this._feedingHabitsRecordService.getAll(query),
                ...await this._medicalRecordService.getAll(query),
                ...await this._oralHealthRecordService.getAll(query),
                ...await this._physicalActivityHabitsService.getAll(query),
                ...await this._sleepHabitService.getAll(query),
                ...await this._sociodemographicRecordService.getAll(query)]

            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: any | Array<any>): object {
        if (item instanceof Array) return item.map(value => this.toJSONView(value))
        item.type = undefined
        return item.toJSON()
    }

}
