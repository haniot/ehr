import Mongoose, { Schema } from 'mongoose'

interface INutritionalQuestionnaireModel extends Mongoose.Document {

}

const nutritionalQuestionnaireSchema = new Mongoose.Schema({

        patient_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of patient associated with the nutritional questionnaire is required!'
        },
        created_at: { type: Date },
        type: { type: String },
        sleep_habit: {
            week_day_sleep: { type: String },
            week_day_wake_up: { type: String }
        },
        physical_activity_habits: {
            school_activity_freq: { type: String },
            weekly_activities: [{ type: String }]
        },
        feeding_habits_record: {
            weekly_feeding_habits: [{
                food: { type: String },
                seven_days_freq: { type: String }
            }],
            daily_water_glasses: { type: String },
            six_month_breast_feeding: { type: String },
            food_allergy_intolerance: [{ type: String }],
            breakfast_daily_frequency: { type: String }
        },
        medical_record: {
            chronic_diseases: [{
                type: { type: String },
                disease_history: { type: String }
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
