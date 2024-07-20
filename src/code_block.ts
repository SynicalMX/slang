/**
 * @fileoverview This file handles all code block logic. Handles setting the next block and so on.
 */
import { getOpcodeName, type Opcode } from "./opcodes";
import type { Block } from "./types";
import uid from "./util/uid";

/**
 * This class handles data for code blocks, it is used internally.
 */
export default class CodeBlock {
	public uid: string;
	public opcode: Opcode;
	public nextUid: string | null;
	public parent: string | null;
	public inputs: {[input: string]: Array<unknown>};
	public fields: {[field: string]: Array<unknown>};
	public shadow: boolean;
	public topLevel: boolean;
	public x?: number;
	public y?: number;

	constructor(opcode: Opcode, parent: string | null, inputs?: {[input: string]: Array<unknown>}) {
		this.uid = uid();
		this.opcode = opcode;
		this.parent = parent;
		this.nextUid = null;
		this.inputs = inputs || {};
		this.fields = {};
		this.shadow = false;
		this.topLevel = (this.parent === null);
	}

	/**
	 * Sets the next block to be ran under this block.
	 * @param child The uid of the next CodeBlock
	 */
	public setChild(child: string | null) {
		this.nextUid = child;
	}

	public export(): Block {
		return {
			opcode: getOpcodeName(this.opcode),
			next: this.nextUid,
			parent: this.parent,
			inputs: this.inputs,
			fields: this.fields,
			shadow: this.shadow,
			topLevel: this.topLevel,
			x: this.x,
			y: this.x,
		}
	}
}