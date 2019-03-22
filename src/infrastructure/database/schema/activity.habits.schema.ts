import Mongoose, { Schema } from 'mongoose'

interface IActivityHabitsModel extends Mongoose.Document {
}

const activityHabitsSchema = new Mongoose.Schema({
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patient'
        },
        created_at: {
            type: String
        },
        type: {
            type: String
        }, // SleepHabit
        week_day_sleep: {
            type: String
        },
        week_day_wake_up: {
            type: String
        }, // PhysicalActivityHabits
        school_activity_freq: {
            type: String
        },
        weekly_activities: [{
            type: String
        }], // FeedingHabitsRecord
        weekly_feeding_habits: [{
            food: { type: String },
            seven_days_freq: { type: String }
        }],
        daily_water_glasses: {
            type: String
        },
        six_month_breast_feeding: {
            type: String
        },
        food_allergy_intolerance: [{
            type: String
        }],
        breakfast_daily_frequency: {
            type: String
        }, // MedicalRecord
        chronic_diseases: [{
            type: { type: String },
            disease_history: { type: String }
        }]
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

export const ActivityHabitsRepoModel = Mongoose.model <IActivityHabitsModel>('ActivityHabit', activityHabitsSchema)
