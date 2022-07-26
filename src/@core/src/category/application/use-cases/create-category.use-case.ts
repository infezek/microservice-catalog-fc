import { UseCase as UseCaseDefault } from "#seedwork/application";
import { Category } from "../../../category/domain/entities/category";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output.dto";

export namespace CreateCategory {
  export type Output = CategoryOutput;

  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export class UseCase
    implements UseCaseDefault<Input, CategoryOutput>
  {
    constructor(
      private categoryRepo: CategoryRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Category(input);
      await this.categoryRepo.insert(entity);
      return {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        is_active: entity.is_active,
        created_at: entity.created_at,
      };
    }
  }
}
