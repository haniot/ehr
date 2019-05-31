import Mongoose, { Schema } from 'mongoose'

interface IMedicalRecordModel extends Mongoose.Document {
}

const medicalRecordSchema = new Mongoose.Schema({
        patient_id: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: 'Id of patient associated with the medical record is required!'
        },
        created_at: {
            type: Date
        },
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

export const MedicalRecordRepoModel =
    Mongoose.model <IMedicalRecordModel>('MedicalRecord', medicalRecordSchema, 'questionnaires')
