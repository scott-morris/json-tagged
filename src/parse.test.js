const parse = require("./parse");

describe("parse", () => {
  test("is a function", () => {
    expect(parse).toEqual(expect.any(Function));
  });

  describe("when provided an object with no tags", () => {
    const input = {
      item1: "foo",
      item2: "bar",
    };

    describe("when called without any settings", () => {
      const settings = {};

      test("it should not change the object", () => {
        expect(parse(input, settings)).toEqual({
          item1: "foo",
          item2: "bar",
        });
      });
    });

    describe("when called with tags", () => {
      const settings = { tags: ["to do", "in progress"] };
      const result = parse(input, settings);

      test("it should not change the object", () => {
        expect(result).toEqual({
          item1: "foo",
          item2: "bar",
        });
      });

      test("it should return a copy of the original object", () => {
        expect(result).not.toBe(input);
      });
    });

    describe("when called with exclusions", () => {
      const settings = { exclude: ["done"] };

      test("it should not change the object", () => {
        expect(parse(input, settings)).toEqual({
          item1: "foo",
          item2: "bar",
        });
      });
    });
  });

  describe("when provided an object with tags", () => {
    const input = {
      $tags: ["active"],
      item1: "foo",
      item2: "bar",
    };

    describe("given the object does not match", () => {
      const settings = { tags: ["inactive"] };

      test("it should return undefined", () => {
        expect(parse(input, settings)).toBeUndefined();
      });
    });

    describe("given the object does not match", () => {
      const settings = { tags: ["active"] };

      test("it should return the object without the tag properties", () => {
        expect(parse(input, settings)).toEqual({
          item1: "foo",
          item2: "bar",
        });
      });
    });
  });

  describe("given the object has properties that are tagged objects", () => {
    const input = {
      item1: {
        $tags: ["active"],
        $value: "foo",
      },
      item2: {
        $tags: ["inactive"],
        $value: ["bar", "baz"],
      },
      item3: {
        $tags: ["active"],
        prop1: true,
      },
    };

    test("it should filter out properties that do not match and convert the objects", () => {
      expect(parse(input, { tags: ["active"] })).toEqual({
        item1: "foo",
        item3: {
          prop1: true,
        },
      });

      expect(parse(input, { tags: ["inactive"] })).toEqual({
        item2: ["bar", "baz"],
      });
    });
  });

  describe("when provided an array", () => {
    const settings = { tags: ["active"] };

    describe("given array elements that are not objects", () => {
      const input = [1, 3.14, true, false, "foo", null];

      test("it should return all of the values in the array", () => {
        expect(parse(input, settings)).toEqual([
          1,
          3.14,
          true,
          false,
          "foo",
          null,
        ]);
      });
    });

    describe("given array elements that are objects", () => {
      describe("that are not tagged", () => {
        const input = [
          { foo: true, bar: false },
          { obi: 1, wan: 2 },
        ];

        test("it should return all of the values in the array", () => {
          expect(parse(input, settings)).toEqual([
            { foo: true, bar: false },
            { obi: 1, wan: 2 },
          ]);
        });
      });

      describe("that are tagged", () => {
        const input = [
          { $tags: ["active"], $value: "foo" },
          { $tags: ["active"], $value: ["bar", "baz"] },
          { $tags: ["active"], prop1: true },
          { $tags: ["inactive"], $value: 1 },
        ];

        test("it should return all of the values in the array", () => {
          expect(parse(input, settings)).toEqual([
            "foo",
            ["bar", "baz"],
            { prop1: true },
          ]);
        });
      });
    });
  });

  describe("when provided complex objects and arrays", () => {
    describe("deep objects", () => {
      const input = {
        foo: {
          bar: {
            $tags: ["test1", "test3"],
            $value: "foo.bar",
          },
          baz: {
            $tags: ["test2", "test3"],
            $value: "foo.baz",
          },
          qux: "foo.qux",
        },
      };

      test("it should return the properties as mentioned above all the day down", () => {
        expect(parse(input, { tags: ["test1"] })).toEqual({
          foo: { bar: "foo.bar", qux: "foo.qux" },
        });
        expect(parse(input, { tags: ["test2"] })).toEqual({
          foo: { baz: "foo.baz", qux: "foo.qux" },
        });
        expect(parse(input, { tags: ["test3"] })).toEqual({
          foo: { bar: "foo.bar", baz: "foo.baz", qux: "foo.qux" },
        });
        expect(parse(input, { tags: [] })).toEqual({ foo: { qux: "foo.qux" } });
      });
    });

    describe("nested objects and arrays", () => {
      const input = {
        users: [
          {
            $tags: ["lightSide"],
            $value: {
              name: {
                $tags: ["private"],
                first: "Ben",
                last: "Kenobi",
              },
              userName: "ObiWan",
            },
          },
          {
            $tags: ["lightSide"],
            $value: {
              name: {
                $tags: ["private"],
                $value: {
                  first: "Luke",
                  last: "Skywalker",
                },
              },
              userName: "MasterLuke",
            },
          },
          {
            $tags: ["darkSide"],
            $value: {
              name: {
                $tags: ["private"],
                first: "Anakin",
                last: "Skywalker",
              },
              userName: "DarthVader",
            },
          },
          {
            $tags: ["darkSide"],
            $value: {
              name: {
                $tags: ["private"],
                first: "Ben",
                last: "Solo",
              },
              userName: "KyloRen",
            },
          },
        ],
      };

      test("it should return the properties as mentioned above all the day down", () => {
        expect(parse(input, { tags: ["lightSide"] })).toEqual({
          users: [{ userName: "ObiWan" }, { userName: "MasterLuke" }],
        });

        expect(parse(input, { tags: ["lightSide", "private"] })).toEqual({
          users: [
            { userName: "ObiWan", name: { first: "Ben", last: "Kenobi" } },
            {
              userName: "MasterLuke",
              name: { first: "Luke", last: "Skywalker" },
            },
          ],
        });

        expect(parse(input, { tags: ["darkSide"] })).toEqual({
          users: [{ userName: "DarthVader" }, { userName: "KyloRen" }],
        });
      });
    });
  });
});
