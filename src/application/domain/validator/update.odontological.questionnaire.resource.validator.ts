import { ValidationException } from '../exception/validation.exception'
import { CreateSociodemographicRecordValidator } from './create.sociodemographic.record.validator'
import { CreateFamilyCohesionRecordValidator } from './create.family.cohesion.record.validator'
import { CreateOralHealthRecordValidator } from './create.oral.health.record.validator'

export class UpdateOdontologicalQuestionnaireResourceValidator {
    public static validate(name: string, resource: any): void | ValidationException {
        switch (name) {
            case 'sociodemographic_record':
                CreateSociodemographicRecordValidator.validate(resource)
                break
            case 'family_cohesion_record':
                CreateFamilyCohesionRecordValidator.validate(resource)
                break
            case 'oral_health_record':
                CreateOralHealthRecordValidator.validate(resource)
                break
            default:
                throw new ValidationException(`Resource not mapped to nutritional evaluation: ${name}`,
                    'The mapped resources are: sociodemographic_record, family_cohesion_record, ' +
                    'oral_health_record.')
        }
    }
}
