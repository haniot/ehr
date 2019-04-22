import Mongoose, { Schema } from 'mongoose'

interface ISleepHabitModel extends Mongoose.Document {
}

const sleepHabitSchema = new Mongoose.Schema({
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: 'Id of patient associated with the sleep habit is required!'
        },
        created_at: {
            type: String
        },
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

export const SleepHabitRepoModel =
    Mongoose.model <ISleepHabitModel>('SleepHabit', sleepHabitSchema, 'questionnairesanswers')
