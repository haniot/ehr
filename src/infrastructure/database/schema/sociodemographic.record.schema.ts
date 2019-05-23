import Mongoose, { Schema } from 'mongoose'

interface ISociodemographicRecordModel extends Mongoose.Document {
}

const sociodemographicRecordSchema = new Mongoose.Schema({
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: 'Id of patient associated with the sociodemographic record is required!'
        },
        created_at: {
            type: Date
        },
        type: {
            type: String
        },
        color_race: {
            type: String,
            required: 'Color race from patient is required!'
        },
        mother_scholarity: {
            type: String,
            required: 'Level of scholarity of patient mother is required!'
        },
        people_in_home: {
            type: Number,
            required: 'Quantity of people who lives with patient is required!'
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

export const SociodemographicRecordRepoModel =
    Mongoose.model <ISociodemographicRecordModel>
    ('SociodemographicRecord', sociodemographicRecordSchema, 'questionnaires')
