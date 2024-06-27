import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/exceptions/custom-exception.filter';
import * as fs from 'fs';
import * as path from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'HMYTSGF09287262', // Substitua por uma chave secreta forte
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Defina como true se estiver usando HTTPS
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: '*', // Você pode especificar um domínio específico aqui
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'swagger.json'), 'utf8'),
  );

  // Configurar o Swagger
  SwaggerModule.setup('api', app, swaggerDocument);

  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
