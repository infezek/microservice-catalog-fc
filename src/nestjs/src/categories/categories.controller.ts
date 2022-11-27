import {
  CategoryOutput,
  CreateCategory,
  DeleteCategory,
  GetCategory,
  ListCategories,
  UpdateCategory,
} from '@fc/core/category/application';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WrapperDataInterceptor } from '../@share/interceptors/wrapper-data.interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from './presenter/category.presenter';

@Controller('categories')
export class CategoriesController {
  constructor() { }
  @Inject(CreateCategory.UseCase)
  private createUseCase: CreateCategory.UseCase;

  @Inject(ListCategories.UseCase)
  private listUseCase: ListCategories.UseCase;

  @Inject(UpdateCategory.UseCase)
  private updateUseCase: UpdateCategory.UseCase;

  @Inject(GetCategory.UseCase)
  private getUseCase: GetCategory.UseCase;

  @Inject(DeleteCategory.UseCase)
  private deleteUseCase: DeleteCategory.UseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const output = await this.createUseCase.execute(createCategoryDto);
    return new CategoryPresenter(output);
  }

  @Get()
  async search(@Query() searchParams: SearchCategoryDto) {
    const output = await this.listUseCase.execute(searchParams);
    return new CategoryCollectionPresenter(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this.getUseCase.execute({ id });
    return new CategoryPresenter(output);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const output = await this.updateUseCase.execute({
      id,
      ...updateCategoryDto,
    });
    return new CategoryPresenter(output);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.deleteUseCase.execute({ id });
  }

  static categoryToResponse(output: CategoryOutput) {
    return new CategoryPresenter(output);
  }
}
