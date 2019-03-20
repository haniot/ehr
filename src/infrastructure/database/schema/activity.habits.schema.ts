import Mongoose, { Schema } from 'mongoose'

interface IActivityHabitsModel extends Mongoose.Document {
}

const activityHabitsSchema = new Mongoose.Schema({
    patient_id: {
        types: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    created_at: {
        type: String,
        required: 'Date of create is required!'
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
})

export const ActivityHabitsRepoModel = Mongoose.model <IActivityHabitsModel>('ActivityHabit', activityHabitsSchema)
