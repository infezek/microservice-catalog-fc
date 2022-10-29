import { SortDirection } from '@fc/core/@seedwork/domain';
import {
  CreateCategory,
  GetCategory,
  ListCategories,
} from '@fc/core/category/application';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../categories.controller';
import { CategoriesService } from '../../categories.service';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { UpdateCategoryDto } from '../../dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should creates a category', async () => {
    const expectedOutput: CreateCategory.Output = {
      id: 'd6e65199-1894-5b63-860b-11daa66be11a',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    controller['createUseCase'] = mockCreateUseCase as any;
    const output = controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(controller).toBeDefined();
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should update a category', async () => {
    const id = 'd6e65199-1894-5b63-860b-11daa66be11a';
    const expectedOutput: CreateCategory.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    const input: UpdateCategoryDto = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    controller['updateUseCase'] = mockUpdateUseCase as any;
    const output = controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith(input);
    expect(controller).toBeDefined();
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should deletes a category', async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    controller['deleteUseCase'] = mockDeleteUseCase as any;
    const id = 'b1d6b635-2b80-5676-a209-081b2fc266c1';
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenLastCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should gets a category', async () => {
    const id = 'd6e65199-1894-5b63-860b-11daa66be11a';
    const expectedOutput: GetCategory.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    controller['getUseCase'] = mockGetUseCase as any;
    const output = controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(controller).toBeDefined();
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should list categories', async () => {
    const id = 'd6e65199-1894-5b63-860b-11daa66be11a';
    const expectedOutput: ListCategories.Output = {
      items: [
        {
          id,
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    controller['listUseCase'] = mockListUseCase as any;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };
    const output = controller.search(searchParams);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(controller).toBeDefined();
    expect(expectedOutput).toStrictEqual(output);
  });
});
