import { NotFoundError } from "#seedwork/domain";
import { Category } from "#category/domain";
import { CategoryInMemoryRepository } from "#category/infra";
import { DeleteCategory } from "../../delete-category.use-case";

describe("DeleteCategory Unit Tests", () => {
  let useCase: DeleteCategory.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategory.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake id" })
    ).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a category", async () => {
    const items = [new Category({ name: "test 1" })];
    repository.items = items;
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
