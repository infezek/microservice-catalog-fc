import { UseCase as UseCaseDefault } from "#seedwork/application";
import { Category } from "../../../category/domain/entities/category";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "../dto/category-output.dto";

export namespace UpdateCategory {
  export type Input = {
    id: string;
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

    async execute(input: Input): Promise<CategoryOutput> {
      const entity = await this.categoryRepo.findById(
        input.id
      );
      entity.update(input.name, input.description);
      if (input.is_active === true) {
        entity.activate();
      }
      if (input.is_active === false) {
        entity.deactivate();
      }
      await this.categoryRepo.update(entity);
      return CategoryOutputMapper.toOutput(entity);
    }
  }
}
