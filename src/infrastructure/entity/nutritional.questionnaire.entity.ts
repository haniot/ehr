import {SleepHabit} from '../../application/domain/model/sleep.habit'
import {PhysicalActivityHabits} from '../../application/domain/model/physical.activity.habits'
import {FeedingHabitsRecord} from '../../application/domain/model/feeding.habits.record'
import {MedicalRecord} from '../../application/domain/model/medical.record'

export class NutritionalQuestionnaireEntity {

    public id?: string
    public patient_id?: string
    public created_at?: Date
    public sleep_habit?: SleepHabit
    public physical_activity_habits?: PhysicalActivityHabits
    public feeding_habits_record?: FeedingHabitsRecord
    public medical_record?: MedicalRecord
}
