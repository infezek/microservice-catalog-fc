import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './category.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorySequelize } from '@fc/core/category/infra';

@Module({
  controllers: [CategoriesController],
  imports: [SequelizeModule.forFeature([CategorySequelize.CategoryModel])],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORY),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASE),
  ],
})
export class CategoriesModule {}
