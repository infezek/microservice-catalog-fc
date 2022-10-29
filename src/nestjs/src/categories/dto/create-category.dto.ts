import { CreateCategory } from '@fc/core/dist/category/application';

export class CreateCategoryDto implements CreateCategory.Input {
  name: string;
  description?: string;
  is_active?: boolean;
}
