import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { JsonUtils } from '../utils/json.utils'
import { ColorRaceTypes } from '../utils/color.race.types'
import { ScholarityLevelTypes } from '../utils/scholarity.level.types'

export class SociodemographicRecord implements IJSONSerializable, IJSONDeserializable<SociodemographicRecord> {
    private _color_race?: ColorRaceTypes
    private _mother_scholarity?: ScholarityLevelTypes
    private _people_in_home?: number

    get color_race(): ColorRaceTypes | undefined {
        return this._color_race
    }

    set color_race(value: ColorRaceTypes | undefined) {
        this._color_race = value
    }

    get mother_scholarity(): ScholarityLevelTypes | undefined {
        return this._mother_scholarity
    }

    set mother_scholarity(value: ScholarityLevelTypes | undefined) {
        this._mother_scholarity = value
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

        if (json.color_race !== undefined) this.color_race = json.color_race
        if (json.mother_scholarity !== undefined) this.mother_scholarity = json.mother_scholarity
        if (json.people_in_home !== undefined) this.people_in_home = json.people_in_home
        return this
    }

    public toJSON(): any {
        return {
            color_race: this.color_race,
            mother_scholarity: this.mother_scholarity,
            people_in_home: this.people_in_home
        }
    }
}
