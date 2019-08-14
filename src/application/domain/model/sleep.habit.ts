import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class SleepHabit implements IJSONSerializable, IJSONDeserializable<SleepHabit> {

    private _week_day_sleep?: number
    private _week_day_wake_up?: number

    get week_day_sleep(): number | undefined {
        return this._week_day_sleep
    }

    set week_day_sleep(value: number | undefined) {
        this._week_day_sleep = value
    }

    get week_day_wake_up(): number | undefined {
        return this._week_day_wake_up
    }

    set week_day_wake_up(value: number | undefined) {
        this._week_day_wake_up = value
    }

    public fromJSON(json: any): SleepHabit {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.week_day_sleep !== undefined) this.week_day_sleep = json.week_day_sleep
        if (json.week_day_wake_up !== undefined) this.week_day_wake_up = json.week_day_wake_up
        return this
    }

    public toJSON(): any {
        return {
            week_day_sleep: this.week_day_sleep,
            week_day_wake_up: this.week_day_wake_up
        }
    }

}
