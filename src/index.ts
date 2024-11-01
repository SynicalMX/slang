import ProjectBuilder from "./project";
import ScriptBuilder from "./script";
import { ScratchStage, ScratchSprite } from "./object";
import { Opcode } from "./opcodes";
import { ScratchType } from "./scratch_type";
import type { ScratchCompiler } from "./types.d";

/**
 * ScratchCompiler module
 */
const module: ScratchCompiler = {
	ProjectBuilder: ProjectBuilder,
	ScriptBuilder: ScriptBuilder,
	ScratchSprite: ScratchSprite,
	ScratchStage: ScratchStage,
	Opcode: Opcode,
	ScratchType: ScratchType
}

export default module;
