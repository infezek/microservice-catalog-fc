import ClassValidatorFields from "../class-validator-fields";
import * as libClassValidator from "class-validator";
class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe("ClassValidatorFields Unit Tests", () => {
  it("should initialize erros and validatedData variables with null", () => {
    const validate = new StubClassValidatorFields();
    expect(validate.errors).toBeNull();
    expect(validate.validateData).toBeNull();
  });

  it("should validate with erros", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([
      {
        property: "field",
        constraints: {
          isRequired: "some error",
        },
      },
    ]);
    const validate = new StubClassValidatorFields();
    expect(validate.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(validate.validateData).toBeNull();
    expect(validate.errors).toEqual({ field: ["some error"] });
  });

  it("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([]);
    const validate = new StubClassValidatorFields();
    expect(validate.validate({ field: "value" })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(validate.validateData).toStrictEqual({ field: "value" });
    expect(validate.errors).toBeNull();
  });
});
