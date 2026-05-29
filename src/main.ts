
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true, 
      exceptionFactory: (errors) => {
        return new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Validation failed',
            errors: errors.map(err => ({
              field: err.property,
              errors: Object.values(err.constraints || {}),
            })),
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  const port = Number(process.env.PORT || 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
