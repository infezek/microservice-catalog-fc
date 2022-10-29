import { UseCase as DefaultUseCase } from "#seedwork/application/use-case";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";

export namespace DeleteCategory {
  export type Input = {
    id: string;
  };
  export class UseCase
    implements DefaultUseCase<Input, void>
  {
    constructor(
      private categoryRepo: CategoryRepository.Repository
    ) {}

    async execute(input: Input): Promise<void> {
      await this.categoryRepo.delete(input.id);
    }
  }
}
