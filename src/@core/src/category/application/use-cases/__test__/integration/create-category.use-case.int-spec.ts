import {
  CategoryInMemoryRepository,
  CategorySequelize,
} from "#category/infra";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import { CreateCategory } from "../../create-category.use-case";

const { CategoryModel, CategoryRepository } =
  CategorySequelize;
describe("CreateCategoryUseCase Integration Tests", () => {
  let useCase: CreateCategory.UseCase;
  let repository: CategorySequelize.CategoryRepository;

  setupSequelize({
    models: [CategoryModel],
  });

  beforeEach(() => {
    repository = new CategoryRepository(CategoryModel);
    useCase = new CreateCategory.UseCase(repository);
  });

  it("should create a category", async () => {
    let output = await useCase.execute({ name: "test" });
    let entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.props.created_at,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
    });
    entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: "some description",
      is_active: true,
      created_at: entity.props.created_at,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      is_active: true,
    });
    entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: "some description",
      is_active: true,
      created_at: entity.props.created_at,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      is_active: false,
    });
    entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: "some description",
      is_active: false,
      created_at: entity.props.created_at,
    });
  });
});
