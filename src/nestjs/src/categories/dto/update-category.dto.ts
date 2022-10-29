import { UpdateCategory } from '@fc/core/dist/category/application';

export class UpdateCategoryDto implements Omit<UpdateCategory.Input, 'id'> {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}
