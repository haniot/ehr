import Mongoose, { Schema } from 'mongoose'

interface IPatientModel extends Mongoose.Document {
}

const patientSchema = new Mongoose.Schema({
        pilotstudy_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of pilot study is required!'
        },
        first_name: {
            type: String,
            required: 'First name is required!'
        },
        last_name: {
            type: String,
            required: 'Last name is required!'
        },
        gender: {
            type: String,
            required: 'Gender is required!'
        },
        birth_date: {
            type: String,
            required: 'Birth date is required!'
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

patientSchema.index({ first_name: 1, last_name: 1 }, { unique: true })
export const PatientRepoModel = Mongoose.model <IPatientModel>('Patient', patientSchema)
