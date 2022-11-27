import { NotFoundError, SortDirection } from '@fc/core/@seedwork/domain';
import {
  CreateCategory,
  UpdateCategory,
  ListCategories,
  GetCategory,
  DeleteCategory,
} from '@fc/core/category/application';
import { Category, CategoryRepository } from '@fc/core/category/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryFixture } from '../../fixtures';
import { ConfigModule } from '../../../config/config.module';
import { DatabaseModule } from '../../../database/database.module';
import { CategoriesController } from '../../categories.controller';
import { CategoriesModule } from '../../categories.module';
import { CATEGORY_PROVIDERS } from '../../category.providers';

describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController;
  let repository: CategoryRepository.Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController);
    repository = module.get(
      CATEGORY_PROVIDERS.REPOSITORY.CATEGORY_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateCategory.UseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateCategory.UseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListCategories.UseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetCategory.UseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteCategory.UseCase);
  });

  describe('should create a category', () => {
    const arrange = CategoryFixture.arrangeForSave();

    test.each(arrange)(
      'with request $send_data',
      async ({ send_data, expected }) => {
        const presenter = await controller.create(send_data);
        const entity = await repository.findById(presenter.id);
        expect(entity).toMatchObject({
          id: presenter.id,
          name: send_data.name,
          description: send_data.description,
          is_active: send_data.is_active,
          created_at: presenter.created_at,
        });
        expect(presenter.id).toBe(entity.id);
        expect(presenter.name).toBe(send_data.name);
        expect(presenter.description).toBe(expected.description);
        expect(presenter.is_active).toBe(expected.is_active);
        expect(presenter.created_at).toStrictEqual(entity.created_at);
      },
    );
  });
});
