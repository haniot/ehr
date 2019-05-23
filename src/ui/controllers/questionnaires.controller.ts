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
import { FamilyCohesionRecord } from '../../application/domain/model/family.cohesion.record'
import { FeedingHabitsRecord } from '../../application/domain/model/feeding.habits.record'
import { MedicalRecord } from '../../application/domain/model/medical.record'
import { OralHealthRecord } from '../../application/domain/model/oral.health.record'
import { PhysicalActivityHabits } from '../../application/domain/model/physical.activity.habits'
import { SleepHabit } from '../../application/domain/model/sleep.habit'
import { SociodemographicRecord } from '../../application/domain/model/sociodemographic.record'

@controller('/patients/:patient_id/questionnaires/last')
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
    public async getLastPatientQuestionnaires(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)
            query.addFilter({ patient_id: req.params.patient_id })
            query.addOrdination('created_at', 'desc')

            const feedingHabitsRecords: Array<FeedingHabitsRecord> = await this._feedingHabitsRecordService.getAll(query)
            const medicalRecords: Array<MedicalRecord> = await this._medicalRecordService.getAll(query)
            const physicalActivityHabits: Array<PhysicalActivityHabits> = await this._physicalActivityHabitsService.getAll(query)
            const sleepHabits: Array<SleepHabit> = await this._sleepHabitService.getAll(query)
            const sociodemographicRecord: Array<SociodemographicRecord> = await this._sociodemographicRecordService.getAll(query)
            const familyCohesionRecords: Array<FamilyCohesionRecord> = await this._familyCohesionRecordService.getAll(query)
            const oralHealthRecords: Array<OralHealthRecord> = await this._oralHealthRecordService.getAll(query)

            const result: any = {
                nutritional: {
                    sleep_habit: this.toJSONView(sleepHabits[0].toJSON()),
                    physical_activity_habits: this.toJSONView(physicalActivityHabits[0].toJSON()),
                    feeding_habits_record: this.toJSONView(feedingHabitsRecords[0].toJSON()),
                    medical_record: this.toJSONView(medicalRecords[0].toJSON())
                },
                odontological: {
                    sociodemographic_record: this.toJSONView(sociodemographicRecord[0].toJSON()),
                    family_cohesion_record: this.toJSONView(familyCohesionRecords[0].toJSON()),
                    oral_health_record: this.toJSONView(oralHealthRecords[0].toJSON())
                }
            }
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handleError = ApiExceptionManager.build(err)
            return res.status(handleError.code).send(handleError.toJson())
        }
    }

    private toJSONView(item: any): any {
        delete item.type
        return item
    }

}
