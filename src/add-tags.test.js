const addTags = require("./add-tags");

describe("addTags", () => {
  test("is a function", () => {
    expect(addTags).toEqual(expect.any(Function));
  });

  describe("when it is called with the wrong signature", () => {
    test("no parameters undefined", () => {
      expect(addTags()).toBeUndefined();
    });
  });

  describe("when it is called with the right signature", () => {
    describe("on a primitive", () => {
      test("it should return an object");
    });
  });
});
