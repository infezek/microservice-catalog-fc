import {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  ListCategories,
  UpdateCategory,
} from '@fc/core/category/application';
import {
  CategoryInMemoryRepository,
  CategorySequelize,
} from '@fc/core/category/infra';
import { CategoryRepository } from '@fc/core/dist/category/domain/repository/category.repository';
import { getModelToken } from '@nestjs/sequelize';

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORY {
    export const CATEGORY_IN_MEMORY = {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    };

    export const CATEGORY_SEQUELIZE_REPOSITORY = {
      provide: 'CategorySequelizeRepository',
      useFactory: (categoryModel: typeof CategorySequelize.CategoryModel) =>
        new CategorySequelize.CategoryRepository(categoryModel),
      inject: [getModelToken(CategorySequelize.CategoryModel)],
    };

    export const CATEGORY_REPOSITORY = {
      provide: 'CategoryRepository',
      useExisting: 'CategorySequelizeRepository',
    };
  }

  export namespace USE_CASE {
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateCategory.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new CreateCategory.UseCase(categoryRepo);
      },
      inject: [REPOSITORY.CATEGORY_REPOSITORY.provide],
    };

    export const UPDATE_CATEGORY_USE_CASE = {
      provide: UpdateCategory.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new UpdateCategory.UseCase(categoryRepo);
      },
      inject: [REPOSITORY.CATEGORY_REPOSITORY.provide],
    };

    export const GET_CATEGORY_USE_CASE = {
      provide: GetCategory.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new GetCategory.UseCase(categoryRepo);
      },
      inject: [REPOSITORY.CATEGORY_REPOSITORY.provide],
    };

    export const LIST_CATEGORY_USE_CASE = {
      provide: ListCategories.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new ListCategories.UseCase(categoryRepo);
      },
      inject: [REPOSITORY.CATEGORY_REPOSITORY.provide],
    };

    export const DELETE_CATEGORY_USE_CASE = {
      provide: DeleteCategory.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new DeleteCategory.UseCase(categoryRepo);
      },
      inject: [REPOSITORY.CATEGORY_REPOSITORY.provide],
    };
  }
}
