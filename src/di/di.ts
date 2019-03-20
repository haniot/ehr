import 'reflect-metadata'
import { Container } from 'inversify'
import { Identifier } from './identifiers'
import { ConnectionFactoryMongodb } from '../infrastructure/database/connection.factory.mongodb'
import { ConnectionMongodb } from '../infrastructure/database/connection.mongodb'
import { IConnectionDB } from '../infrastructure/port/connection.db.interface'
import { IConnectionFactory } from '../infrastructure/port/connection.factory.interface'
import { BackgroundService } from '../background/background.service'
import { App } from '../app'
import { CustomLogger, ILogger } from '../utils/custom.logger'
import { ActivityHabitsRecord } from '../application/domain/model/activity.habits.record'
import { ActivityHabitsRecordEntity } from '../infrastructure/entity/activity.habits.record.entity'
import { IEntityMapper } from '../infrastructure/port/entity.mapper.interface'
import { ActivityHabitsRecordEntityMapper } from '../infrastructure/entity/mapper/activity.habits.record.entity.mapper'
import { FeedingHabitsRecord } from '../application/domain/model/feeding.habits.record'
import { FeedingHabitsRecordEntity } from '../infrastructure/entity/feeding.habits.record.entity'
import { FeedingHabitsRecordEntityMapper } from '../infrastructure/entity/mapper/feeding.habits.record.entity.mapper'
import { MedicalRecord } from '../application/domain/model/medical.record'
import { MedicalRecordEntity } from '../infrastructure/entity/medical.record.entity'
import { MedicalRecordEntityMapper } from '../infrastructure/entity/mapper/medical.record.entity.mapper'
import { Patient } from '../application/domain/model/patient'
import { PatientEntity } from '../infrastructure/entity/patient.entity'
import { PatientEntityMapper } from '../infrastructure/entity/mapper/patient.entity.mapper'
import { PhysicalActivityHabits } from '../application/domain/model/physical.activity.habits'
import { PhysicalActivityHabitsEntity } from '../infrastructure/entity/physical.activity.habits.entity'
import { PhysicalActivityHabitsEntityMapper } from '../infrastructure/entity/mapper/physical.activity.habits.entity.mapper'
import { SleepHabit } from '../application/domain/model/sleep.habit'
import { SleepHabitEntity } from '../infrastructure/entity/sleep.habit.entity'
import { SleepHabitEntityMapper } from '../infrastructure/entity/mapper/sleep.habit.entity.mapper'
import { PatientRepoModel } from '../infrastructure/database/schema/patient.schema'
import { ActivityHabitsRepoModel } from '../infrastructure/database/schema/activity.habits.schema'

export class DI {
    private static instance: DI
    private readonly container: Container

    /**
     * Creates an instance of DI.
     *
     * @private
     */
    private constructor() {
        this.container = new Container()
        this.initDependencies()
    }

    /**
     * Recover single instance of class.
     *
     * @static
     * @return {App}
     */
    public static getInstance(): DI {
        if (!this.instance) this.instance = new DI()
        return this.instance
    }

    /**
     * Get Container inversify.
     *
     * @returns {Container}
     */
    public getContainer(): Container {
        return this.container
    }

    /**
     * Initializes injectable containers.
     *
     * @private
     * @return void
     */
    private initDependencies(): void {
        this.container.bind(Identifier.APP).to(App).inSingletonScope()

        // Controllers

        // Services

        // Repositories

        // Models
        this.container.bind(Identifier.ACTIVITY_HABITS_REPO_MODEL).toConstantValue(ActivityHabitsRepoModel)
        this.container.bind(Identifier.PATIENT_REPO_MODEL).toConstantValue(PatientRepoModel)

        // Mappers
        this.container
            .bind<IEntityMapper<ActivityHabitsRecord, ActivityHabitsRecordEntity>>
            (Identifier.ACTIVITY_HABITS_RECORD_ENTITY_MAPPER)
            .to(ActivityHabitsRecordEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<FeedingHabitsRecord, FeedingHabitsRecordEntity>>(Identifier.FEEDING_HABITS_RECORD_ENTITY_MAPPER)
            .to(FeedingHabitsRecordEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<MedicalRecord, MedicalRecordEntity>>(Identifier.MEDICAL_RECORD_ENTITY_MAPPER)
            .to(MedicalRecordEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<Patient, PatientEntity>>(Identifier.PATIENT_ENTITY_MAPPER)
            .to(PatientEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<PhysicalActivityHabits, PhysicalActivityHabitsEntity>>
            (Identifier.PHYSICAL_ACTIVITY_HABITS_ENTITY_MAPPER)
            .to(PhysicalActivityHabitsEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<SleepHabit, SleepHabitEntity>>(Identifier.SLEEP_HABIT_ENTITY_MAPPER)
            .to(SleepHabitEntityMapper).inSingletonScope()

        // Background Services
        this.container
            .bind<IConnectionFactory>(Identifier.MONGODB_CONNECTION_FACTORY)
            .to(ConnectionFactoryMongodb).inSingletonScope()
        this.container
            .bind<IConnectionDB>(Identifier.MONGODB_CONNECTION)
            .to(ConnectionMongodb).inSingletonScope()
        this.container
            .bind(Identifier.BACKGROUND_SERVICE)
            .to(BackgroundService).inSingletonScope()

        // Log
        this.container.bind<ILogger>(Identifier.LOGGER).to(CustomLogger).inSingletonScope()
    }
}
