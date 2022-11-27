import { UpdateCategory } from '@fc/core/category/application';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto
  extends CreateCategoryDto
  implements Omit<UpdateCategory.Input, 'id'> { }
