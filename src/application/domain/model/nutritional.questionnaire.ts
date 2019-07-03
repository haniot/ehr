import {IJSONSerializable} from '../utils/json.serializable.interface'
import {IJSONDeserializable} from '../utils/json.deserializable.interface'
import {Entity} from './entity'
import {SleepHabit} from './sleep.habit'
import {PhysicalActivityHabits} from './physical.activity.habits'
import {FeedingHabitsRecord} from './feeding.habits.record'
import {MedicalRecord} from './medical.record'
import {JsonUtils} from '../utils/json.utils'
import {DatetimeValidator} from '../validator/datetime.validator'

export class NutritionalQuestionnaire extends Entity implements IJSONSerializable, IJSONDeserializable<NutritionalQuestionnaire>{

    private _patient_id?: string
    private _created_at?: Date
    private _sleep_habit?: SleepHabit
    private _physical_activity_habits?: PhysicalActivityHabits
    private _feeding_habits_record?: FeedingHabitsRecord
    private _medical_record?: MedicalRecord

    constructor(){
        super()
    }

    get created_at(): Date | undefined{
        return this._created_at
    }

    set created_at(value: Date | undefined) {
        this._created_at = value
    }

    get sleep_habit(): SleepHabit | undefined{
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

    get feeding_habits_record(): FeedingHabitsRecord | undefined{
        return this._feeding_habits_record
    }

    set feeding_habits_record(value: FeedingHabitsRecord | undefined) {
        this._feeding_habits_record = value
    }

    get medical_record(): MedicalRecord | undefined{
        return this._medical_record
    }

    set medical_record(value: MedicalRecord | undefined) {
        this._medical_record = value
    }

    get patient_id(): string | undefined {
        return this._patient_id
    }

    set patient_id(value: string | undefined) {
        this._patient_id = value
    }

    public convertDatetimeString(value: string): Date {
        DatetimeValidator.validate(value)
        return new Date(value)
    }

    public fromJSON(json: any): NutritionalQuestionnaire {
        if (!json)
            return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)){
            json = JSON.parse(json)
        }

        if (json.id !== undefined)
            super.id = this.id
        if (json.patient_id !== undefined)
            this.patient_id = json.patient_id
        if (json.created_at !== undefined)
            this._created_at = this.convertDatetimeString(json.created_at)
        if (json.sleep_habit !== undefined)
            this.sleep_habit = json.sleep_habit
        if (json.physical_activity_habits !== undefined)
            this.feeding_habits_record = json.physical_activity_habits
        if (json.feeding_habits_record !== undefined)
            this.feeding_habits_record = json.feeding_habits_record
        if (json.medical_record !== undefined)
            this.medical_record = json.medical_record
        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            patient_id: this.patient_id,
            created_at: this.created_at,
            sleep_habit: this.sleep_habit,
            physical_activity_habits: this.physical_activity_habits,
            feeding_habits_record: this.feeding_habits_record,
            medical_record: this.medical_record
        }
    }
}
