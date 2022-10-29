import { SearchInputDto } from "#seedwork/application";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "../dto/category-output.dto";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "#seedwork/application";

export namespace ListCategories {
  export type Input = SearchInputDto;
  export type Output = PaginationOutputDto<CategoryOutput>;
  export class UseCase {
    constructor(
      private categoryRepo: CategoryRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(
        input
      );
      const searchResult = await this.categoryRepo.search(
        params
      );
      return {
        items: searchResult.items.map((i) => ({
          id: i.id,
          name: i.name,
          description: i.description,
          is_active: i.is_active,
          created_at: i.created_at,
        })),
        total: searchResult.total,
        current_page: searchResult.current_page,
        last_page: searchResult.last_page,
        per_page: searchResult.per_page,
      };
    }
  }
}
