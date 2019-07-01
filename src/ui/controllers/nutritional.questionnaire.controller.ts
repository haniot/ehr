import {controller, httpGet, request, response} from 'inversify-express-utils'
import {inject} from 'inversify'
import {Identifier} from '../../di/identifiers'

import {IFeedingHabitsRecordService} from '../../application/port/feeding.habits.record.service.interface'
import {IMedicalRecordService} from '../../application/port/medical.record.service.interface'

import {IPhysicalActivityHabitsService} from '../../application/port/physical.activity.habits.service.interface'
import {ISleepHabitService} from '../../application/port/sleep.habit.service.interface'

import {Request, Response} from 'express'
import {Query} from '../../infrastructure/repository/query/query'
import {FeedingHabitsRecord} from '../../application/domain/model/feeding.habits.record'
import {MedicalRecord} from '../../application/domain/model/medical.record'
import {PhysicalActivityHabits} from '../../application/domain/model/physical.activity.habits'
import {SleepHabit} from '../../application/domain/model/sleep.habit'

import {ApiExceptionManager} from '../exception/api.exception.manager'

@controller('/patients/:patient_id/nutritional/questionnaires')
export class NutritionalQuestionnaireController{
    constructor(
        @inject(Identifier.FEEDING_HABITS_RECORD_SERVICE)
        private readonly _feedingHabitsRecordService: IFeedingHabitsRecordService,
        @inject(Identifier.MEDICAL_RECORD_SERVICE)
        private readonly _medicalRecordService: IMedicalRecordService,
        @inject(Identifier.PHYSICAL_ACTIVITY_HABITS_SERVICE)
        private readonly _physicalActivityHabitsService: IPhysicalActivityHabitsService,
        @inject(Identifier.SLEEP_HABIT_SERVICE)
        private readonly _sleepHabitService: ISleepHabitService,
    ) {
    }

    @httpGet('/')
    public async getAllPatientNutritionalQuestionnaires(@request() req: Request, @response() res: Response): Promise<Response> {
        try {
            const query: Query = new Query().fromJSON(req.query)

            const feedingHabitsRecords: Array<FeedingHabitsRecord> = await this._feedingHabitsRecordService.getAll(query)
            const medicalRecords: Array<MedicalRecord> = await this._medicalRecordService.getAll(query)
            const physicalActivityHabits: Array<PhysicalActivityHabits> = await this._physicalActivityHabitsService.getAll(query)
            const sleepHabits: Array<SleepHabit> = await this._sleepHabitService.getAll(query)

            const countFeedingHabitsRecords: number = await this._feedingHabitsRecordService.count()
            const countMedicalRecords: number = await this._medicalRecordService.count()
            const countPhysicalActivityHabits: number = await this._physicalActivityHabitsService.count()
            const countSleepHabits: number = await this._sleepHabitService.count()

            const sumCount = countFeedingHabitsRecords + countMedicalRecords + countPhysicalActivityHabits + countSleepHabits

            const result: any = {

                sleep_habit: this.toJSONView(sleepHabits[0]),
                physical_activity_habits: this.toJSONView(physicalActivityHabits[0]),
                feeding_habits_record: this.toJSONView(feedingHabitsRecords[0]),
                medical_record: this.toJSONView(medicalRecords[0])
            }



            res.setHeader('X-Total-Count', sumCount)
            return res.status(HttpStatus.OK).send(this.toJSONView(result))
        } catch (err) {
            const handlerError = ApiExceptionManager.build(err)
            return res.status(handlerError.code)
                .send(handlerError.toJson())
        } finally {
            req.query = {}
        }
    }

    private toJSONView(item: any): any {
        if (!item) return {}
        delete item.type
        return item.toJSON()
    }
}
