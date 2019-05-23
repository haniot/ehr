import Mongoose, { Schema } from 'mongoose'

interface IPhysicalActivityHabitsModel extends Mongoose.Document {
}

const physicalActivityHabitsSchema = new Mongoose.Schema({
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: 'Id of patient associated with the physical activity habits is required!'
        },
        created_at: {
            type: Date
        },
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

export const PhysicalActivityHabitsRepoModel =
    Mongoose.model <IPhysicalActivityHabitsModel>
    ('PhysicalActivityHabit', physicalActivityHabitsSchema, 'questionnaires')
