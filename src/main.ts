import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { JwtAuthGuard } from './modules/authz/guards/jwt-auth.guard';
import { RolesGuard } from './modules/authz/guards/roles.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { useContainer } from 'class-validator';
import { SanitizePipe } from './modules/common/pipes/Sanitize.pipe';
import { GlobalInterceptor } from './modules/common/interceptors/Global.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // crear ruta base global
  app.setGlobalPrefix('/cult')
  // fin de crear ruta
  const configService = app.get(ConfigService);

  app.enableCors();

   if (configService.get<string>('NODE_ENV') !== 'local') {//
  app.useGlobalGuards(app.get(JwtAuthGuard), app.get(RolesGuard));
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
   }//

  app.useGlobalFilters(
    // app.get(AllExceptionFilter),
    app.get(ValidationExceptionFilter),
    app.get(HttpExceptionFilter),
  );

  const config = new DocumentBuilder()
    
    .setTitle('Gestión Empresarial')
    .setDescription('The cats API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  let quizas={customSiteTitle:`My ${configService.get<string>('NODE_ENV')} Cultura API Documentation`}

  SwaggerModule.setup('api/docs', app, document,quizas);

  const port = configService.get<number>('PORT');
  await app.listen(port, () => {
    // console.log(`Listening on port: ${port}`);
    Logger.log(`Listening on Port ${port}`, 'MainApp');
  });
}

bootstrap();
