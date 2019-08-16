import { IJSONSerializable } from '../utils/json.serializable.interface'
import { IJSONDeserializable } from '../utils/json.deserializable.interface'
import { ToothLesion } from './tooth.lesion'
import { JsonUtils } from '../utils/json.utils'

export class OralHealthRecord implements IJSONSerializable, IJSONDeserializable<OralHealthRecord> {
    private _teeth_brushing_freq?: string
    private _teeth_lesions ?: Array<ToothLesion>

    get teeth_brushing_freq(): string | undefined {
        return this._teeth_brushing_freq
    }

    set teeth_brushing_freq(value: string | undefined) {
        this._teeth_brushing_freq = value
    }

    get teeth_lesions(): Array<ToothLesion> | undefined {
        return this._teeth_lesions
    }

    set teeth_lesions(value: Array<ToothLesion> | undefined) {
        this._teeth_lesions = value
    }

    public fromJSON(json: any): OralHealthRecord {
        if (!json) return this
        if (typeof json === 'string' && JsonUtils.isJsonString(json)) {
            json = JSON.parse(json)
        }

        if (json.teeth_brushing_freq !== undefined) this.teeth_brushing_freq = json.teeth_brushing_freq
        if (json.teeth_lesions !== undefined && json.teeth_lesions instanceof Array) {
            this.teeth_lesions = json.teeth_lesions.map(value => new ToothLesion().fromJSON(value))
        }
        return this
    }

    public toJSON(): any {
        return {
            teeth_brushing_freq: this.teeth_brushing_freq,
            teeth_lesions: this.teeth_lesions && this.teeth_lesions.length ?
                this.teeth_lesions.map(value => value.toJSON()) : undefined
        }
    }
}
