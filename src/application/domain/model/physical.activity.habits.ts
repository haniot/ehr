import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { SchoolActivityFrequencyTypes } from '../utils/school.activity.frequency.types'

export class PhysicalActivityHabits implements IJSONSerializable, IJSONDeserializable<PhysicalActivityHabits> {

    private _school_activity_freq?: SchoolActivityFrequencyTypes
    private _weekly_activities?: Array<string>

    get school_activity_freq(): SchoolActivityFrequencyTypes | undefined {
        return this._school_activity_freq
    }

    set school_activity_freq(value: SchoolActivityFrequencyTypes | undefined) {
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

        if (json.school_activity_freq !== undefined) this.school_activity_freq = json.school_activity_freq
        if (json.weekly_activities !== undefined && json.weekly_activities instanceof Array) {
            this.weekly_activities = json.weekly_activities.filter(item => {
                if (typeof item === 'string') return item
            })
        }
        return this
    }

    public toJSON(): any {
        return {
            school_activity_freq: this.school_activity_freq,
            weekly_activities: this.weekly_activities && this.weekly_activities.length ? this.weekly_activities : undefined
        }
    }
}
