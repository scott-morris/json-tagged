// Public.

const isObject = (thing) => (
	("object" === typeof thing) &&
	(null !== thing) &&
	(!Array.isArray(thing))
);

const isTaggedObject = (obj) => (
	isObject(obj) &&
	(obj.hasOwnProperty("$tags")) &&
	(Array.isArray(obj.$tags))
);

module.exports = {
	isObject,
	isTaggedObject
};