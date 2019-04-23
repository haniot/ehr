import { ChronicDiseaseTypes } from '../../../src/application/domain/utils/chronic.disease.types'
import { DiseaseHistoryTypes } from '../../../src/application/domain/utils/disease.history.types'
import { QuestionnaireTypes } from '../../../src/application/domain/utils/questionnaire.types'
import { SevenDaysFeedingFrequencyTypes } from '../../../src/application/domain/utils/seven.days.feeding.frequency.types'
import { DailyFeedingFrequencyTypes } from '../../../src/application/domain/utils/daily.feeding.frequency.types'
import { OneDayFeedingAmountTypes } from '../../../src/application/domain/utils/one.day.feeding.amount.types'
import { BreastFeedingTypes } from '../../../src/application/domain/utils/breast.feeding.types'
import { FoodAllergyIntoleranceTypes } from '../../../src/application/domain/utils/food.allergy.intolerance.types'
import { SchoolActivityFrequencyTypes } from '../../../src/application/domain/utils/school.activity.frequency.types'
import { GenderTypes } from '../../../src/application/domain/utils/gender.types'

export abstract class DefaultEntityMock {

    public static readonly PATIENT: any = {
        id: '5ca23b9af04e7c28223cb590',
        pilotstudy_id: '5ca3a865d07f8cce8b1c6372',
        first_name: 'Elvis',
        last_name: 'Aaron',
        gender: GenderTypes.MALE,
        birth_date: '1935-01-08'
    }

    public static readonly ACTIVITY_HABITS_RECORD: any = {
        id: '5ca23b9af2bb205b0262556b',
        patient_id: '5ca23b9af04e7c28223cb590',
        created_at: '2018-01-03T00:01:04.000Z'
    }

    public static readonly FEEDING_HABITS_RECORD: any = {
        id: '5ca23b9a4c0ed58781c8ee3f',
        patient_id: '5ca23b9af04e7c28223cb590',
        created_at: '2018-01-03T00:01:04.000Z',
        type: QuestionnaireTypes.FEEDING_HABITS_RECORD,
        weekly_feeding_habits: [{
            food: 'bread',
            seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
        }],
        daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
        six_month_breast_feeding: BreastFeedingTypes.COMPLEMENTARY,
        food_allergy_intolerance: [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER],
        breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY

    }

    public static readonly MEDICAL_RECORD: any = {
        id: '5ca23b9ac442321a589285b0',
        patient_id: '5ca23b9af04e7c28223cb590',
        created_at: '2018-01-03T00:01:04.000Z',
        type: QuestionnaireTypes.MEDICAL_RECORD,
        chronic_diseases: [{
            type: ChronicDiseaseTypes.BLOOD_FAT,
            disease_history: DiseaseHistoryTypes.YES
        }]
    }

    public static readonly PHYSICAL_ACTIVITY_HABITS: any = {
        id: '5ca23b9adcd6cc4649189c4a',
        patient_id: '5ca23b9af04e7c28223cb590',
        created_at: '2018-01-03T00:01:04.000Z',
        type: QuestionnaireTypes.PHYSICAL_ACTIVITY_HABITS,
        school_activity_freq: SchoolActivityFrequencyTypes.FOUR_MORE_PER_WEEK,
        weekly_activities: ['run', 'swin']
    }

    public static readonly SLEEP_HABIT: any = {
        id: '5ca23b9ac6c20c399e333f46',
        patient_id: '5ca23b9af04e7c28223cb590',
        created_at: '2018-01-03T00:01:04.000Z',
        type: QuestionnaireTypes.SLEEP_HABIT,
        week_day_sleep: 22,
        week_day_wake_up: 6
    }

    public static readonly CHRONIC_DISEASE: any = {
        type: ChronicDiseaseTypes.BLOOD_FAT,
        disease_history: DiseaseHistoryTypes.YES
    }

    public static readonly WEEKLY_FOOD_RECORD: any = {
        food: 'bread',
        seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
    }
}
