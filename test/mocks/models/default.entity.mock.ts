import { ChronicDiseaseTypes } from '../../../src/application/domain/utils/chronic.disease.types'
import { DiseaseHistoryTypes } from '../../../src/application/domain/utils/disease.history.types'
import { QuestionnaireTypes } from '../../../src/application/domain/utils/questionnaire.types'
import { SevenDaysFeedingFrequencyTypes } from '../../../src/application/domain/utils/seven.days.feeding.frequency.types'
import { DailyFeedingFrequencyTypes } from '../../../src/application/domain/utils/daily.feeding.frequency.types'
import { OneDayFeedingAmountTypes } from '../../../src/application/domain/utils/one.day.feeding.amount.types'
import { BreastFeedingTypes } from '../../../src/application/domain/utils/breast.feeding.types'
import { FoodAllergyIntoleranceTypes } from '../../../src/application/domain/utils/food.allergy.intolerance.types'
import { SchoolActivityFrequencyTypes } from '../../../src/application/domain/utils/school.activity.frequency.types'
import { ScholarityLevelTypes } from '../../../src/application/domain/utils/scholarity.level.types'
import { FoodTypes } from '../../../src/application/domain/utils/food.types'

export abstract class DefaultEntityMock {
    public static readonly ACTIVITY_HABITS_RECORD: any = {
        id: '5ca23b9af2bb205b0262556b',
        patient_id: '5ca23b9af04e7c28223cb590',
        created_at: '2018-01-03T00:01:04.000Z'
    }

    public static readonly FEEDING_HABITS_RECORD: any = {
        weekly_feeding_habits: [{
            food: FoodTypes.BURGER_SAUSAGE,
            seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
        }],
        daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
        six_month_breast_feeding: BreastFeedingTypes.COMPLEMENTARY,
        food_allergy_intolerance: [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER],
        breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY

    }

    public static readonly MEDICAL_RECORD: any = {
        chronic_diseases: [{
            type: ChronicDiseaseTypes.BLOOD_FAT,
            disease_history: DiseaseHistoryTypes.YES
        }]
    }

    public static readonly PHYSICAL_ACTIVITY_HABITS: any = {
        school_activity_freq: SchoolActivityFrequencyTypes.FOUR_MORE_PER_WEEK,
        weekly_activities: ['run', 'swin']
    }

    public static readonly SLEEP_HABIT: any = {
        week_day_sleep: 22,
        week_day_wake_up: 6
    }

    public static readonly CHRONIC_DISEASE: any = {
        type: ChronicDiseaseTypes.BLOOD_FAT,
        disease_history: DiseaseHistoryTypes.YES
    }

    public static readonly WEEKLY_FOOD_RECORD: any = {
        food: FoodTypes.BURGER_SAUSAGE,
        seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
    }

    public static readonly SOCIODEMOGRAPHIC_RECORD: any = {
        color_race: 'white',
        mother_scholarity: ScholarityLevelTypes.UNLETTERED_ELEMENTARY_ONE_INCOMPLETE,
        people_in_home: 4
    }

    public static readonly FAMILY_COHESION_RECORD: any = {
        family_mutual_aid_freq: 'almost_never',
        friendship_approval_freq: 'almost_never',
        family_only_task_freq: 'almost_never',
        family_only_preference_freq: 'almost_never',
        free_time_together_freq: 'almost_never',
        family_proximity_perception_freq: 'almost_never',
        all_family_tasks_freq: 'almost_never',
        family_tasks_opportunity_freq: 'almost_never',
        family_decision_support_freq: 'almost_never',
        family_union_relevance_freq: 'almost_never',
        family_cohesion_result: 45
    }

