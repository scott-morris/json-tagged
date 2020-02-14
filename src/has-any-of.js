// Public.

/**
 * Determine if an array has any values in another array.
 * @param {Array<String>} arrSearchIn
 * @param {Array<String>} arrSearchValues
 */
const hasAnyOf = (arrSearchIn, arrSearchValues) => {
	if (!Array.isArray(arrSearchIn) || !Array.isArray(arrSearchValues)) {
		return false;
	}

	return arrSearchValues.some((value) => arrSearchIn.includes(value));
};

module.exports = hasAnyOf;