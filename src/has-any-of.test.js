const hasAnyOf = require("./has-any-of");

describe("hasAnyOf", () => {
  test("is a function", () => {
    expect(hasAnyOf).toEqual(expect.any(Function));
  });

  describe("when it is called with the wrong signature", () => {
    test("no parameters should return false", () => {
      expect(hasAnyOf()).toEqual(false);
    });

    test("string parameter should return false", () => {
      expect(hasAnyOf("foo")).toEqual(false);
      expect(hasAnyOf("foo", "foo")).toEqual(false);
      expect(hasAnyOf(["foo"], "foo")).toEqual(false);
      expect(hasAnyOf("foo", ["foo"])).toEqual(false);
    });

    test("number parameter should return false", () => {
      expect(hasAnyOf(1)).toEqual(false);
      expect(hasAnyOf(1, 1)).toEqual(false);
      expect(hasAnyOf([1], 1)).toEqual(false);
      expect(hasAnyOf(1, [1])).toEqual(false);
    });

    test("boolean parameter should return false", () => {
      expect(hasAnyOf(true)).toEqual(false);
      expect(hasAnyOf(true, true)).toEqual(false);
      expect(hasAnyOf([true], true)).toEqual(false);
      expect(hasAnyOf(true, [true])).toEqual(false);
    });

    test("null parameter should return false", () => {
      expect(hasAnyOf(null)).toEqual(false);
      expect(hasAnyOf(null, null)).toEqual(false);
      expect(hasAnyOf([null], null)).toEqual(false);
      expect(hasAnyOf(null, [null])).toEqual(false);
    });
  });

  describe("when it is called with an empty array", () => {
    test("empty first array should return false", () => {
      expect(hasAnyOf([], ["obi", "wan"])).toEqual(false);
    });

    test("empty second array should return false", () => {
      expect(hasAnyOf(["foo", "bar", "baz"], [])).toEqual(false);
    });
  });

  describe("when it is called with populated arrays", () => {
    test("arrays that do not match return false", () => {
      expect(hasAnyOf(["foo", "bar", "baz"], ["obi", "wan"])).toEqual(false);
    });

    test("arrays that match return true", () => {
      expect(hasAnyOf(["bar", "baz"], ["foo", "bar"])).toEqual(true);
    });
  });
});