    public static readonly ORAL_HEALTH_RECORD: any = {
        teeth_brushing_freq: 'none',
        teeth_lesions: [
            {
                tooth_type: 'deciduous_tooth',
                lesion_type: 'white_spot_lesion'
            },
            {
                tooth_type: 'deciduous_tooth',
                lesion_type: 'cavitated_lesion'
            }
        ]
    }
    public static readonly TOOTH_LESSION: any = {
        tooth_type: 'deciduous_tooth',
        lesion_type: 'white_spot_lesion'
    }

    public static readonly ODONTOLOGICAL_QUESTIONNAIRE: any = {
        id: '5d078f2c6fb1b4cde4578892',
        patient_id: '5ca23b9af04e7c28223cb590',
        created_at: '2018-11-19T14:40:00',
        type: QuestionnaireTypes.ODONTOLOGICAL_QUESTIONNAIRE,
        sociodemographic_record: {
            color_race: 'white',
            mother_scholarity: 'unlettered_elementary_one_incomplete',
            people_in_home: 4
        },
        family_cohesion_record: {
            family_mutual_aid_freq: 'almost_never',
            friendship_approval_freq: 'almost_never',
            family_only_task_freq: 'almost_never',
            family_only_preference_freq: 'almost_never',
            free_time_together_freq: 'almost_never',
            family_proximity_perception_freq: 'almost_never',
            all_family_tasks_freq: 'almost_never',
            family_tasks_opportunity_freq: 'almost_never',
            family_decision_support_freq: 'almost_never',
            family_union_relevance_freq: 'almost_never',
            family_cohesion_result: 45
        },
        oral_health_record: {
            teeth_brushing_freq: 'none',
            teeth_lesions: [
                {
                    tooth_type: 'deciduous_tooth',
                    lesion_type: 'white_spot_lesion'
                },
                {
                    tooth_type: 'deciduous_tooth',
                    lesion_type: 'cavitated_lesion'
                }
            ]
        }
    }

    public static readonly NUTRITIONAL_QUESTIONNAIRE: any = {
        id: '5c9137f2f6d3dba533e4cb36',
        patient_id: '5ca23b9af04e7c28223cb590',
        created_at: '2018-11-19T14:40:00',
        type: QuestionnaireTypes.NUTRITIONAL_QUESTIONNAIRE,
        sleep_habit: {
            week_day_sleep: 22,
            week_day_wake_up: 6
        },
        physical_activity_habits: {
            school_activity_freq: SchoolActivityFrequencyTypes.FOUR_MORE_PER_WEEK,
            weekly_activities: ['run', 'swin']
        },
        feeding_habits_record: {
            weekly_feeding_habits: [{
                food: FoodTypes.BURGER_SAUSAGE,
                seven_days_freq: SevenDaysFeedingFrequencyTypes.ALL_DAYS
            }],
            daily_water_glasses: OneDayFeedingAmountTypes.FIVE_MORE,
            six_month_breast_feeding: BreastFeedingTypes.COMPLEMENTARY,
            food_allergy_intolerance: [FoodAllergyIntoleranceTypes.EGG, FoodAllergyIntoleranceTypes.OTHER],
            breakfast_daily_frequency: DailyFeedingFrequencyTypes.ALMOST_EVERYDAY
        },
        medical_record: {
            chronic_diseases: [{
                type: ChronicDiseaseTypes.BLOOD_FAT,
                disease_history: DiseaseHistoryTypes.YES
            }]
        }
    }
    public static readonly QUESTIONNAIRES_TYPES: any = {
        odontological:
            [ { id: 'sociodemographic_recod',
                display_name: 'Sociodemographic Record' },
                { id: 'family_cohesion_record',
                    display_name: 'Family Cohesion Record' },
                { id: 'oral_health_record', display_name: 'Oral Health Record' } ],
        nutritional:
            [ { id: 'sleep_habit', display_name: 'Sleep Habit' },
                { id: 'physical_activity_habits',
                    display_name: 'Physical Activity Habits' },
                { id: 'feeding_habits_record',
                    display_name: 'Feeding Habits Record' },
                { id: 'medical_record', display_name: 'Medical Record' } ]
    }
}
