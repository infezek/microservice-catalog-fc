import { SortDirection } from '@fc/core/@seedwork/domain';
import { ListCategories } from '@fc/core/category/application';

export class SearchCategoryDto implements ListCategories.Input {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: string;
}
