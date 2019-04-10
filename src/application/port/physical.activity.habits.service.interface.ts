import { IService } from './service.interface'
import { PhysicalActivityHabits } from '../domain/model/physical.activity.habits'

export interface IPhysicalActivityHabitsService extends IService<PhysicalActivityHabits> {
    removePhysicalActivityHabits(patientId: string, physicalId: string): Promise<boolean>
}
