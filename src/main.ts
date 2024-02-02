import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


// normalmente las validaciones de pipes con dto las vamos a querer tener en un punto alto de nuestra aplicacion
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true,
      forbidNonWhitelisted: true, 
    })
  );

  await app.listen(3000);
}
bootstrap();
