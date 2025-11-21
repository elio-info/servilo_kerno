import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MunicipalityModule } from './modules/municipality/municipality.module';
import { ProvinceModule } from './modules/province/province.module';
import { AllExceptionFilter } from 'src/filters/all-exception.filter';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { ErrorModule } from './modules/common/errors/error.module';
import { AuthZModule } from './modules/authz/authz.module';
import { AuthModule } from './modules/auth/auth.module';
import { PersonModule } from './modules/person/person.module';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { PlaceModule } from './modules/place/place.module';
import { ChargeModule } from './modules/charge/charge.module';
import { CategorieModule } from './modules/categorie/categorie.module';
import { EntityTypeModule } from './modules/entity_type/entity-type.module';
import { EntityModule } from './modules/entity/entity.module';
import { BankAccountModule } from './modules/bank_account/bank-account.module';
import { IsRelationshipProvider } from './modules/common/helpers/customIdValidation';
import { SanitizePipe } from './modules/common/pipes/Sanitize.pipe';
import { CulturaModule } from './cultura/cultura.module';
import { Control_ActividadCultural_Module } from './cultura/control_actcult/control_actcult.module';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptor } from './modules/common/interceptors/Global.interceptor';
import { TrazasService } from './cultura/trazas/trazas.service';
import { TrazasModule } from './cultura/trazas/trazas.module';

 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('LOCAL_MONGO_DEV'), //DB_URL  LOCAL_MONGO_DEV
          dbName: configService.get<string>('DB_NAME'),
          autoIndex: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthZModule,
    AuthModule,
    // mio modulos ----------------
    TrazasModule,
    // fin mio modulos ----------------
    ErrorModule,MunicipalityModule,
    ProvinceModule,
    
    PlaceModule,
    PersonModule,
    ChargeModule,
    CategorieModule,
    EntityTypeModule,
    EntityModule,
    BankAccountModule,
    // mio
    CulturaModule,
    Control_ActividadCultural_Module,
    
    
  ],
  providers: [
    AllExceptionFilter,
    HttpExceptionFilter,
    ValidationExceptionFilter,
    IsRelationshipProvider,
    SanitizePipe,
    /*
    { //agregando interceptores
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    }
      */
     //mio
     TrazasService,
  ],
  controllers:[
    AppController
  ]
})
export class AppModule {}
