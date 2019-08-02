import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { SociodemographicRecord } from './sociodemographic.record'
import { FamilyCohesionRecord } from './family.cohesion.record'
import { OralHealthRecord } from './oral.health.record'
import { JsonUtils } from '../utils/json.utils'
import { QuestionnaireRecord } from './questionnaire.record'
import { QuestionnaireTypes } from '../utils/questionnaire.types'

export class OdontologicalQuestionnaire extends QuestionnaireRecord implements IJSONSerializable,
    IJSONDeserializable<OdontologicalQuestionnaire> {

    private _sociodemographic_record?: SociodemographicRecord
    private _family_cohesion_record?: FamilyCohesionRecord
    private _oral_health_record?: OralHealthRecord

    constructor() {
        super()
        super.type = QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE
    }

    get sociodemographic_record(): SociodemographicRecord | undefined {
        return this._sociodemographic_record
    }

    set sociodemographic_record(value: SociodemographicRecord | undefined) {
        this._sociodemographic_record = value
    }

    get family_cohesion_record(): FamilyCohesionRecord | undefined {
        return this._family_cohesion_record
    }

    set family_cohesion_record(value: FamilyCohesionRecord | undefined) {
        this._family_cohesion_record = value
    }

    get oral_health_record(): OralHealthRecord | undefined {
        return this._oral_health_record
    }

    set oral_health_record(value: OralHealthRecord | undefined) {
        this._oral_health_record = value
    }

    public fromJSON(json: any): OdontologicalQuestionnaire {
        if (!json)
            return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }
        super.fromJSON(json)
        if (json.sociodemographic_record !== undefined)
            this.sociodemographic_record = new SociodemographicRecord().fromJSON(json.sociodemographic_record)
        if (json.family_cohesion_record !== undefined)
            this.family_cohesion_record = new FamilyCohesionRecord().fromJSON(json.family_cohesion_record)
        if (json.oral_health_record !== undefined)
            this.oral_health_record = new OralHealthRecord().fromJSON(json.oral_health_record)

        return this
    }

    public toJSON(): any {

        return {
            ...super.toJSON(),
            ...{
                sociodemographic_record: this.sociodemographic_record,
                family_cohesion_record: this.family_cohesion_record,
                oral_health_record: this.oral_health_record
            }
        }
    }
}
