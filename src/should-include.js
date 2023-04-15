// Dependencies.

const hasAnyOf = require("./has-any-of");
const { isTaggedObject } = require("./is-tagged-object");

// Public.

const shouldInclude = (obj, options = {}) => {
  // If it's not a tagged object, then we don't need to evaluate it.
  if (!isTaggedObject(obj)) {
    return true;
  }

  // Get the inclusion and exclusion tags.
  const { tags, exclude = [] } = options;

  // Filter out exclusions first.
  if (hasAnyOf(obj.$tags, exclude)) {
    return false;
  }

  // Return whether any of these tags are present in the inclusion list.
  return Array.isArray(tags) ? hasAnyOf(obj.$tags, tags) : true;
};

module.exports = shouldInclude;
