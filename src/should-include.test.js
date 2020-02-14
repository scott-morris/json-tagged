const shouldInclude = require("./should-include");

describe("shouldInclude", () => {
	it("is a function", () => {
		expect(shouldInclude).toEqual(expect.any(Function));
	});

	describe("when called with a non-object", () => {
		it("it should return true with undefined", () => {
			expect(shouldInclude()).toEqual(true);
		});

		it("it should return true with an integer", () => {
			expect(shouldInclude(1)).toEqual(true);
		});

		it("it should return true with a number", () => {
			expect(shouldInclude(1.1)).toEqual(true);
		});

		it("it should return true with a boolean", () => {
			expect(shouldInclude(false)).toEqual(true);
		});

		it("it should return true with null", () => {
			expect(shouldInclude(null)).toEqual(true);
		});

		it("it should return true with an array", () => {
			expect(shouldInclude([])).toEqual(true);
		});

		it("it should return true with a string", () => {
			expect(shouldInclude("foo")).toEqual(true);
		});
	});

	describe("given called with an object", () => {
		describe("when no options given", () => {
			it("it should return true with a non-tagged object", () => {
				expect(shouldInclude({ prop: "value" })).toEqual(true);
			});

			it("it should return true with a tagged object", () => {
				expect(shouldInclude({
					$tags: ["to do"],
					prop: "value"
				})).toEqual(true);
			});
		});

		describe("when options are given", () => {
			describe("when include tags are given", () => {
				it("it should return true with a non-tagged object", () => {
					expect(shouldInclude({ prop: "value" }, { tags: ["done"] })).toEqual(true);
				});

				it("it should return false with a tagged object that doesn't have the included tag", () => {
					expect(shouldInclude({
						$tags: ["to do"],
						prop: "value"
					}, { tags: ["done"] })).toEqual(false);
				});

				it("it should return true with a tagged object that includes the tag", () => {
					expect(shouldInclude({
						$tags: ["to do"],
						prop: "value"
					}, { tags: ["to do"] })).toEqual(true);
				});
			});

			describe("when exclude tags are given", () => {
				it("it should return true with a non-tagged object", () => {
					expect(shouldInclude({ prop: "value" }, { exclude: ["done"] })).toEqual(true);
				});

				it("it should return true with a tagged object that doesn't have the excluded tag", () => {
					expect(shouldInclude({
						$tags: ["to do"],
						prop: "value"
					}, { exclude: ["done"] })).toEqual(true);
				});

				it("it should return false with a tagged object that includes the excluded tag", () => {
					expect(shouldInclude({
						$tags: ["to do"],
						prop: "value"
					}, { exclude: ["to do"] })).toEqual(false);
				});
			});

			describe("when include and exclude tags are given", () => {
				it("it should return true with a non-tagged object", () => {
					expect(shouldInclude({ prop: "value" }, { include: ["to do"], exclude: ["done"] })).toEqual(true);
				});

				it("it should return true with a tagged object that has an included tag and doesn't have the excluded tag", () => {
					expect(shouldInclude({
						$tags: ["to do", "high priority"],
						prop: "value"
					}, { tags: ["to do"], exclude: ["low priority"] })).toEqual(true);
				});

				it("it should return false with a tagged object that has an included tag and has an excluded tag", () => {
					expect(shouldInclude({
						$tags: ["to do", "low priority"],
						prop: "value"
					}, { tags: ["to do"], exclude: ["low priority"] })).toEqual(false);
				});

				it("it should return false with a tagged object that has doesn't have an included tag and doesn't have an excluded tag", () => {
					expect(shouldInclude({
						$tags: ["in progress", "high priority"],
						prop: "value"
					}, { tags: ["to do"], exclude: ["done"] })).toEqual(false);
				});
			});
		});
	});
});