import { ActivityHabitsRecord } from './activity.habits.record'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { ChronicDisease } from './chronic.disease'
import { JsonUtils } from '../utils/json.utils'
import { ActivityHabitsTypes } from '../utils/activity.habits.types'

export class MedicalRecord
    extends ActivityHabitsRecord implements IJSONSerializable, IJSONDeserializable<MedicalRecord> {

    private _chronic_diseases?: Array<object>

    constructor() {
        super()
        super.type = ActivityHabitsTypes.MEDICAL_RECORD
    }

    get chronic_diseases(): Array<object> | undefined {
        return this._chronic_diseases
    }

    set chronic_diseases(value: Array<object> | undefined) {
        this._chronic_diseases = value
    }

    public fromJSON(json: any): MedicalRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)
        if (json.chronic_diseases !== undefined && json.chronic_diseases instanceof Array)
            this.chronic_diseases =
                json.chronic_diseases.map(item => new ChronicDisease().fromJSON(item))

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{ chronic_diseases: this.chronic_diseases }
        }
    }
}
