import ProjectBuilder from "./project";
import ScriptBuilder from "./script";
import { ScratchStage, ScratchSprite } from "./object";
import { Opcode } from "./opcodes";

/**
 * ScratchCompiler module
 */
const module = {
	ProjectBuilder: ProjectBuilder,
	ScriptBuilder: ScriptBuilder,
	ScratchSprite: ScratchSprite,
	ScratchStage: ScratchStage,
	Opcode: Opcode
}

export default module;
