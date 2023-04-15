const { isObject, isTaggedObject } = require("./is-tagged-object");

describe("isObject", () => {
  test("is a function", () => {
    expect(isObject).toEqual(expect.any(Function));
  });

  describe("when called with a non-object", () => {
    test("it should return false with undefined", () => {
      expect(isObject()).toEqual(false);
    });

    test("it should return false with an integer", () => {
      expect(isObject(1)).toEqual(false);
    });

    test("it should return false with a number", () => {
      expect(isObject(1.1)).toEqual(false);
    });

    test("it should return false with a boolean", () => {
      expect(isObject(false)).toEqual(false);
    });

    test("it should return false with null", () => {
      expect(isObject(null)).toEqual(false);
    });

    test("it should return false with an array", () => {
      expect(isObject([])).toEqual(false);
    });

    test("it should return false with a string", () => {
      expect(isObject("foo")).toEqual(false);
    });
  });
});

describe("isTaggedObject", () => {
  test("is a function", () => {
    expect(isTaggedObject).toEqual(expect.any(Function));
  });

  describe("when called with a non-object", () => {
    test("it should return false with undefined", () => {
      expect(isTaggedObject()).toEqual(false);
    });

    test("it should return false with an integer", () => {
      expect(isTaggedObject(1)).toEqual(false);
    });

    test("it should return false with a number", () => {
      expect(isTaggedObject(1.1)).toEqual(false);
    });

    test("it should return false with a boolean", () => {
      expect(isTaggedObject(false)).toEqual(false);
    });

    test("it should return false with null", () => {
      expect(isTaggedObject(null)).toEqual(false);
    });

    test("it should return false with an array", () => {
      expect(isTaggedObject([])).toEqual(false);
    });

    test("it should return false with a string", () => {
      expect(isTaggedObject("foo")).toEqual(false);
    });
  });

  describe("when called with an object", () => {
    describe("when the object is not tagged", () => {
      test("it should return false", () => {
        expect(isTaggedObject({})).toEqual(false);
      });
    });

    describe("when the object is partially tagged without a $value", () => {
      test("it should return true with no other properties", () => {
        expect(
          isTaggedObject({
            $tags: ["to do"],
          })
        ).toEqual(true);
      });

      test("it should return true with no other properties", () => {
        expect(
          isTaggedObject({
            $tags: ["to do"],
            prop1: "foo",
            prop2: "bar",
          })
        ).toEqual(true);
      });
    });

    describe("when the object is fully tagged", () => {
      test("it should return true with no tags", () => {
        expect(
          isTaggedObject({
            $tags: [],
            $value: ["getting things done"],
          })
        ).toEqual(true);
      });

      test("it should return true with one tag", () => {
        expect(
          isTaggedObject({
            $tags: ["to do"],
            $value: "getting things done",
          })
        ).toEqual(true);
      });

      test("it should return true with multiple tags", () => {
        expect(
          isTaggedObject({
            $tags: ["to do", "in progress"],
            $value: "getting things done",
          })
        ).toEqual(true);
      });

      test("it should return true with undefined value", () => {
        expect(
          isTaggedObject({
            $tags: ["to do", "in progress"],
            $value: undefined,
          })
        ).toEqual(true);
      });
    });
  });
});
