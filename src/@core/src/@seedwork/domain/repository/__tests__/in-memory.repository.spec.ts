import { Entity } from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import { UniqueEntityId } from "../../value-object/unique-entity-id.vo";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {
  constructor(props: StubEntityProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository = new StubInMemoryRepository();
  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const repository = new StubInMemoryRepository();
    const entity = new StubEntity({
      name: "test",
      price: 1,
    });
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(
      repository.items[0].toJSON()
    );
  });

  it("should throws error when entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
    expect(
      repository.findById(
        new UniqueEntityId(
          "c05f26bd-7975-41b1-a6e4-cc9cf0ce2265"
        )
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID c05f26bd-7975-41b1-a6e4-cc9cf0ce2265`
      )
    );
  });

  it("should finds a entity by id", async () => {
    const entity = new StubEntity({
      name: "name value",
      price: 5,
    });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(
      entityFound.toJSON()
    );

    entityFound = await repository.findById(
      entity.uniqueEntityId
    );
    expect(entity.toJSON()).toStrictEqual(
      entityFound.toJSON()
    );
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({
      name: "name value",
      price: 5,
    });
    await repository.insert(entity);

    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", () => {
    const entity = new StubEntity({
      name: "name value",
      price: 5,
    });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID ${entity.id}`
      )
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({
      name: "name value",
      price: 5,
    });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      {
        name: "name updated",
        price: 1,
      },
      entity.uniqueEntityId
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(
      repository.items[0].toJSON()
    );
  });

  it("should throws error on delete when entity not found", () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
    expect(
      repository.delete(
        new UniqueEntityId(
          "c05f26bd-7975-41b1-a6e4-cc9cf0ce2265"
        )
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID c05f26bd-7975-41b1-a6e4-cc9cf0ce2265`
      )
    );
  });

  it("should deletes an entity", async () => {
    const entity = new StubEntity({
      name: "name value",
      price: 5,
    });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
