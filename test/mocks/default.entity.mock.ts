import { ObjectID } from 'bson'
import { ChronicDiseaseTypes } from '../../src/application/domain/utils/chronic.disease.types'
import { DiseaseHistoryTypes } from '../../src/application/domain/utils/disease.history.types'
import { ActivityHabitsTypes } from '../../src/application/domain/utils/activity.habits.types'
import { SevenDaysFeedingFrequencyTypes } from '../../src/application/domain/utils/seven.days.feeding.frequency.types'
import { DailyFeedingFrequencyTypes } from '../../src/application/domain/utils/daily.feeding.frequency.types'
import { OneDayFeedingAmountTypes } from '../../src/application/domain/utils/one.day.feeding.amount.types'
import { BreastFeedingTypes } from '../../src/application/domain/utils/breast.feeding.types'
import { FoodAllergyIntoleranceTypes } from '../../src/application/domain/utils/food.allergy.intolerance.types'
import { SchoolActivityFrequencyTypes } from '../../src/application/domain/utils/school.activity.frequency.types'

export abstract class DefaultEntityMock {

    public static readonly PATIENT: any = {}

    public static readonly ACTIVITY_HABITS_RECORD: any = {
        id: `${new ObjectID()}`,
        patient_id: `${new ObjectID()}`,
        created_at: '2018-01-03T00:01:04.000Z'
    }

    public static readonly FEEDING_HABITS_RECORD: any = {
        id: `${new ObjectID()}`,
        patient_id: `${new ObjectID()}`,
        created_at: '2018-01-03T00:01:04.000Z',
        type: ActivityHabitsTypes.FEEDING_HABITS_RECORD,
        weekly_feeding_habits: Array<object>({
            food: 'bread',
            seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
        }),
        daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
        six_month_breast_feeding: BreastFeedingTypes.COMPLEMENTARY,
        food_allergy_intolerance: Array<string>(FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER),
        breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY

    }

    public static readonly MEDICAL_RECORD: any = {
        id: `${new ObjectID()}`,
        patient_id: `${new ObjectID()}`,
        created_at: '2018-01-03T00:01:04.000Z',
        type: ActivityHabitsTypes.MEDICAL_RECORD,
        chronic_diseases: Array<object>({
            type: ChronicDiseaseTypes.BLOOD_FAT,
            disease_history: DiseaseHistoryTypes.YES
        })
    }

    public static readonly PHYSICAL_ACTIVITY_HABITS: any = {
        id: `${new ObjectID()}`,
        patient_id: `${new ObjectID()}`,
        created_at: '2018-01-03T00:01:04.000Z',
        type: ActivityHabitsTypes.PHYSICAL_ACTIVITY_HABITS,
        school_activity_freq: SchoolActivityFrequencyTypes.FOUR_MORE_PER_WEEK,
        weekly_activities: Array<string>('run', 'swin')
    }

    public static readonly SLEEP_HABIT: any = {

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
