import { IEntityMapper } from '../../port/entity.mapper.interface'
import { PatientEntity } from '../patient.entity'
import { Patient } from '../../../application/domain/model/patient'
import { injectable } from 'inversify'

@injectable()
export class PatientEntityMapper implements IEntityMapper<Patient, PatientEntity> {
    public transform(item: any): any {
        if (item instanceof Patient) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }

    public jsonToModel(json: any): Patient {
        const result: Patient = new Patient()
        if (!json) return result

        if (json.id !== undefined) result.id = json.id
        if (json.pilotstudy_id !== undefined) result.pilotstudy_id = json.pilotstudy_id
        if (json.first_name !== undefined) result.first_name = json.first_name
        if (json.last_name !== undefined) result.last_name = json.last_name
        if (json.gender !== undefined) result.gender = json.gender
        if (json.birth_date !== undefined) result.birth_date = json.birth_date

        return result
    }

    public modelEntityToModel(item: PatientEntity): Patient {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: Patient): PatientEntity {
        const result: PatientEntity = new PatientEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.pilotstudy_id !== undefined) result.pilotstudy_id = item.pilotstudy_id
        if (item.first_name !== undefined) result.first_name = item.first_name
        if (item.last_name !== undefined) result.last_name = item.last_name
        if (item.gender !== undefined) result.gender = item.gender
        if (item.birth_date !== undefined) result.birth_date = item.birth_date

        return result
    }
}
