import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/sequelize';
import { AppModule } from './app.module';
import { MigrationModule } from './database/migration/migration.module';
import { applyGlobalConfig } from './global-config';
import { migrator } from '@fc/core/@seedwork/infra';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MigrationModule);
  const sequelize = app.get(getConnectionToken())
  migrator(sequelize).runAsCLI();
}
bootstrap();
