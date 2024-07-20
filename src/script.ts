/**
 * @fileoverview This file handles script building. Its made easy to just chain with .next()
 */

import CodeBlock from "./code_block";
import type { Opcode } from "./opcodes";
import type { Block } from "./types";

export default class ScriptBuilder {
	private script: Array<CodeBlock>;
	private last: CodeBlock;

	constructor(opcode: Opcode) {
		this.script = [];

		this.last = new CodeBlock(opcode, null);
		this.script.push(this.last)
	}

	public next(opcode: Opcode, inputs?: {[input: string]: Array<unknown>}): ScriptBuilder {
		const child = new CodeBlock(opcode, this.last.uid, inputs);
		this.last.nextUid = child.uid;
		this.last = child;
		this.script.push(this.last);
		return this;
	}

	public export(): {[uid: string]: Block} {
		let result: {[uid: string]: Block} = {};
		this.script.forEach((block) => {
			result[block.uid] = block.export();
		})
		return result;
	}
}