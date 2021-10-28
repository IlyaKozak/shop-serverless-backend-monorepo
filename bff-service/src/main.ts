import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { bffMiddleware } from './middlewares/bff.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  app.use(bffMiddleware);

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
