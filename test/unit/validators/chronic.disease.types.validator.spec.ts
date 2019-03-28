import { assert } from 'chai'
import { ChronicDiseaseValidator } from '../../../src/application/domain/validator/chronic.disease.validator'
import { ChronicDiseaseTypes } from '../../../src/application/domain/utils/chronic.disease.types'
import { DiseaseHistoryTypes } from '../../../src/application/domain/utils/disease.history.types'
import { Strings } from '../../../src/utils/strings'

describe('Validators: ChronicDiseaseValidator', () => {
    const chronic: any = { type: ChronicDiseaseTypes.BLOOD_FAT, disease_history: DiseaseHistoryTypes.NO }
    it('should return undefined when the validation is successful', () => {
        const result = ChronicDiseaseValidator.validate(chronic)
        assert.equal(result, undefined)
    })

    context('when there are validation errors', () => {
        it('should throw an error for invalid type', () => {
            chronic.type = 'anything'
            try {
                ChronicDiseaseValidator.validate(chronic)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ENUM_VALIDATOR.NOT_MAPPED.concat('type: anything'))
                assert.propertyVal(err, 'description', Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(ChronicDiseaseTypes).join(', ').concat('.')))
            }
        })

        it('should throw an error for invalid disease_history', () => {
            chronic.type = ChronicDiseaseTypes.BLOOD_FAT
            chronic.disease_history = 'anything'
            try {
                ChronicDiseaseValidator.validate(chronic)
            } catch (err) {
                assert.property(err, 'message')
                assert.property(err, 'description')
                assert.propertyVal(err, 'message', Strings.ENUM_VALIDATOR.NOT_MAPPED.concat('disease_history: anything'))
                assert.propertyVal(err, 'description', Strings.ENUM_VALIDATOR.NOT_MAPPED_DESC
                    .concat(Object.values(DiseaseHistoryTypes).join(', ').concat('.')))
            }
        })
    })
})
