import { QuestionnaireRecord } from './questionnaire.record'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { QuestionnaireTypes } from '../utils/questionnaire.types'
import { JsonUtils } from '../utils/json.utils'

export class SociodemographicRecord extends QuestionnaireRecord
    implements IJSONSerializable, IJSONDeserializable<SociodemographicRecord> {
    private _color_race?: string
    private _mother_schoolarity?: string
    private _people_in_home?: number

    constructor() {
        super()
        super.type = QuestionnaireTypes.SOCIODEMOGRAPHIC_RECORD
    }

    get color_race(): string | undefined {
        return this._color_race
    }

    set color_race(value: string | undefined) {
        this._color_race = value
    }

    get mother_schoolarity(): string | undefined {
        return this._mother_schoolarity
    }

    set mother_schoolarity(value: string | undefined) {
        this._mother_schoolarity = value
    }

    get people_in_home(): number | undefined {
        return this._people_in_home
    }

    set people_in_home(value: number | undefined) {
        this._people_in_home = value
    }

    public fromJSON(json: any): SociodemographicRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        super.fromJSON(json)
        if (json.color_race !== undefined) this.color_race = json.color_race
        if (json.mother_schoolarity !== undefined) this.mother_schoolarity = json.mother_schoolarity
        if (json.people_in_home !== undefined) this.people_in_home = json.people_in_home

        return this
    }

    public toJSON(): any {
        return {
            ...super.toJSON(),
            ...{
                color_race: this.color_race,
                mother_schoolarity: this.mother_schoolarity,
                people_in_home: this.people_in_home
            }
        }
    }
}
