const removeTags = require("./remove-tags");

describe("removeTags", () => {
  test("is a function", () => {
    expect(removeTags).toEqual(expect.any(Function));
  });

  describe("when it is called with the wrong signature", () => {
    test("no parameters undefined", () => {
      expect(removeTags()).toBeUndefined();
    });
  });
});
