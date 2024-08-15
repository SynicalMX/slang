/**
 * @fileoverview Internally, scratch has block types that are not used publically, such as shadow blocks, but this enum must also contain types.
 */

/**
 * This enum tells Scratch which type to use for inputs.
 */
export enum ScratchType {
	RESERVED,
	SHADOW,
	NO_SHADOW,
	OBSCURED_SHADOW,
	NUMBER,
	SIGNED_NUMBER,
	SIGNED_INTEGER,
	INTEGER,
	ANGLE,
	COLOR,
	STRING,
	BROADCAST,
	VARIABLE,
	LIST
}
