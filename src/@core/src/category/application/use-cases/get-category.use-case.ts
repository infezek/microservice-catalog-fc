import { CategoryRepository } from "#category/domain";
import { CategoryOutput } from "../dto/category-output.dto";

export namespace GetCategory {
  export type Input = {
    id: string;
  };
  export type Output = CategoryOutput;
  export class UseCase {
    constructor(
      private categoryRepo: CategoryRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepo.findById(
        input.id
      );
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
