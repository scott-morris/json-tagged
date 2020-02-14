const hasAnyOf = require("./has-any-of");

describe("hasAnyOf", () => {
	it("is a function", () => {
		expect(hasAnyOf).toEqual(expect.any(Function));
	});

	describe("when it is called with the wrong signature", () => {
		it("no parameters should return false", () => {
			expect(hasAnyOf()).toEqual(false);
		});

		it("string parameter should return false", () => {
			expect(hasAnyOf("foo")).toEqual(false);
			expect(hasAnyOf("foo", "foo")).toEqual(false);
			expect(hasAnyOf(["foo"], "foo")).toEqual(false);
			expect(hasAnyOf("foo", ["foo"])).toEqual(false);
		});

		it("number parameter should return false", () => {
			expect(hasAnyOf(1)).toEqual(false);
			expect(hasAnyOf(1, 1)).toEqual(false);
			expect(hasAnyOf([1], 1)).toEqual(false);
			expect(hasAnyOf(1, [1])).toEqual(false);
		});

		it("boolean parameter should return false", () => {
			expect(hasAnyOf(true)).toEqual(false);
			expect(hasAnyOf(true, true)).toEqual(false);
			expect(hasAnyOf([true], true)).toEqual(false);
			expect(hasAnyOf(true, [true])).toEqual(false);
		});

		it("null parameter should return false", () => {
			expect(hasAnyOf(null)).toEqual(false);
			expect(hasAnyOf(null, null)).toEqual(false);
			expect(hasAnyOf([null], null)).toEqual(false);
			expect(hasAnyOf(null, [null])).toEqual(false);
		});
	});

	describe("when it is called with an empty array", () => {
		it("empty first array should return false", () => {
			expect(hasAnyOf([],["obi","wan"])).toEqual(false);
		});

		it("empty second array should return false", () => {
			expect(hasAnyOf(["foo","bar","baz"],[])).toEqual(false);
		});
	});

	describe("when it is called with populated arrays", () => {
		it("arrays that do not match return false", () => {
			expect(hasAnyOf(["foo","bar","baz"],["obi","wan"])).toEqual(false);
		});

		it("arrays that match return true", () => {
			expect(hasAnyOf(["bar","baz"],["foo","bar"])).toEqual(true);
		});
	});
});