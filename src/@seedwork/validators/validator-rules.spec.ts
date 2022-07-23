import { ValidatorRules } from "./validator-rules";

describe("ValidatorRules Unit Tests", () => {
  test("value method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });
});
