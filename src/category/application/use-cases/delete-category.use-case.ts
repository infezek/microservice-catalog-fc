import { UseCase as DefaultUseCase } from "../../../@seedwork/domain/application/use-case";
import { CategoryRepository } from "../../../category/domain/repository/category.repository";

export namespace DeleteCategoryUseCase {
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
export type Input = {
  id: string;
};
