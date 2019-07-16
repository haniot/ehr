import Mongoose, {Schema} from 'mongoose'

interface INutritionalQuestionnaireModel extends Mongoose.Document {

}

const nutritionalQuestionnaireSchema = new Mongoose.Schema({

        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: 'Id of patient associated with the nutritional questionnaire is required!'
        },
        created_at: {
            type: Date
        },
        type: {
            type: String
        },
        sleep_habit: {
            type: {
                type: String
            },
            week_day_sleep: {
                type: String,
                required: 'Approximate time the patient sleeps every day of the week is required!'
            },
            week_day_wake_up: {
                type: String,
                required: 'Approximate time the patient wake up every day of the week is required!'
            }
        },
        physical_activity_habits: {
            type: {
                type: String
            },
            school_activity_freq: {
                type: String,
                required: 'School activity frequency from patient is required!'
            },
            weekly_activities: [{
                type: String,
                required: 'List of physical activities practiced by the patient is required!'
            }]
        },
        feeding_habits_record: {
            type: {
                type: String
            },
            weekly_feeding_habits: [{
                food: {
                    type: String,
                    required: 'Name of food is required!'
                },
                seven_days_freq: {
                    type: String,
                    required: 'Weekly frequency of food consumption is required!'
                }
            }],
            daily_water_glasses: {
                type: String,
                required: 'Quantity of daily water glass consumption from patient is required!'
            },
            six_month_breast_feeding: {
                type: String,
                required: 'Breastfeeding level from patient in your first six months of life is required!'
            },
            food_allergy_intolerance: [{
                type: String,
                required: 'Food allergy intolerance from patient is required!'
            }],
            breakfast_daily_frequency: {
                type: String,
                required: 'Breakfast daily frequency from patient is required!'
            }
        },
        medical_record: {
            type: {
                type: String
            },
            chronic_diseases: [{
                type: {
                    type: String,
                    required: 'Type of chronic disease from pacient is required!'
                },
                disease_history: {
                    type: String,
                    required: 'Disease history from pacient is required!'
                }
            }]
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: false },
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
                return ret
            }
        }
    })

export const NutritionalQuestionnaireRepoModel =
    Mongoose.model<INutritionalQuestionnaireModel>('NutritionalQuestionnaire', nutritionalQuestionnaireSchema)
