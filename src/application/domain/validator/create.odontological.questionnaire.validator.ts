import {OdontologicalQuestionnaire} from '../model/odontological.questionnaire'
import {ValidationException} from '../exception/validation.exception'
import {CreateQuestionnaireRecordValidator} from './create.questionnaire.record.validator'
import {CreateSociodemographicRecordValidator} from './create.sociodemographic.record.validator'
import {CreateFamilyCohesionRecordValidator} from './create.family.cohesion.record.validator'
import {CreateOralHealthRecordValidator} from './create.oral.health.record.validator'

export class CreateOdontologicalQuestionnaireValidator {
    public static validate(item: OdontologicalQuestionnaire): void | ValidationException {

        const fields: Array<string> = []

        CreateQuestionnaireRecordValidator.validate(item)
        if (!item.sociodemographic_record)
            fields.push('sociodemographic_record')
        else
            CreateSociodemographicRecordValidator.validate(item.sociodemographic_record)

        if (!item.family_cohesion_record)
            fields.push('family_cohesion_record')
        else
            CreateFamilyCohesionRecordValidator.validate(item.family_cohesion_record)
        if (!item.oral_health_record)
            fields.push('oral_health_record')
        else
            CreateOralHealthRecordValidator.validate(item.oral_health_record)
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Odontological Questionnaire validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
