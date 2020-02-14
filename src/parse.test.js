const parse = require("./parse");

describe("parse", () => {
	it("is a function", () => {
		expect(parse).toEqual(expect.any(Function))
	});

	describe("when provided an object with no tags", () => {
		const input = {
			item1: "foo",
			item2: "bar"
		};

		describe("when called without any settings", () => {
			const settings = {};

			it("it should not change the object", () => {
				expect(parse(input, settings)).toEqual({
					item1: "foo",
					item2: "bar"
				});
			});
		});

		describe("when called with tags", () => {
			const settings = { tags: ["to do", "in progress"] };

			it("it should not change the object", () => {
				expect(parse(input, settings)).toEqual({
					item1: "foo",
					item2: "bar"
				});
			});
		});

		describe("when called with exclusions", () => {
			const settings = { exclude: ["done"] };

			it("it should not change the object", () => {
				expect(parse(input, settings)).toEqual({
					item1: "foo",
					item2: "bar"
				});
			});
		});
	});

	describe("when provided an object with tags", () => {
		const input = {
			$tags: ["active"],
			item1: "foo",
			item2: "bar"
		};

		describe("given the object does not match", () => {
			const settings = { tags: ["inactive"] };

			it("it should return undefined", () => {
				expect(parse(input, settings)).toBeUndefined();
			});
		});

		describe("given the object does not match", () => {
			const settings = { tags: ["active"] };

			it("it should return the object without the tag properties", () => {
				expect(parse(input, settings)).toEqual({
					item1: "foo",
					item2: "bar"
				});
			});
		});
	});

	describe("given the object has properties that are tagged objects", () => {
		const input = {
			item1: {
				$tags: ["active"],
				$value: "foo"
			},
			item2: {
				$tags: ["inactive"],
				$value: ["bar", "baz"]
			},
			item3: {
				$tags: ["active"],
				prop1: true
			}
		};

		it("it should filter out properties that do not match and convert the objects", () => {
			expect(parse(input, { tags: ["active"] })).toEqual({
				item1: "foo",
				item3: {
					prop1: true
				}
			});

			expect(parse(input, { tags: ["inactive"] })).toEqual({
				item2: ["bar", "baz"]
			});
		});
	});

	describe("when provided an array", () => {
		const settings = { tags: ["active"] };

		describe("given array elements that are not objects", () => {
			const input = [1, 3.14, true, false, "foo", null];

			it("it should return all of the values in the array", () => {
				expect(parse(input, settings)).toEqual([1, 3.14, true, false, "foo", null]);
			});
		});

		describe("given array elements that are objects", () => {
			describe("that are not tagged", () => {
				const input = [{ foo: true, bar: false }, { obi: 1, wan: 2 }];

				it("it should return all of the values in the array", () => {
					expect(parse(input, settings)).toEqual([{ foo: true, bar: false }, { obi: 1, wan: 2 }]);
				});
			});

			describe("that are tagged", () => {
				const input = [
					{ $tags: ["active"], $value: "foo" },
					{ $tags: ["inactive"], $value: ["bar", "baz"] },
					{ $tags: ["active"], prop1: true }
				];

				it("it should return all of the values in the array", () => {
					expect(parse(input, settings)).toEqual([
						"foo",
						{ prop1: true }
					]);
				});

			});
		});
	});

	// TODO: fill in these tests
	// describe("when provided complex objects and arrays", () => {
	// 	describe("deep objects", () => {

	// 	});

	// 	describe("nested objects and arrays", () => {

	// 	});
	// });
});