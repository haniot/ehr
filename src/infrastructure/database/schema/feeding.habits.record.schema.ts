import Mongoose, { Schema } from 'mongoose'

interface IFeedingHabitsRecordModel extends Mongoose.Document {
}

const feedingHabitsRecordSchema = new Mongoose.Schema({
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: 'Id of patient associated with the feeding habits record is required!'
        },
        created_at: {
            type: String
        },
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

export const FeedingHabitsRecordRepoModel =
    Mongoose.model <IFeedingHabitsRecordModel>
    ('FeedingHabitsRecord', feedingHabitsRecordSchema, 'questionnairesanswers')
