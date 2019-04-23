import { ValidationException } from '../exception/validation.exception'
import { CreateQuestionnaireRecordValidator } from './create.questionnaire.record.validator'
import { SociodemographicRecord } from '../model/sociodemographic.record'
import { ColorRaceTypesValidator } from './color.race.types.validator'
import { SchoolarityLevelTypesValidator } from './schoolarity.level.types.validator'

export class CreateSociodemographicRecordValidator {
    public static validate(item: SociodemographicRecord): void | ValidationException {
        let fields: Array<string> = []

        CreateQuestionnaireRecordValidator.validate(item)
        if (!item.color_race) fields.push('color_race')
        else ColorRaceTypesValidator.validate(item.color_race)
        if (!item.mother_schoolarity) fields.push('mother_schoolarity')
        else SchoolarityLevelTypesValidator.validate(item.mother_schoolarity)
        if (!item.people_in_home) fields.push('people_in_home')

        fields = [...new Set(fields)]
        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'Sociodemographic Record validation: '.concat(fields.join(', ')).concat(' is required!'))
        }
    }
}
