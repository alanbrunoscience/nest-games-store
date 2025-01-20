import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03.00';

  // Enabling data validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Enabling CORS in the application
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
