import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared_resources/all_exception.filter';
import { WinstonModule } from 'nest-winston';
import { winstionInstance } from './shared_resources/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: winstionInstance,
    }),
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  // Global exception filter to catch any uncaught exceptions
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Global validation pipe to validate incoming requests
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
