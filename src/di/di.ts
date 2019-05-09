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
import { IEntityMapper } from '../infrastructure/port/entity.mapper.interface'
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
import { IFeedingHabitsRecordRepository } from '../application/port/feeding.habits.record.repository.interface'
import { FeedingHabitsRecordRepository } from '../infrastructure/repository/feeding.habits.record.repository'
import { IMedicalRecordRepository } from '../application/port/medical.record.repository.interface'
import { MedicalRecordRepository } from '../infrastructure/repository/medical.record.repository'
import { IPatientRepository } from '../application/port/patient.repository.interface'
import { PatientRepository } from '../infrastructure/repository/patient.repository'
import { IPhysicalActivityHabitsRepository } from '../application/port/physical.activity.habits.repository.interface'
import { PhysicalActivityHabitsRepository } from '../infrastructure/repository/physical.activity.habits.repository'
import { ISleepHabitRepository } from '../application/port/sleep.habit.repository.interface'
import { SleepHabitRepository } from '../infrastructure/repository/sleep.habit.repository'
import { IFeedingHabitsRecordService } from '../application/port/feeding.habits.record.service.interface'
import { FeedingHabitsRecordService } from '../application/service/feeding.habits.record.service'
import { IMedicalRecordService } from '../application/port/medical.record.service.interface'
import { MedicalRecordService } from '../application/service/medical.record.service'
import { IPatientService } from '../application/port/patient.service.interface'
import { PatientService } from '../application/service/patient.service'
import { IPhysicalActivityHabitsService } from '../application/port/physical.activity.habits.service.interface'
import { PhysicalActivityHabitsService } from '../application/service/physical.activity.habits.service'
import { ISleepHabitService } from '../application/port/sleep.habit.service.interface'
import { SleepHabitService } from '../application/service/sleep.habit.service'
import { HomeController } from '../ui/controllers/home.controller'
import { FeedingHabitsRecordController } from '../ui/controllers/feeding.habits.record.controller'
import { MedicalRecordController } from '../ui/controllers/medical.record.controller'
import { SleepHabitController } from '../ui/controllers/sleep.habit.controller'
import { PhysicalActivityHabitsController } from '../ui/controllers/physical.activity.habits.controller'
import { PatientController } from '../ui/controllers/patient.controller'
import { PhysicalActivityHabitsRepoModel } from '../infrastructure/database/schema/physical.activity.habits.schema'
import { FamilyCohesionRecordRepoModel } from '../infrastructure/database/schema/family.cohesion.record.schema'
import { FeedingHabitsRecordRepoModel } from '../infrastructure/database/schema/feeding.habits.record.schema'
import { MedicalRecordRepoModel } from '../infrastructure/database/schema/medical.record.schema'
import { OralHealthRecordRepoModel } from '../infrastructure/database/schema/oral.health.record.schema'
import { SleepHabitRepoModel } from '../infrastructure/database/schema/sleep.habit.schema'
import { SociodemographicRecordRepoModel } from '../infrastructure/database/schema/sociodemographic.record.schema'
import { FamilyCohesionRecord } from '../application/domain/model/family.cohesion.record'
import { FamilyCohesionRecordEntity } from '../infrastructure/entity/family.cohesion.record.entity'
import { FamilyCohesionRecordEntityMapper } from '../infrastructure/entity/mapper/family.cohesion.record.entity.mapper'
import { OralHealthRecord } from '../application/domain/model/oral.health.record'
import { OralHealthRecordEntity } from '../infrastructure/entity/oral.health.record.entity'
import { OralHealthRecordEntityMapper } from '../infrastructure/entity/mapper/oral.health.record.entity.mapper'
import { SociodemographicRecord } from '../application/domain/model/sociodemographic.record'
import { SociodemographicRecordEntity } from '../infrastructure/entity/sociodemographic.record.entity'
import { SociodemographicRecordEntityMapper } from '../infrastructure/entity/mapper/sociodemographic.record.entity.mapper'
import { IFamilyCohesionRecordRepository } from '../application/port/family.cohesion.record.repository.interface'
import { FamilyCohesionRecordRepository } from '../infrastructure/repository/family.cohesion.record.repository'
import { IOralHealthRecordRepository } from '../application/port/oral.health.record.repository.interface'
import { OralHealthRecordRepository } from '../infrastructure/repository/oral.health.record.repository'
import { ISociodemographicRecordRepository } from '../application/port/sociodemographic.record.repository.interface'
import { SociodemographicRecordRepository } from '../infrastructure/repository/sociodemographic.record.repository'
import { FamilyCohesionRecordController } from '../ui/controllers/family.cohesion.record.controller'
import { OralHealthRecordController } from '../ui/controllers/oral.health.record.controller'
import { SociodemographicRecordController } from '../ui/controllers/sociodemographic.record.controller'
import { IFamilyCohesionRecordService } from '../application/port/family.cohesion.record.service.interface'
import { FamilyCohesionRecordService } from '../application/service/family.cohesion.record.service'
import { IOralHealthRecordService } from '../application/port/oral.health.record.service.interface'
import { OralHealthRecordService } from '../application/service/oral.health.record.service'
import { ISociodemographicRecordService } from '../application/port/sociodemographic.record.service.interface'
import { SociodemographicRecordService } from '../application/service/sociodemographic.record.service'

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
        this.container.bind<HomeController>(Identifier.HOME_CONTROLLER)
            .to(HomeController).inSingletonScope()
        this.container.bind<FeedingHabitsRecordController>(Identifier.FEEDING_HABITS_RECORD_CONTROLLER)
            .to(FeedingHabitsRecordController).inSingletonScope()
        this.container.bind<MedicalRecordController>(Identifier.MEDICAL_RECORD_CONTROLLER)
            .to(MedicalRecordController).inSingletonScope()
        this.container.bind<PhysicalActivityHabitsController>(Identifier.PHYSICAL_ACTIVITY_HABITS_CONTROLLER)
            .to(PhysicalActivityHabitsController).inSingletonScope()
        this.container.bind<SleepHabitController>(Identifier.SLEEP_HABIT_CONTROLLER)
            .to(SleepHabitController).inSingletonScope()
        this.container.bind<FamilyCohesionRecordController>(Identifier.FAMILY_COHESION_RECORD_CONTROLLER)
            .to(FamilyCohesionRecordController).inSingletonScope()
        this.container.bind<OralHealthRecordController>(Identifier.ORAL_HEALTH_RECORD_CONTROLLER)
            .to(OralHealthRecordController).inSingletonScope()
        this.container.bind<SociodemographicRecordController>(Identifier.SOCIODEMOGRAPHIC_RECORD_CONTROLLER)
            .to(SociodemographicRecordController).inSingletonScope()

        // Services
        this.container.bind<IFeedingHabitsRecordService>(Identifier.FEEDING_HABITS_RECORD_SERVICE)
            .to(FeedingHabitsRecordService).inSingletonScope()
        this.container.bind<IMedicalRecordService>(Identifier.MEDICAL_RECORD_SERVICE)
            .to(MedicalRecordService).inSingletonScope()
        this.container.bind<IPhysicalActivityHabitsService>(Identifier.PHYSICAL_ACTIVITY_HABITS_SERVICE)
            .to(PhysicalActivityHabitsService).inSingletonScope()
        this.container.bind<ISleepHabitService>(Identifier.SLEEP_HABIT_SERVICE)
            .to(SleepHabitService).inSingletonScope()
        this.container.bind<IFamilyCohesionRecordService>(Identifier.FAMILY_COHESION_RECORD_SERVICE)
            .to(FamilyCohesionRecordService).inSingletonScope()
        this.container.bind<IOralHealthRecordService>(Identifier.ORAL_HEALTH_RECORD_SERVICE)
            .to(OralHealthRecordService).inSingletonScope()
        this.container.bind<ISociodemographicRecordService>(Identifier.SOCIODEMOGRAPHIC_RECORD_SERVICE)
            .to(SociodemographicRecordService).inSingletonScope()

        // Repositories
        this.container.bind<IFeedingHabitsRecordRepository>(Identifier.FEEDING_HABITS_RECORD_REPOSITORY)
            .to(FeedingHabitsRecordRepository).inSingletonScope()
        this.container.bind<IMedicalRecordRepository>(Identifier.MEDICAL_RECORD_REPOSITORY)
            .to(MedicalRecordRepository).inSingletonScope()
        this.container.bind<IPhysicalActivityHabitsRepository>(Identifier.PHYSICAL_ACTIVITY_HABITS_REPOSITORY)
            .to(PhysicalActivityHabitsRepository).inSingletonScope()
        this.container.bind<ISleepHabitRepository>(Identifier.SLEEP_HABIT_REPOSITORY)
            .to(SleepHabitRepository).inSingletonScope()
        this.container.bind<IFamilyCohesionRecordRepository>(Identifier.FAMILY_COHESION_RECORD_REPOSITORY)
            .to(FamilyCohesionRecordRepository).inSingletonScope()
        this.container.bind<IOralHealthRecordRepository>(Identifier.ORAL_HEALTH_RECORD_REPOSITORY)
            .to(OralHealthRecordRepository).inSingletonScope()
        this.container.bind<ISociodemographicRecordRepository>(Identifier.SOCIODEMOGRAPHIC_RECORD_REPOSITORY)
            .to(SociodemographicRecordRepository).inSingletonScope()

        // Models
        this.container.bind(Identifier.FEEDING_HABITS_RECORD_REPO_MODEL).toConstantValue(FeedingHabitsRecordRepoModel)
        this.container.bind(Identifier.MEDICAL_RECORD_REPO_MODEL).toConstantValue(MedicalRecordRepoModel)
        this.container.bind(Identifier.PHYSICAL_ACTIVITY_HABITS_REPO_MODEL).toConstantValue(PhysicalActivityHabitsRepoModel)
        this.container.bind(Identifier.SLEEP_HABIT_REPO_MODEL).toConstantValue(SleepHabitRepoModel)
        this.container.bind(Identifier.FAMILY_COHESION_RECORD_REPO_MODEL).toConstantValue(FamilyCohesionRecordRepoModel)
        this.container.bind(Identifier.ORAL_HEALTH_RECORD_REPO_MODEL).toConstantValue(OralHealthRecordRepoModel)
        this.container.bind(Identifier.SOCIODEMOGRAPHIC_RECORD_REPO_MODEL).toConstantValue(SociodemographicRecordRepoModel)

        // Mappers
        this.container
            .bind<IEntityMapper<FeedingHabitsRecord, FeedingHabitsRecordEntity>>(Identifier.FEEDING_HABITS_RECORD_ENTITY_MAPPER)
            .to(FeedingHabitsRecordEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<MedicalRecord, MedicalRecordEntity>>(Identifier.MEDICAL_RECORD_ENTITY_MAPPER)
            .to(MedicalRecordEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<PhysicalActivityHabits, PhysicalActivityHabitsEntity>>
            (Identifier.PHYSICAL_ACTIVITY_HABITS_ENTITY_MAPPER)
            .to(PhysicalActivityHabitsEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<SleepHabit, SleepHabitEntity>>(Identifier.SLEEP_HABIT_ENTITY_MAPPER)
            .to(SleepHabitEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<FamilyCohesionRecord, FamilyCohesionRecordEntity>>
            (Identifier.FAMILY_COHESION_RECORD_ENTITY_MAPPER)
            .to(FamilyCohesionRecordEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<OralHealthRecord, OralHealthRecordEntity>>(Identifier.ORAL_HEALTH_RECORD_ENTITY_MAPPER)
            .to(OralHealthRecordEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<SociodemographicRecord, SociodemographicRecordEntity>>
            (Identifier.SOCIODEMOGRAPHIC_RECORD_ENTITY_MAPPER)
            .to(SociodemographicRecordEntityMapper).inSingletonScope()

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
