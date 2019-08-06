import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { ChronicDisease } from './chronic.disease'
import { JsonUtils } from '../utils/json.utils'
import { QuestionnaireTypes } from '../utils/questionnaire.types'

export class MedicalRecord implements IJSONSerializable, IJSONDeserializable<MedicalRecord> {

    private _chronic_diseases?: Array<ChronicDisease>
    private _type?: string

    constructor() {
        this.type = QuestionnaireTypes.MEDICAL_RECORD
    }

    get chronic_diseases(): Array<ChronicDisease> | undefined {
        return this._chronic_diseases
    }

    set chronic_diseases(value: Array<ChronicDisease> | undefined) {
        this._chronic_diseases = value
    }

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
    }

    public fromJSON(json: any): MedicalRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }
        if (json.chronic_diseases !== undefined && json.chronic_diseases instanceof Array) {
            this.chronic_diseases = json.chronic_diseases.map(item => new ChronicDisease().fromJSON(item))
        }
        if (json.type !== undefined) this.type = json.type
        return this
    }

    public toJSON(): any {
        return {
            chronic_diseases: this.chronic_diseases,
            type: this.type
        }
    }
}
