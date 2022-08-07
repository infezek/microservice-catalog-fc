import { InvalidUuidError } from "../errors/invalid-uuid.error";
import { UniqueEntityId } from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

function spyValidvateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Teste", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidvateMethod();

    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "159b6cbb-1321-450e-b2ea-0cda1b8569b1";

    const validateSpy = spyValidvateMethod();
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);

    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = spyValidvateMethod();
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();

    expect(validateSpy).toHaveBeenCalled();
  });
});
