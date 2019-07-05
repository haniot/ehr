import { ValidationException } from '../exception/validation.exception'
import { OralHealthRecord } from '../model/oral.health.record'
import { ToothBrushingFrequencyTypesValidator } from './tooth.brushing.frequency.types.validator'
import { DentalLesionTypesValidator } from './dental.lesion.types.validator'
import { ToothTypesValidator } from './tooth.types.validator'

export class UpdateOralHealthRecordValidator {
    public static validate(item: OralHealthRecord): void | ValidationException {
        if (item.teeth_brushing_freq) ToothBrushingFrequencyTypesValidator.validate(item.teeth_brushing_freq)
        if (item.teeth_lesions && item.teeth_lesions.length) {
            item.teeth_lesions.forEach(value => {
                if (value.lesion_type) DentalLesionTypesValidator.validate(value.lesion_type)
                if (value.tooth_type) ToothTypesValidator.validate(value.tooth_type)
            })
        }
    }
}
