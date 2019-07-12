import {OdontologicalQuestionnaire} from '../model/odontological.questionnaire'
import {ValidationException} from '../exception/validation.exception'
import {UpdateQuestionnaireRecordValidator} from './update.questionnaire.record.validator'
import {UpdateSociodemographicRecordValidator} from './update.sociodemographic.record.validator'
import {UpdateFamilyCohesionRecordValidator} from './update.family.cohesion.record.validator'
import {UpdateOralHealthRecordValidator} from './update.oral.health.record.validator'
import {ObjectIdValidator} from './object.id.validator'

export class UpdateOdontologicalQuestionnaireValidator {

    public static validate(item: OdontologicalQuestionnaire): void | ValidationException {
        UpdateQuestionnaireRecordValidator.validate(item)

        if (item.patient_id)
            ObjectIdValidator.validate(item.patient_id)
        if (item.sociodemographic_record)
            UpdateSociodemographicRecordValidator.validate(item.sociodemographic_record)
        if (item.family_cohesion_record)
            UpdateFamilyCohesionRecordValidator.validate(item.family_cohesion_record)
        if (item.oral_health_record)
            UpdateOralHealthRecordValidator.validate(item.oral_health_record)
    }
}
