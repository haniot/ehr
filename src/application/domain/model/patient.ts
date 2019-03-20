import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { Entity } from './entity'
import { IJSONSerializable } from '../utils/json.serializable.interface'
import { JsonUtils } from '../utils/json.utils'

export class Patient extends Entity implements IJSONSerializable, IJSONDeserializable<Patient> {
    private _pilotstudy_id?: string
    private _first_name?: string
    private _last_name?: string
    private _gender?: string
    private _age?: number

    constructor() {
        super()
    }

    get pilotstudy_id(): string | undefined {
        return this._pilotstudy_id
    }

    set pilotstudy_id(value: string | undefined) {
        this._pilotstudy_id = value
    }

    get first_name(): string | undefined {
        return this._first_name
    }

    set first_name(value: string | undefined) {
        this._first_name = value
    }

    get last_name(): string | undefined {
        return this._last_name
    }

    set last_name(value: string | undefined) {
        this._last_name = value
    }

    get gender(): string | undefined {
        return this._gender
    }

    set gender(value: string | undefined) {
        this._gender = value
    }

    get age(): number | undefined {
        return this._age
    }

    set age(value: number | undefined) {
        this._age = value
    }

    public fromJSON(json: any): Patient {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.id !== undefined) super.id = json.id
        if (json.pilotstudy_id) this.pilotstudy_id = json.pilotstudy_id
        if (json.first_name) this.first_name = json.first_name
        if (json.last_name) this.last_name = json.last_name
        if (json.gender) this.gender = json.gender
        if (json.age) this.age = json.age

        return this
    }

    public toJSON(): any {
        return {
            id: super.id,
            pilotstudy_id: this.pilotstudy_id,
            first_name: this.first_name,
            last_name: this.last_name,
            gender: this.gender,
            age: this.age
        }
    }
}
