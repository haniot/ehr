import {IJSONSerializable} from '../utils/json.serializable.interface'
import {IJSONDeserializable} from '../utils/json.deserializable.interface'
import {Entity} from './entity'
import {SociodemographicRecord} from './sociodemographic.record'
import {FamilyCohesionRecord} from './family.cohesion.record'
import {OralHealthRecord} from './oral.health.record'
import {JsonUtils} from "../utils/json.utils";
import {DatetimeValidator} from "../validator/datetime.validator";

export class OdontologicalQuestionnaire extends Entity implements IJSONSerializable,
    IJSONDeserializable<OdontologicalQuestionnaire> {

    private _patient_id?: string
    private _created_at?: Date
    private _sociodemographic_recod?: SociodemographicRecord
    private _family_cohesion_record?: FamilyCohesionRecord
    private _oral_health_record?: OralHealthRecord

    constructor(){
        super()
    }

    get created_at(): Date | undefined {
        return this._created_at
    }

    set created_at(value: Date | undefined) {
        this._created_at = value
    }

    get sociodemographic_recod(): SociodemographicRecord | undefined{
        return this._sociodemographic_recod
    }

    set sociodemographic_recod(value: SociodemographicRecord | undefined) {
        this._sociodemographic_recod = value
    }

    get family_cohesion_record(): FamilyCohesionRecord | undefined{
        return this._family_cohesion_record
    }

    set family_cohesion_record(value: FamilyCohesionRecord | undefined) {
        this._family_cohesion_record = value
    }

    get oral_health_record(): OralHealthRecord | undefined{
        return this._oral_health_record
    }

    set oral_health_record(value: OralHealthRecord | undefined) {
        this._oral_health_record = value
    }

    get patient_id(): string | undefined{
        return this._patient_id;
    }

    set patient_id(value: string | undefined) {
        this._patient_id = value;
    }

    public convertDatetimeString(value: string): Date {
        DatetimeValidator.validate(value)
        return new Date(value)
    }

    public fromJSON(json: any): OdontologicalQuestionnaire {
        if (!json)
            return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json) )
            json = JSON.parse(json)

        if (json.id !== undefined)
            super.id = this.id
        if (json.patient_id !== undefined)
            this.patient_id = json.patient_id
        if (json.created_at !== undefined)
            this.created_at = this.convertDatetimeString(json.created_at)
        if (json.sociodemographic_recod !== undefined)
            this.sociodemographic_recod = json.sociodemographic_recod
        if (json.family_cohesion_record !== undefined)
            this.family_cohesion_record = json.family_cohesion_record
        if (json.oral_health_record !== undefined)
            this.oral_health_record = json.oral_health_record

        return this
    }

    public toJSON(): any {

        return {
            id: super.id,
            create_at: this.created_at,
            patient_id: this.patient_id,
            sociodemographic_recod: this.sociodemographic_recod,
            family_cohesion_record: this.family_cohesion_record,
            oral_health_record: this.oral_health_record
        }
    }
}
