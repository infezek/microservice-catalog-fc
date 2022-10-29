import { NotFoundError } from "#seedwork/domain";
import { Category } from "#category/domain";
import { CategoryInMemoryRepository } from "#category/infra";
import { GetCategory } from "../../get-category.use-case";

describe("GetCategoryUseCase Unit Tests", () => {
  let useCase: GetCategory.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategory.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() =>
      useCase.execute({ id: "fake id" })
    ).rejects.toThrow(
      new NotFoundError("Entity Not Found using ID fake id")
    );
  });

  it("should get a category", async () => {
    const entity = new Category({ name: "test" });
    const spyFindById = jest.spyOn(repository, "findById");
    repository.items.push(entity);
    let output = await useCase.execute({
      id: entity.id,
    });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });
  });
});
