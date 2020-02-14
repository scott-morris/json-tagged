// Dependencies.

const { isObject, isTaggedObject } = require("./is-tagged-object");
const shouldInclude = require("./should-include");

// Private.

const removeTags = ({ $tags, $value, ...rest }) =>
	(($value !== void 0) ?
		$value :
		rest);

const parseTaggedObject = (obj, options) =>
	shouldInclude(obj, options) ?
		removeTags(obj) :
		void 0;

const parseObject = (obj, options) =>
	Object.keys(obj).reduce((result, key) => {
		const value = parse(obj[key], options);

		if (void 0 !== value) {
			result[key] = value;
		}

		return result;
	}, {});

const parseArray = (arr, options) =>
	arr.reduce((result, value) => {
		const parsed = parse(value, options);

		if (void 0 !== parsed) {
			result.push(parsed);
		}

		return result;
	}, []);

// Public.

const parse = (thing, options) => {
	// If the thing is not an object or array, return it as-is.
	if (!isObject(thing) && !Array.isArray(thing)) {
		return thing;
	}

	// Parse based on whether the thing is an array or object.
	return isTaggedObject(thing) ?
		parseTaggedObject(thing, options) :
		Array.isArray(thing) ?
			parseArray(thing, options) :
			parseObject(thing, options);
};

module.exports = parse;