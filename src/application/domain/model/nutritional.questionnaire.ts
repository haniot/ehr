import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { SleepHabit } from './sleep.habit'
import { PhysicalActivityHabits } from './physical.activity.habits'
import { FeedingHabitsRecord } from './feeding.habits.record'
import { MedicalRecord } from './medical.record'
import { JsonUtils } from '../utils/json.utils'
import { QuestionnaireRecord } from './questionnaire.record'
import { QuestionnaireTypes } from '../utils/questionnaire.types'

export class NutritionalQuestionnaire extends QuestionnaireRecord
    implements IJSONSerializable, IJSONDeserializable<NutritionalQuestionnaire> {

    private _sleep_habit?: SleepHabit
    private _physical_activity_habits?: PhysicalActivityHabits
    private _feeding_habits_record?: FeedingHabitsRecord
    private _medical_record?: MedicalRecord

    constructor() {
        super()
        super.type = QuestionnaireTypes.NUTRITIONAL_QUESTIONNAIRE
    }

    get sleep_habit(): SleepHabit | undefined {
        return this._sleep_habit
    }

    set sleep_habit(value: SleepHabit | undefined) {
        this._sleep_habit = value
    }

    get physical_activity_habits(): PhysicalActivityHabits | undefined {
        return this._physical_activity_habits
    }

    set physical_activity_habits(value: PhysicalActivityHabits | undefined) {
        this._physical_activity_habits = value
    }

    get feeding_habits_record(): FeedingHabitsRecord | undefined {
        return this._feeding_habits_record
    }

    set feeding_habits_record(value: FeedingHabitsRecord | undefined) {
        this._feeding_habits_record = value
    }

    get medical_record(): MedicalRecord | undefined {
        return this._medical_record
    }

    set medical_record(value: MedicalRecord | undefined) {
        this._medical_record = value
    }

    public fromJSON(json: any): NutritionalQuestionnaire {
        if (!json)
            return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)
        if (json.sleep_habit !== undefined) this.sleep_habit = new SleepHabit().fromJSON(json.sleep_habit)
        if (json.physical_activity_habits !== undefined) {
            this.physical_activity_habits = new PhysicalActivityHabits().fromJSON(json.physical_activity_habits)
        }
        if (json.feeding_habits_record !== undefined) {
            this.feeding_habits_record = new FeedingHabitsRecord().fromJSON(json.feeding_habits_record)
        }
        if (json.medical_record !== undefined) this.medical_record = new MedicalRecord().fromJSON(json.medical_record)
        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            sleep_habit: this.sleep_habit ? this.sleep_habit.toJSON() : undefined,
            physical_activity_habits: this.physical_activity_habits ? this.physical_activity_habits.toJSON() : undefined,
            feeding_habits_record: this.feeding_habits_record ? this.feeding_habits_record.toJSON() : undefined,
            medical_record: this.medical_record ? this.medical_record.toJSON() : undefined
        }
    }
}
