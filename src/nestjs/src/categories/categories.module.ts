import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './category.providers';

import { SequelizeModule } from '@nestjs/sequelize';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';
import { CategorySequelize } from '@fc/core/category/infra';

@Module({
  controllers: [CategoriesController],
  imports: [SequelizeModule.forFeature([CategorySequelize.CategoryModel])],
  providers: [
    CategoriesService,
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORY),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASE),
  ],
})
export class CategoriesModule {}
