import Mongoose, { Schema } from 'mongoose'

interface IOralHealthRecordModel extends Mongoose.Document {
}

const oralHealthRecordSchema = new Mongoose.Schema({
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: 'Id of patient associated with the oral health record is required!'
        },
        created_at: {
            type: String
        },
        type: {
            type: String
        },
        teeth_brushing_freq: {
            type: String,
            required: 'Frequency from patient teeth brushing per day is required!'
        },
        teeth_lesions: [{
            tooth_type: {
                type: String
            },
            lesion_type: {
                type: String
            }
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

export const OralHealthRecordRepoModel =
    Mongoose.model <IOralHealthRecordModel>
    ('OralHealthRecord', oralHealthRecordSchema, 'questionnairesanswers')
