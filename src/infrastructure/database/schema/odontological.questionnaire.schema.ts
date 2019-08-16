import Mongoose, { Schema } from 'mongoose'

interface IOdontologicalQuestionnaireModel extends Mongoose.Document {

}

const odontologicalQuestionnaireSchema = new Mongoose.Schema({

        patient_id: {
            type: Schema.Types.ObjectId,
            required: 'Id of patient associated with the odontological questionnaire is required!'
        },
        created_at: { type: Date },
        type: { type: String },
        sociodemographic_record: {
            color_race: { type: String },
            mother_scholarity: { type: String },
            people_in_home: { type: Number }
        },
        family_cohesion_record: {
            family_mutual_aid_freq: { type: String },
            friendship_approval_freq: { type: String },
            family_only_task_freq: { type: String },
            family_only_preference_freq: { type: String },
            free_time_together_freq: { type: String },
            family_proximity_perception_freq: { type: String },
            all_family_tasks_freq: { type: String },
            family_tasks_opportunity_freq: { type: String },
            family_decision_support_freq: { type: String },
            family_union_relevance_freq: { type: String },
            family_cohesion_result: { type: Number }
        },
        oral_health_record: {
            teeth_brushing_freq: { type: String },
            teeth_lesions: [{
                tooth_type: { type: String },
                lesion_type: { type: String }
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

export const OdontologicalQuestionnaireRepoModel =
    Mongoose.model<IOdontologicalQuestionnaireModel>('OdontologicalQuestionnaire', odontologicalQuestionnaireSchema)
