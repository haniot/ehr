import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { ChronicDisease } from './chronic.disease'
import { JsonUtils } from '../utils/json.utils'

export class MedicalRecord implements IJSONSerializable, IJSONDeserializable<MedicalRecord> {

    private _chronic_diseases?: Array<ChronicDisease>

    get chronic_diseases(): Array<ChronicDisease> | undefined {
        return this._chronic_diseases
    }

    set chronic_diseases(value: Array<ChronicDisease> | undefined) {
        this._chronic_diseases = value
    }

    public fromJSON(json: any): MedicalRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }
        if (json.chronic_diseases !== undefined && json.chronic_diseases instanceof Array) {
            this.chronic_diseases = json.chronic_diseases.map(item => new ChronicDisease().fromJSON(item))
        }
        return this
    }

    public toJSON(): any {
        return {
            chronic_diseases: this.chronic_diseases && this.chronic_diseases.length ? this.chronic_diseases : undefined
        }
    }
}
