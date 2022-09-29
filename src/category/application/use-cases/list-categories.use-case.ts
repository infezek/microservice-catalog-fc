import { SearchInputDto } from "../../../@seedwork/domain/application/dto/search-input.dto";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "../dto/category-output.dto";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../../@seedwork/domain/application/dto/pagination-output";

export class ListCategoriesUseCase {
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

  private toOutput(
    searchResult: CategoryRepository.SearchResult
  ): Output {
    const items = searchResult.items.map((i) => {
      return CategoryOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(
      items,
      searchResult
    );
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
