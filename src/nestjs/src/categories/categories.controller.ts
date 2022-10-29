import {
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
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryPresenter } from './presenter/category.presenter';

@Controller('categories')
export class CategoriesController {
  constructor() {}
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
  search(@Query() searchParams: SearchCategoryDto) {
    return this.listUseCase.execute(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateUseCase.execute({ id, ...updateCategoryDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id });
  }
}
