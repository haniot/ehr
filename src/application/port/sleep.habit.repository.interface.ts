import { IRepository } from './repository.interface'
import { SleepHabit } from '../domain/model/sleep.habit'

export interface ISleepHabitRepository extends IRepository<SleepHabit> {
}
