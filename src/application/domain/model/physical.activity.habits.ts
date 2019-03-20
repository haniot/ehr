import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { ActivityHabitsRecord } from './activity.habits.record'
import { JsonUtils } from '../utils/json.utils'

export class PhysicalActivityHabits
    extends ActivityHabitsRecord implements IJSONSerializable, IJSONDeserializable<PhysicalActivityHabits> {

    private _school_activity_freq?: string
    private _weekly_activities?: Array<string>

    constructor() {
        super()
    }

    get school_activity_freq(): string | undefined {
        return this._school_activity_freq
    }

    set school_activity_freq(value: string | undefined) {
        this._school_activity_freq = value
    }

    get weekly_activities(): Array<string> | undefined {
        return this._weekly_activities
    }

    set weekly_activities(value: Array<string> | undefined) {
        this._weekly_activities = value
    }

    public fromJSON(json: any): PhysicalActivityHabits {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }
        super.fromJSON(json)
        if (json.school_activity_freq !== undefined) this.school_activity_freq = json.school_activity_freq
        if (json.weekly_activities !== undefined && json.weekly_activities instanceof Array) {
            this.weekly_activities = json.weekly_activities.map(item => item instanceof String)
        }
        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{
                school_activity_freq: this.school_activity_freq,
                weekly_activities: this.weekly_activities
            }
        }
    }
}
